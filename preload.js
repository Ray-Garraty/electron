const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld ('electronAPI', {
  manageHardware: (command, settings) => ipcRenderer.invoke(command, settings),
  inquireSensors: (command, settings) => ipcRenderer.invoke(command, settings),
});