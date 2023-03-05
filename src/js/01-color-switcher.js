const buttonStartRef = document.querySelector('[data-start]');
const buttonStopRef = document.querySelector('[data-stop]');

buttonStopRef.disabled = true;
let timerID = null;
buttonStartRef.addEventListener('click', onButtonStartClick);
buttonStopRef.addEventListener('click', onButtonStopClick);

function onButtonStartClick(event) {
  toggleDisabledButtons(true, false);
  timerID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  document.body.style.backgroundColor = getRandomHexColor();
}
function onButtonStopClick(event) {
  toggleDisabledButtons(false, true);
  clearInterval(timerID);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function toggleDisabledButtons(valueForStart, valueForStop) {
  buttonStartRef.disabled = valueForStart;
  buttonStopRef.disabled = valueForStop;
}
