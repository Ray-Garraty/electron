import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import managePump from './hardware/pump.js';
import toggleCooler from './hardware/cooler.js';
import moveServo from './hardware/servo.js';
import readTemperatures from './hardware/tempsensors.js';
import readTubeSensor from './hardware/tubesensors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let isCoolerOn, isPumpOn = false;
let currentAngle = 0;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 480,
    // x: 1500,
    // y: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
});
  win.loadFile('index.html');
  // win.webContents.openDevTools();
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => app.quit());

ipcMain.handle('Toggle Cooler', async () => {
  isCoolerOn = !isCoolerOn;
  await toggleCooler(isCoolerOn);
  return isCoolerOn;
});

ipcMain.handle('Toggle Pump', (event, speed) => {
  isPumpOn = !isPumpOn;
  if (isPumpOn) {
    managePump(speed);
  } else {
    managePump(0);
  }
  return isPumpOn;
});

ipcMain.handle('Move Servo', (event, angle) => {
  currentAngle = moveServo(currentAngle, angle);
  console.log('Servo position now is:', currentAngle);
  console.log('');
  return currentAngle;
});

ipcMain.handle('Temperature', () => {
  const temperatures = readTemperatures();
  return temperatures;
});

ipcMain.handle('Tube', () => {
  const isTubeFull = readTubeSensor();
  return isTubeFull;
})