/* import Gpio from 'onoff';

const stepPin = new Gpio.Gpio(21, {mode: Gpio.OUTPUT});
const dirPin = new Gpio.Gpio(20, {mode: Gpio.OUTPUT});
const enPin = new Gpio.Gpio(16, {mode: Gpio.OUTPUT});

const managePump = (speed) => {
  if (speed === 0) {
    stepPin.pwmWrite(0);
    enPin.pwmWrite(255);
    console.log('Pump stopped');
  } else {
    dirPin.pwmWrite(0);
    enPin.pwmWrite(0);
    console.log('Pump started at', speed, 'speed');
    while (speed > 0) {
      stepPin.pwmWrite(speed);
    }
  }
}; */

const managePump = (speed) => {
  console.log('');
  if (speed === 0) {
    console.log('Pump stopped');
  } else {
    console.log('Pump started at', speed, 'speed');
  }
  console.log('');
};

export default managePump;