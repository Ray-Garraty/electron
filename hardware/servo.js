const moveServo = (prevAngle, angleToGo) => {
  console.log('');
  console.log('Previous Servo position was', prevAngle, 'degrees');
  console.log('Rotating Servo by', angleToGo, 'degrees...');
  if ((prevAngle + angleToGo) > 360) {
    return prevAngle + angleToGo - 360;
  } else if ((prevAngle + angleToGo) < -360) {
    return prevAngle + angleToGo + 360;
  } else {
    return prevAngle + angleToGo;
  }
};

export default moveServo;