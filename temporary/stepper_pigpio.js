const Gpio = require('pigpio').Gpio;

const stepPin = new Gpio(21, {mode: Gpio.OUTPUT});
const dirPin = new Gpio(20, {mode: Gpio.OUTPUT});
const enPin = new Gpio(16, {mode: Gpio.OUTPUT});

for (i = 0; i < 10000000; i += 1) {
  stepPin.pwmWrite(127);
  dirPin.pwmWrite(0);
  enPin.pwmWrite(0);
}

enPin.pwmWrite(255);