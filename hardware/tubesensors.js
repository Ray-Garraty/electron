import Gpio from 'onoff';
import os from 'node:os';

const readTubeSensor = os.platform() === 'win32' ? 
  () => {
    const state = Math.round(Math.random());
    const consoleMsg = state ? 'Water in the tube detected' : 'No water in the tube';
    console.log(consoleMsg);
    return state;
  }
:
  () => {
    const waterSensorPin = new Gpio.Gpio(539, 'in');
    const state = waterSensorPin.readSync();
    const consoleMsg = state ? 'Water in the tube detected' : 'No water in the tube';
    console.log(consoleMsg);
    return state;
  }
; 

export default readTubeSensor;