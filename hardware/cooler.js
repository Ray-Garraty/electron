import Gpio from 'onoff';
import os from 'node:os';

const toggleCooler = os.platform() === 'win32' ?
  (stateToToggle) => {
    console.log('');
    if (stateToToggle) {
      console.log('Cooler enabled');
    } else {
      console.log('Cooler disabled');
    };
    console.log('');
  }    
: 
  (stateToToggle) => {
    const relayPinNumber = 529;
    const relayPin = new Gpio.Gpio(relayPinNumber, 'out');
    if (stateToToggle) {
      relayPin.writeSync(1);
      console.log('Cooler enabled on the pin №', relayPinNumber);
    } else {
      relayPin.writeSync(0);
      console.log('Cooler disabled');
    };
  } 
;

  export default toggleCooler;