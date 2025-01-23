const { app, BrowserWindow, ipcMain, shell } = require("electron");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

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
    resizable: which === "startblock",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  ipcMain.on("resize-window", (event, size) => {
    console.log("Received size:", size); // Debug log
    if (event.sender === newWindow.webContents) {
      newWindow.setContentSize(size.width, size.height);
    }
  });
  newWindow.webContents.on("devtools-opened", () => {
    newWindow.webContents.openDevTools({ mode: "undocked" });
  });
  newWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
  newWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  newWindow.setAlwaysOnTop(true, "screen-saver", 1);
  newWindow.loadFile(loadPath(which));

  // removes listener on close to prevent memory leaks.
  newWindow.on("closed", () => {
    ipcMain.removeAllListeners("resize-window");
  });
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
  if (win) win.close();
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
