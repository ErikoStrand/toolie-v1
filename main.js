const { app, BrowserWindow, ipcMain } = require("electron");
const { exec } = require("child_process");
const path = require("path");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 145,
    height: 330,
    maximizable: false,
    alwaysOnTop: true,
    transparent: true,
    titleBarStyle: "hidden",
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
}
function createNamnSlumpare(path) {
  const newWindow = new BrowserWindow({
    width: 600,
    height: 800,
    transparent: true,
    alwaysOnTop: true,
    maximizable: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  newWindow.loadFile(path);
}

function createStartBlock(path) {
  const newWindow = new BrowserWindow({
    width: 600,
    height: 800,
    transparent: true,
    alwaysOnTop: true,
    maximizable: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  newWindow.loadFile(path);
}

function createGroupie(path) {
  const newWindow = new BrowserWindow({
    width: 720,
    height: 1280,
    transparent: true,
    alwaysOnTop: true,
    maximizable: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  newWindow.loadFile(path);
}
function createWindow(path) {
  const newWindow = new BrowserWindow({
    width: 400,
    height: 300,
    alwaysOnTop: true,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  newWindow.loadFile(path);
}

// Handle the getPath request
ipcMain.handle("getPath", (event, name) => {
  return app.getPath(name);
});

app.whenReady().then(() => {
  createMainWindow();

  ipcMain.on("newWindow", (event, arg) => {
    console.log(arg);
    createWindow(arg);
  });
  ipcMain.on("namnSlumpare", (event, arg) => {
    console.log(arg);
    createNamnSlumpare(arg);
  });
  ipcMain.on("startblock", (event, arg) => {
    console.log(arg);
    createStartBlock(arg);
  });
  ipcMain.on("groupie", (event, arg) => {
    console.log(arg);
    createGroupie(arg);
    ipcMain.on("namnSlumpare", (event, arg) => {
      console.log(arg);
      createNamnSlumpare(arg);
    });
  });
});

ipcMain.on("close-window", () => {
  const win = BrowserWindow.getFocusedWindow();
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
