const Gpio = require('onoff').Gpio;
const waterSensorPin = new Gpio(539, 'in');

const pinState = waterSensorPin.readSync();

console.log(`GPIO pin 27 is ${pinState ? 'HIGH' : 'LOW'}`);

