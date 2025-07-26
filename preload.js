const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld ('electronAPI', {
  sendSyncToMain: (channel, data) => ipcRenderer.sendSync(channel, data)
});