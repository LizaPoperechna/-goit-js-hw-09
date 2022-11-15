import Notiflix from 'notiflix';

import "notiflix/dist/notiflix-3.2.5.min.css";

const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const submitBtn = document.querySelector('[type="submit"]');

function createPromise(position, delay) {

  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay })
      }
    }, delay)
  });
  return promise;
}
  
submitBtn.addEventListener('click', e => {
  e.preventDefault();

  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);

  for (let i = 0; i < amount.value; i++) { 
      createPromise(1 + i, firstDelay + i * delayStep)
          .then(({ position, delay }) => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
            Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
}
 );
