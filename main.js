const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");
}

function createTimerWindow() {
  const timerWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  timerWindow.loadFile("timer.html");
}

app.whenReady().then(() => {
  createMainWindow();

  ipcMain.on("open-timer", () => {
    createTimerWindow();
  });
});
