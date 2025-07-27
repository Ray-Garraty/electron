import sensor from 'ds18b20-raspi';
import os from 'node:os';

const readTemperatures = os.platform() === 'win32' ? 
  () => {
    const template = [3.5, 3.5, 3.5];
    const temps = template.map((temp) => Math.round((temp + Math.random()) * 10) / 10);
    console.log('Temperatures:', temps);
    return temps;
  }
: 
  () => {
    const temps = sensor.readAllC();
    console.log('Temperatures:', temps);
    return temps;
  }
; 

export default readTemperatures;