const startButton = document.querySelector('.js-start-button');

let session = Number.parseInt(document.querySelector('.js-minutes').innerHTML, 10);
let state = 'stopped'; // options: 'stopped', 'paused', 'running'
let myInterval;
let totalSec = session * 60;
let count = [1, 1, 1]; // idx 0: number of Pomodoros, idx 1: number of Short Breaks, idx 2: number of Long Breaks
let currCountIdx = 0; // default index: 0 (Pomodoro)

const timer = () => {
  const secondsElement = document.querySelector('.js-seconds');
  const minutesElement = document.querySelector('.js-minutes');

  if (state === 'stopped' || state === 'paused') {
    state = 'running';
    startButton.innerHTML = 'PAUSE';

    myInterval = setInterval(() => {
      totalSec--;

      let minutesLeft = Math.floor(totalSec/60);
      let secondsLeft = totalSec % 60;

      if(secondsLeft < 10) {
        secondsElement.innerHTML = '0' + secondsLeft;
      } else {
        secondsElement.innerHTML = secondsLeft;
      }
      minutesElement.innerHTML = `${minutesLeft}`;

      if (totalSec === 0) {
        clearInterval(myInterval);
        state = 'stopped';
        startButton.innerHTML = 'START'; // Reset button text
        alert('Time is up!');

        // Updates number of Pomodoros, Short Breaks, or Long Breaks
        count[currCountIdx]++;
        document.querySelector('.js-count').innerHTML = `#${count[currCountIdx]}`;
      }
    }, 1000);
  } else if (state === 'running') {
    state = 'paused';
    clearInterval(myInterval);
    startButton.innerHTML = 'START'; // Reset button text
  }
};

startButton.addEventListener('click', timer); // Executes timer once START button is clicked

// Function: changes session length based on options: Pomodoro, Short Break, or Long break
function changeSession(timerType) {
  if(timerType === 'pomodoro') {
    session = 25;
    currCountIdx = 0;
    document.querySelector('.js-focus').innerHTML = 'Time to focus!';
  } else if (timerType === 'short') {
    session = 5;
    currCountIdx = 1;
    document.querySelector('.js-focus').innerHTML = 'Time for a break!';
  } else {
    session = 10;
    currCountIdx = 2;
    document.querySelector('.js-focus').innerHTML = 'Time for a break!';
  }
  document.querySelector('.js-minutes').innerHTML = session;
  document.querySelector('.js-seconds').innerHTML = '00';
  state = 'stopped';
  totalSec = session * 60;
  startButton.addEventListener('click', timer);
}

// Gets buttons to change background color and Start button font color
const buttons = document.querySelectorAll('.pomodoro-button, .short-break-button, .long-break-button');
const box = document.getElementById('start-button-text');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    box.className = 'box';

    // Remove all background color classes from body
    document.body.className = '';

    // Get data attributes for text color and background color
    const textColorClass = button.getAttribute('data-text-color');
    const bgColorClass = button.getAttribute('data-bg-color');

    // Add new classes
    box.classList.add(textColorClass);
    document.body.classList.add(bgColorClass);
  });
});