const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  getPath: (name) => ipcRenderer.invoke("getPath", name),
});
