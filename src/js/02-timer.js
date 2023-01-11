import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
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
      window.alert('Please choose a date in the future');
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
  let dateDifferenceSeconds = Math.floor((dateChosen - dateActual) / 1000);
  let dateLeftDays = Math.floor(dateDifferenceSeconds / (24 * 60 * 60));
  let dateLeftSeconds = dateDifferenceSeconds - dateLeftDays * 24 * 60 * 60;
  let dateLeftHours = Math.floor(dateLeftSeconds / (60 * 60));
  dateLeftSeconds = dateLeftSeconds - dateLeftHours * (60 * 60);
  let dateLeftMinutes = Math.floor(dateLeftSeconds / 60);
  dateLeftSeconds = dateLeftSeconds - dateLeftMinutes * 60;
  dateDays.textContent = dateLeftDays;
  dateHours.textContent = dateLeftHours;
  dateMinutes.textContent = dateLeftMinutes;
  dateSeconds.textContent = dateLeftSeconds;
}
