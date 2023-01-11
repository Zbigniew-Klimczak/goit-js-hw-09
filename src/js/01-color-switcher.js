function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const bodyElem = document.querySelector('body');
startButton.classList.add('startStopButtons');
stopButton.classList.add('startStopButtons');
bodyElem.classList.add('bodyButtons');
let timer = null;
stopButton.disabled = true;
startButton.addEventListener('click', () => {
  stopButton.disabled = false;
  startButton.disabled = true;
  timer = setInterval(() => {
    bodyElem.style.backgroundColor = getRandomHexColor();
  }, 1000);
});
stopButton.addEventListener('click', () => {
  stopButton.disabled = true;
  startButton.disabled = false;
  clearInterval(timer);
});
