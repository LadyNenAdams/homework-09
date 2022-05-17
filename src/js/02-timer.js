import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const startBtn = document.querySelector('[data-start]');
const refDays = document.querySelector('[data-days]');
const refHours = document.querySelector('[data-hours]');
const refMinutes = document.querySelector('[data-minutes');
const refSeconds = document.querySelector('[data-seconds]');

let msSelected = null;
let idInterval = null;

startBtn.disabled = true;

const settings = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    
    onClose(selectedDates) {
        msSelected = selectedDates[0].getTime();
        if (msSelected < new Date()) {
            Notify.failure('Please choose a date in the future.')
            return;
        }
        startBtn.classList.add('btn');
        startBtn.disabled = false;
    },
};

flatpickr("#datetime-picker", settings);

let object = {};

const onCountTime = () => {
    idInterval = setInterval(() => {
        const diff = msSelected - new Date().getTime();
        if (diff <= 0) {
            clearTimeout(idInterval);
            return;
        };
    object = convertMs(diff);
    onChangeContent(addLeadingZero(object));
    }, 1000)
}

function addLeadingZero(values) {
    const newValues = { ...values };
    const keys = Object.keys(newValues)
    for (const key of keys) {
        newValues[key] = String(newValues[key]).padStart(2, 0)
    } 
    return newValues;
}


function onChangeContent({ days, hours, minutes, seconds }) {
    refDays.textContent = days;
    refHours.textContent = hours;
    refMinutes.textContent = minutes;
    refSeconds.textContent = seconds;
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

startBtn.addEventListener("click", onCountTime);