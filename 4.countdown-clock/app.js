const hourBox = document.querySelector(".hour-box");
const minuteBox = document.querySelector(".minute-box");
const secondsBox = document.querySelector(".second-box");

let hour = 1;
setInterval(() => {
  if (hour > 0) {
    hourBox.innerHTML = hour;
    hour--;
  } else if (hour === 0) {
    hourBox.innerHTML = hour;
  }
}, 3600000);

let minutes = 59;
setInterval(() => {
  if (minutes > 0) {
    minuteBox.innerHTML = minutes;
    minutes--;
  } else if (minutes === 0) {
    minuteBox.innerHTML = minutes;
    minutes = 59;
  }
}, 60000);

let seconds = 59;
setInterval(() => {
  if (seconds > 0) {
    secondsBox.innerHTML = seconds;
    minuteBox.innerHTML = minutes;
    hourBox.innerHTML = hour;
    seconds--;
  } else if (seconds === 0) {
    secondsBox.innerHTML = seconds;
    seconds = 59;
  }
}, 1000);

//COMPLETED
