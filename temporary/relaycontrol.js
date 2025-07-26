const Gpio = require('onoff').Gpio;
const relay = new Gpio(529, 'out');

function turnOnRelay() {
  relay.writeSync(1);
  console.log('Relay is ON');
};

function turnOffRelay() {
  relay.writeSync(0);
  console.log('Relay is OFF');
};

turnOnRelay();

setTimeout(turnOffRelay, 2000);
