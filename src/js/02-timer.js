import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const dateInput = document.querySelector('#datetime-picker');
const dateDays = document.querySelector('[data-days]');
const dateHours = document.querySelector('[data-hours]');
const dateMinutes = document.querySelector('[data-minutes]');
const dateSeconds = document.querySelector('[data-seconds]');
const startButton = document.querySelector('[data-start]');
const dateActual = new Date();
startButton.disabled = true;
let calendar = flatpickr(dateInput, {
  defaultDate: dateActual,
  dateFormat: 'Y-m-d H:i',
  onChange: selectedDates => {
    if (selectedDates[0] <= dateActual) {
      startButton.disabled = true;
      return console.log('Choose date in future');
    } else {
      startButton.disabled = false;
    }
  },
});
startButton.addEventListener('click', dateCalculator());
function dateCalculator() {
  let dateActualization = new Date();
  let dateRemaining = calendar.selectedDates[0] - dateActualization;
  dateDays.textContent = `${dateRemaining}`;
  console.log(dateRemaining);
}
console.log(calendar.selectedDates[0].getTime().getDate());
