import Notiflix from 'notiflix';
const firstDelay = document.querySelector('input[name="delay"]');
const delay = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const button = document.querySelector('button[type="submit"]');
const form = document.querySelector('.form');
button.addEventListener('click', evt => {
  evt.preventDefault();
  setTimeout(() => {
    for (let i = 1; i <= amountInput.value; i++) {
      console.log(i);
      return createPromise;
    }
  }, firstDelay.value);
});
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
createPromise()
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`Fullfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.warning(`Rejected promise ${position} in ${delay}ms`);
  });
