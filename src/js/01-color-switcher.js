const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let idInterval = null;

// getRandomHexColor();
// startChangeColor();
// stopChangeColor();
// disableButton();

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function startChangeColor(event) {
  disableButton();
  idInterval = setInterval(() => {
  const color = getRandomHexColor();
  document.body.style.backgroundColor =`${color}`;
  }, 1000);
};

function stopChangeColor(event) {
  clearInterval(idInterval);
  disableButton();
}

function disableButton() {
  if (!startButton.disabled) {
    startButton.disabled = true;
    stopButton.disabled = false;
  } else {
    startButton.disabled = false;
    stopButton.disabled = true;
  }
};

startButton.addEventListener("click", startChangeColor);
stopButton.addEventListener("click", stopChangeColor);
