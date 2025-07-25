import { app, BrowserWindow } from 'electron';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 480
});
  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => app.quit());
