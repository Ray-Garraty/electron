/* const Gpio = require('onoff').Gpio;
const waterSensorPin = new Gpio(539, 'in');

const readTubeSensor = () => waterSensorPin.readSync(); */

const readTubeSensor = () => {
  const state = Math.round(Math.random());
  const consoleMsg = state ? 'Water in the tube detected' : 'No water in the tube';
  console.log(consoleMsg);
  return state;
};


export default readTubeSensor;