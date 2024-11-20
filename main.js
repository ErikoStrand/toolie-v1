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

function createWindow(path) {
  const mainWindow = BrowserWindow.getAllWindows()[0]; // Get main window
  if (mainWindow) {
    mainWindow.hide(); // Hide instead of close to preserve app state
  }
  const newWindow = new BrowserWindow({
    width: 400,
    height: 300,
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
