import sensor from 'ds18b20-raspi';
// import ds18b20 from 'ds18b20';
import os from 'node:os';

const sensorsIDs = ['28-00000053e471', '28-8b96451f64ff', '28-8b96451f64ff'];

const readTemperatures = os.platform() === 'win32' ? 
  () => {
    const template = [3.5, 3.5, 3.5];
    const temps = template.map((temp) => Math.round((temp + Math.random()) * 10) / 10);
    console.log('Temperatures:', temps);
    return temps;
  }
: 
  async () => {
      
	  /* return sensorsIDs.map((id, i) => {
		const t = ds18b20.temperatureSync(id);
	    console.log('Temperature №', i, 'is', t);
	    return t;
	  }); */
	  
	 const rawData = await sensor.readAllC(1);
	 const temps = rawData.map((dataObj) => dataObj.t);
     console.log('Temperatures:', temps);  
	 return temps;
  }
;

export default readTemperatures;

  
