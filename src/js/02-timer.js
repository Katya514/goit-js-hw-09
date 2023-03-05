import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputRef = document.querySelector('#datetime-picker');
const buttonRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minRef = document.querySelector('[data-minutes]');
const secRef = document.querySelector('[data-seconds]');
buttonRef.disabled = true;
let selectedDate = null;
let intervalID = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    buttonRef.disabled = false;
    selectedDate = selectedDates[0];
  },
};

flatpickr(inputRef, options);

buttonRef.addEventListener('click', onButtonStartClick);
function onButtonStartClick(event) {
  buttonRef.disabled = true;
  intervalID = setInterval(() => {
    const difference = selectedDate - Date.now();
    if (difference <= 0) {
      clearInterval(intervalID);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(difference);
    daysRef.textContent = addLeadingZero(days);
    hoursRef.textContent = addLeadingZero(hours);
    minRef.textContent = addLeadingZero(minutes);
    secRef.textContent = addLeadingZero(seconds);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
