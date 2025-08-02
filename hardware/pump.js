import os from 'node:os';
import Gpio from 'onoff';
import pwm from 'raspi-soft-pwm';

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
	const stepPin = new pwm.SoftPWM({
	  pin: 'GPIO21',
	  frequency: 1500
    });
    const dirPin = new Gpio.Gpio(532, 'out');
    const enPin = new Gpio.Gpio(528, 'out');
  
    dirPin.writeSync(1);
    enPin.writeSync(0);
  
    for (let i = 0; i < 10000000; i += 1) {
	  stepPin.write(0.5);
    }
    enPin.writeSync(1);
  }
;

export default managePump;
