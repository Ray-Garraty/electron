const sensor = require('ds18b20-raspi');

const temps = sensor.readAllC();
console.log(temps);
