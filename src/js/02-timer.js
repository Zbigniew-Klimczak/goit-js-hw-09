import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'center-top',
});
const dateInput = document.querySelector('#datetime-picker');
const dateDays = document.querySelector('[data-days]');
const dateHours = document.querySelector('[data-hours]');
const dateMinutes = document.querySelector('[data-minutes]');
const dateSeconds = document.querySelector('[data-seconds]');
const startButton = document.querySelector('[data-start]');
startButton.disabled = true;
let calendar = flatpickr(dateInput, {
  enableTime: true,
  defaultDate: new Date(),
  time_24hr: true,
  minuteIncrement: 1,
  onClose: selectedDates => {
    if (selectedDates[0] <= new Date()) {
      startButton.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future');
      calendar.setDate(new Date());
    } else {
      startButton.disabled = false;
    }
  },
});
let dateTimer = null;
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  dateInput.disabled = true;
  dateTimer = setInterval(dateCalculator, 1000);
});
function dateCalculator() {
  let dateChosen = calendar.selectedDates[0].getTime();
  let dateActual = new Date().getTime();
  let dateDifference = dateChosen - dateActual;
  dateDays.textContent = addLeadingZero(convertMs(dateDifference).days);
  dateHours.textContent = addLeadingZero(convertMs(dateDifference).hours);
  dateMinutes.textContent = addLeadingZero(convertMs(dateDifference).minutes);
  dateSeconds.textContent = addLeadingZero(convertMs(dateDifference).seconds);
  if (Math.floor(dateDifference / 1000) == 0) {
    dateInput.disabled = false;
    calendar.setDate(new Date());
    clearInterval(dateTimer);
    setTimeout(() => {
      Notiflix.Notify.success('Congratulations, you won a new Iphone!');
    }, 200);
  }
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
