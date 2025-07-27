/* import Gpio from 'onoff';

const relayPinNumber = 529;
const relayPin = new Gpio.Gpio(relayPinNumber, 'out');

const toggleCooler = (stateToToggle) => {
  if (stateToToggle) {
    relayPin.writeSync(1);
    console.log('Cooler enabled on the pin №', relayPinNumber);
  } else {
    relayPin.writeSync(0);
    console.log('Cooler disabled');
  };
}; */

const toggleCooler = (stateToToggle) => {
  console.log('');
  if (stateToToggle) {
    console.log('Cooler enabled');
  } else {
    console.log('Cooler disabled');
  };
  console.log('');
};

export default toggleCooler;