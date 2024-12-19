const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const { start } = require("repl");

// Build/Installer stuff ----------------------------
if (require("electron-squirrel-startup")) {
  app.quit();
}

function createMainWindow(which) {
  //Första main Window med alla knappar
  const location = loadLocation(which);
  const size = loadSize(which);
  const mainWindow = new BrowserWindow({
    x: location[0],
    y: location[1],
    width: size[0],
    height: size[1],
    maximizable: false,
    alwaysOnTop: true,
    transparent: true,
    titleBarStyle: "hidden",
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.setAlwaysOnTop(true, "screen-saver", 1);
  mainWindow.loadFile(loadPath(which));
}

function createWindow(which, width, height) {
  const location = loadLocation(which);
  const size = loadSize(which);
  const newWindow = new BrowserWindow({
    x: location[0],
    y: location[1],
    width: size[0],
    height: size[1],
    maximizable: false,
    alwaysOnTop: true,
    transparent: true,
    titleBarStyle: "hidden",
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
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
  createMainWindow("main");

  ipcMain.on("newWindow", (event, arg, width, height) => {
    console.log(arg);
    createWindow(arg, width, height);
  });
});

ipcMain.on("close-window", (event, which) => {
  const win = BrowserWindow.getFocusedWindow();
  const position = win.getPosition();

  console.log(position, which);
  saveLocation(which, position);
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
  const response = fs.readFileSync("data/startup.json", "utf-8");
  let startup = JSON.parse(response);
  startup[which]["position"] = position;
  fs.writeFileSync("data/startup.json", JSON.stringify(startup), "utf8");
}

function loadLocation(which) {
  const response = fs.readFileSync("data/startup.json", "utf-8");
  let startup = JSON.parse(response);
  return startup[which]["position"];
}

function loadPath(which) {
  const response = fs.readFileSync("data/startup.json", "utf-8");
  let startup = JSON.parse(response);
  return startup[which]["filepath"];
}
function loadSize(which) {
  const response = fs.readFileSync("data/startup.json", "utf-8");
  let startup = JSON.parse(response);
  return startup[which]["size"];
}
