// import sensor from 'ds18b20-raspi';
// import ds18b20 from 'ds18b20';
import sensor from 'ds18x20';
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
  () => {
     
     return new Promise((resolve, reject) => {
        try {
          sensor.getAll((err, tempObj) => {
			console.log(tempObj);
			resolve(Object.values(tempObj));
		  });
        } catch (error) {
          reject(error);
        }
     });
     
     /* return new Promise((resolve, reject) => {
       try {
         const rawData = sensor.readAllC(1);
         // const temps = rawData.map((dataObj) => dataObj.t);
		 // console.log('Temperatures:', temps);
         resolve(rawData);
       } catch (error) {
         reject(error);
       }
     }); */
     
     /*const rawData = await sensor.readAllC(1);
	 const temps = rawData.map((dataObj) => dataObj.t);
     console.log('Temperatures:', temps);  
	 return temps; */
  }
;

export default readTemperatures;

  
