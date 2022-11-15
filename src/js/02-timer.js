import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

import "notiflix/dist/notiflix-3.2.5.min.css";




const refs = {
    input: document.querySelector('#datetime-picker'),
    timer: document.querySelector('.timer'),
    startButton: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};


refs.startButton.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
  

    onClose(selectedDates) {
        console.log(selectedDates[0])

        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure("Please choose a date in the future");
            return;
        } else {
            refs.startButton.disabled = false;
        };
    },
};

flatpickr(refs.input, options);

refs.startButton.addEventListener('click', startTimer);



function startTimer() {
    Notiflix.Notify.success("Отсчет начат");

    let timerId = setInterval(() => {
        let ms = new Date(refs.input.value) - new Date();

        refs.startButton.disabled = true;
    
        if (ms > 1000) {
            let timeObj = convertMs(ms)

            refs.days.textContent = addLeadingZero(timeObj.days);
            refs.hours.textContent = addLeadingZero(timeObj.hours);
            refs.minutes.textContent = addLeadingZero(timeObj.minutes);
            refs.seconds.textContent = addLeadingZero(timeObj.seconds);
        };


        if (ms <= 1000) {
            clearInterval(timerId);
            Notiflix.Notify.success("Отсчет закончен");
        };

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
    return value.toString().padStart(2, '0');
}