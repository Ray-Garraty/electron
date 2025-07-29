import Gpio from 'pigpio';
import os from 'node:os';

const managePump = os.platform() === 'win32' ?
  (speed) => {
    console.log('');
    if (speed === 0) {
      console.log('Pump stopped');
    } else {
      console.log('Pump started at', speed, 'speed');
    }
    console.log('');
  }  
:
  (speed) => {
    const stepPin = new Gpio.Gpio(21, {mode: Gpio.OUTPUT});
    const dirPin = new Gpio.Gpio(20, {mode: Gpio.OUTPUT});
    const enPin = new Gpio.Gpio(16, {mode: Gpio.OUTPUT});
    if (speed === 0) {
      stepPin.pwmWrite(0);
      enPin.pwmWrite(255);
      console.log('Pump stopped');
    } else {
      dirPin.pwmWrite(0);
      enPin.pwmWrite(0);
      console.log('Pump started at', speed, 'speed');
      console.log('');
      while (speed > 0) {
        stepPin.pwmWrite(speed);
      }
    }
  }
;

export default managePump;
