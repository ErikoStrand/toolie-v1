const { app, BrowserWindow, ipcMain, shell } = require("electron");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const windowListeners = new Map();
// Build/Installer stuff ----------------------------
if (require("electron-squirrel-startup")) {
  app.quit();
}

function createWindow(which) {
  const location = loadLocation(which);
  const size = loadSize(which);
  const newWindow = new BrowserWindow({
    x: location[0],
    y: location[1],
    width: size[0],
    height: size[1],
    useContentSize: true,
    maximizable: false,
    alwaysOnTop: true,
    transparent: true,
    titleBarStyle: "hidden",
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  const resizeListener = (event, size) => {
    if (event.sender === newWindow.webContents) {
      newWindow.setContentSize(size.width, size.height);
    }
  };
  windowListeners.set(newWindow.id, {
    resize: resizeListener,
  });
  ipcMain.on("resize-window", resizeListener);

  newWindow.on("closed", () => {
    const listeners = windowListeners.get(newWindow.id);
    if (listeners) {
      // Remove only this window's resize listener
      ipcMain.removeListener("resize-window", listeners.resize);
      // Clean up the listeners map
      windowListeners.delete(newWindow.id);
    }
  });
  newWindow.webContents.on("devtools-opened", () => {
    console.log("nånting");
    newWindow.webContents.openDevTools({ mode: "undocked" });
  });
  newWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
  newWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  newWindow.setAlwaysOnTop(true, "screen-saver", 1);
  newWindow.loadFile(loadPath(which));
}

//////////////////////////////////////////////

// Handle the getPath request
ipcMain.handle("getPath", (event, name) => {
  return app.getPath(name);
});

app.whenReady().then(() => {
  createWindow("main");

  ipcMain.on("newWindow", (event, arg) => {
    console.log(arg);
    createWindow(arg);
  });
});

ipcMain.on("close-window", (event, which) => {
  const win = BrowserWindow.getFocusedWindow();
  const position = win.getPosition();
  const size = win.getBounds();

  console.log(position, which);
  saveLocation(which, position);
  saveSize(which, [size["width"], size["height"]]);

  if (win) {
    win.removeAllListeners("resize-window");
    win.close();
  }
});
ipcMain.on("toggle-fullscreen", () => {
  const win = BrowserWindow.getFocusedWindow();
  win.maximize();
  win.setFullScreen(true);
});

ipcMain.on("window-drag", (event) => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.dragMove();
});

function getAudioPath() {
  // If packaged, use app.getPath('exe') directory
  // If in development, use current directory
  const basePath = app.isPackaged
    ? path.dirname(app.getPath("exe"))
    : __dirname;

  return path.join(basePath, "alert.wav");
}

ipcMain.on("play-timer-sound", () => {
  const audioPath = getAudioPath();

  // Cross-platform audio playback
  if (process.platform === "darwin") {
    exec(`afplay "${audioPath}"`, handlePlaybackError);
  } else if (process.platform === "win32") {
    exec(
      `powershell -c "(New-Object Media.SoundPlayer '${audioPath}').PlaySync()"`,
      handlePlaybackError
    );
  } else {
    // Linux
    exec(`aplay "${audioPath}"`, handlePlaybackError);
  }
});

function handlePlaybackError(error) {
  if (error) console.error(`Audio playback error: ${error}`);
}
function saveLocation(which, position) {
  const response = fs.readFileSync("resources/data/startup.json", "utf-8");
  let startup = JSON.parse(response);
  startup[which]["position"] = position;
  fs.writeFileSync(
    "resources/data/startup.json",
    JSON.stringify(startup),
    "utf8"
  );
}

function saveSize(which, size) {
  const response = fs.readFileSync("resources/data/startup.json", "utf-8");
  let startup = JSON.parse(response);
  startup[which]["size"] = size;
  fs.writeFileSync(
    "resources/data/startup.json",
    JSON.stringify(startup),
    "utf8"
  );
}

function loadLocation(which) {
  const response = fs.readFileSync("resources/data/startup.json", "utf-8");
  let startup = JSON.parse(response);
  return startup[which]["position"];
}

function loadPath(which) {
  const response = fs.readFileSync("resources/data/startup.json", "utf-8");
  let startup = JSON.parse(response);
  return startup[which]["filepath"];
}
function loadSize(which) {
  const response = fs.readFileSync("resources/data/startup.json", "utf-8");
  let startup = JSON.parse(response);
  return startup[which]["size"];
}
