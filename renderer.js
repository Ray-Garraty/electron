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
servoAngleOutput.textContent = angle;

coolerBtn.addEventListener('click', () => {  
  const isCoolerOn = window.electronAPI.sendSyncToMain('Toggle Cooler');
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

pumpButton.addEventListener('click', () => {
  const isPumpOn = window.electronAPI.sendSyncToMain('Toggle Pump', speed);
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

servoButton.addEventListener('click', () => {
  const newServoPosition = window.electronAPI.sendSyncToMain('Move Servo', angle);
  servoStatus.innerText = "Текущая позиция сервопривода: " + newServoPosition;
});

servoAngleInput.addEventListener('input', () => {
  servoAngleOutput.textContent = servoAngleInput.value;
  angle = servoAngleInput.valueAsNumber;
});