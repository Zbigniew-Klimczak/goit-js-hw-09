import Notiflix from 'notiflix';
const firstDelayInput = document.querySelector('input[name="delay"]');
const delayInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');
const button = document.querySelector('button[type="submit"]');
button.addEventListener('click', evt => {
  evt.preventDefault();
  setTimeout(() => {
    for (let i = 1; i <= amountInput.value; i++) {
      let delaySum =
        parseInt(firstDelayInput.value) + parseInt(delayInput.value) * (i - 1);
      setTimeout(() => {
        return createPromise(i, delaySum)
          .then(({ position, delay }) => {
            Notiflix.Notify.success(
              `✅ Fulfilled promise ${position} in ${delay}ms`
            );
          })
          .catch(({ position, delay }) => {
            Notiflix.Notify.failure(
              `❌ Rejected promise ${position} in ${delay}ms`
            );
          });
      }, delayInput.value * (i - 1));
    }
  }, firstDelayInput.value);
});
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
