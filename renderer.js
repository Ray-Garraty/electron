const coolerBtn = document.getElementById('Cooler on/off');
const pumpButton = document.getElementById('Pump on/off');
const servoButton = document.getElementById('Move servo');
const servoStatus = document.getElementById('Servo status');

const pumpSpeedInput = document.getElementById('pumpSpeedRange');
let speed = Number(pumpSpeedInput.textContent || pumpSpeedInput.value);
const pumpSpeedOutput = document.getElementById('pumpSpeedRangeValue');
pumpSpeedOutput.textContent = speed;

const servoAngleInput = document.getElementById('servoAngle');
let angle = Number(servoAngleInput.textContent || servoAngleInput.value);
const servoAngleOutput = document.getElementById('servoAngleValue');
servoAngleOutput.textContent = angle + '⁰';

const t1Field = document.getElementById('T1');
const t2Field = document.getElementById('T2');
const t3Field = document.getElementById('T3');
const tempFields = [t1Field, t2Field, t3Field];

const tubeSensorField = document.getElementById('Tube status');

coolerBtn.addEventListener('click', async () => {  
  const isCoolerOn = await window.electronAPI.manageHardware('Toggle Cooler');
  if (isCoolerOn) {
    coolerBtn.classList.remove('btn-success');
    coolerBtn.classList.add('btn-danger');
    coolerBtn.innerText = "Выключить Пельтье";
  } else {
    coolerBtn.classList.remove('btn-danger');
    coolerBtn.classList.add('btn-success');
    coolerBtn.innerText = "Включить Пельтье";
  };
});

pumpButton.addEventListener('click', async () => {
  const isPumpOn = await window.electronAPI.manageHardware('Toggle Pump', speed);
  if (isPumpOn) {
    pumpButton.classList.remove('btn-success');
    pumpButton.classList.add('btn-danger');
    pumpButton.innerText = "Выключить насос";
    pumpSpeedInput.disabled = true;
  } else {
    pumpButton.classList.remove('btn-danger');
    pumpButton.classList.add('btn-success');
    pumpButton.innerText = "Включить насос";
    pumpSpeedInput.disabled = false;
  };
});

pumpSpeedInput.addEventListener('input', () => {
  pumpSpeedOutput.textContent = pumpSpeedInput.value;
  speed = pumpSpeedInput.valueAsNumber;
});

servoButton.addEventListener('click', async () => {
  const newServoPosition = await window.electronAPI.manageHardware('Move Servo', angle);
  servoStatus.innerText = "Текущая позиция сервопривода: " + newServoPosition + '⁰';
});

servoAngleInput.addEventListener('input', () => {
  servoAngleOutput.textContent = servoAngleInput.value + '⁰';
  angle = servoAngleInput.valueAsNumber;
});

const inquireTempSensors = async () => {
  const temperatures = await window.electronAPI.inquireSensors('Temperature');
  
  tempFields.map((field, i) => {
    field.innerText = temperatures[i] + '⁰C';
    field.classList.remove(...field.classList);
    if (temperatures[i] > 4.2) {
      field.classList.add('btn', 'btn-lg', 'btn-outline-danger');
    } else {
      field.classList.add('btn', 'btn-lg', 'btn-outline-success');
    };
  });
};

const inquireTubeSensor = async () => {
  const isTubeFull = await window.electronAPI.inquireSensors('Tube');
  if (isTubeFull) {
    tubeSensorField.classList.remove(...tubeSensorField.classList);
    tubeSensorField.classList.add('btn', 'btn-lg', 'btn-outline-success');
    tubeSensorField.innerText = "В трубке есть вода";
  } else {
    tubeSensorField.classList.remove(...tubeSensorField.classList);
    tubeSensorField.classList.add('btn', 'btn-lg', 'btn-outline-danger');
    tubeSensorField.innerText = "Трубка пустая";
  };
};

setInterval(inquireTempSensors, 2000);

setInterval(inquireTubeSensor, 2000);