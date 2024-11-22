const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    maximizable: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");
}

function createWindow(path) {
  const mainWindow = BrowserWindow.getAllWindows()[0]; // Get main window
  if (mainWindow) {
    mainWindow.hide(); // Hide instead of close to preserve app state
  }
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

  newWindow.on("closed", () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });
}

app.whenReady().then(() => {
  createMainWindow();

  ipcMain.on("newWindow", (event, arg) => {
    console.log(arg);
    createWindow(arg);
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
