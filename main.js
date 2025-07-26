import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { startPump, stopPump } from './hardware/pump.js';
import { toggleCooler } from './hardware/cooler.js';
import { moveServo } from './hardware/servo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let isCoolerOn, isPumpOn = false;
let currentAngle = 0;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 480,
    x: 1500,
    y: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
});
  win.loadFile('index.html');
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => app.quit());

ipcMain.on('Toggle Cooler', (event) => {
  isCoolerOn = !isCoolerOn;
  toggleCooler(isCoolerOn);
  event.returnValue = isCoolerOn;
})

ipcMain.on('Toggle Pump', (event, speed) => {
  isPumpOn = !isPumpOn;
  if (isPumpOn) {
    startPump(speed);
  } else {
    stopPump();
  };
  event.returnValue = isPumpOn;
})

ipcMain.on('Move Servo', (event, angle) => {
  currentAngle = moveServo(currentAngle, angle);
  event.returnValue = currentAngle;
  console.log('Servo position now is:', currentAngle);
})