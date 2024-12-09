const { app, BrowserWindow, ipcMain } = require("electron");
const { exec } = require("child_process");
const path = require("path");

function createMainWindow() { //Första main Window med alla knappar
  const mainWindow = new BrowserWindow({
    width: 170,
    height: 400,
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

  mainWindow.loadFile("index.html");
}
function createNamnSlumpare(path, width, height) {
  const newWindow = new BrowserWindow({
    width: width,
    height: height,
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

function createStartBlock(path, width, height) {
  const newWindow = new BrowserWindow({
    width: width,
    height: height,
    transparent: true,
    alwaysOnTop: true,
    maximizable: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  newWindow.loadFile(path, width, height);
}

function createGroupie(path, width, height) {
  const newWindow = new BrowserWindow({
    width: width,
    height: height,
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
function createWindow(path, width, height) {
  const newWindow = new BrowserWindow({
    width: width,
    height: height,
    alwaysOnTop: true,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  newWindow.loadFile(path);
}

//////////////////////////////////////////////

// Handle the getPath request
ipcMain.handle("getPath", (event, name) => {
  return app.getPath(name);
});

app.whenReady().then(() => {
  createMainWindow();

  ipcMain.on("newWindow", (event, arg, width, height) => {
    console.log(arg);
    createWindow(arg, width, height);
  });

  ipcMain.on("namnSlumpare", (event, arg, width, height) => {
    console.log(arg);
    createNamnSlumpare(arg, width, height);
  });

  ipcMain.on("startblock", (event, arg, width, height) => {
    console.log(arg);
    createStartBlock(arg, width, height);
  });
  ipcMain.on("groupie", (event, arg, width, height) => {
    console.log(arg);
    createGroupie(arg, width, height);
    ipcMain.on("namnSlumpare", (event, arg, width, height) => {
      console.log(arg);
      createNamnSlumpare(arg, width, height);
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
