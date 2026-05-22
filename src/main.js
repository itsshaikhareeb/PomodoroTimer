import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container">

    <h1>Pomodoro Timer</h1>

    <div class="modes">

  <button id="focus-btn">Focus</button>

  <button id="short-break-btn">Short Break</button>

  <button id="long-break-btn">Long Break</button>

</div>
<h2 id="mode">Focus Time</h2>
    <div class="timer" >
      25:00
    </div>
    <p id="session-count">
      Completed Sessions: 0
    </p>

    <div class="buttons">
      <button class="reset-btn btn" > Reset</button>
      <button class="pause-btn btn" >Pause</button>
      <button class="start-btn btn" >Start</button>
    </div>
  </div>
`

const timerEle = document.querySelector(".timer");

const startBtn = document.querySelector(".start-btn");

const pauseBtn = document.querySelector(".pause-btn");

const resetBtn = document.querySelector(".reset-btn");

const alarmSound = new Audio("/audioFile.wav");


let timeLeft = 7;
let isRunning = false;
let currentMode = "focus";
let completedPomodoros = 0;


function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);

  const seconds = String(timeLeft % 60).padStart(2, "0");

  timerEle.innerText = `${minutes}:${seconds}`
}
updateTimer()

let intervalId;

function startTimer() {

  if (isRunning) return;

  isRunning = true;

  intervalId = setInterval(() => {

    if (timeLeft > 0) {

      timeLeft--;

      updateTimer();

    }

    else {

      clearInterval(intervalId); 

      isRunning = false;

      alarmSound.play();

      handleSessionEnd();

    }

  }, 1000);

}
startBtn.addEventListener("click", () => {
  startTimer();
});

pauseBtn.addEventListener("click", () => {
  console.log("Paused");
  clearInterval(intervalId);
  isRunning = false;
})

const sessionCountEl = document.querySelector("#session-count");
resetBtn.addEventListener("click", () => {

  clearInterval(intervalId);

  isRunning = false;

  completedPomodoros = 0;

  sessionCountEl.innerText =
    "Completed Sessions: 0";

  switchMode("focus");

});



const modeEl = document.querySelector("#mode");

const focusBtn = document.querySelector("#focus-btn");

const shortBreakBtn = document.querySelector("#short-break-btn");

const longBreakBtn = document.querySelector("#long-break-btn");


function switchMode(mode) {
  clearInterval(intervalId);
  isRunning = false;

  currentMode = mode;

  if (mode === "focus") {
    timeLeft = 7
    modeEl.innerText = "Focus Time";
  }

  else if (mode === "shortBreak") {
    timeLeft = 3;
    modeEl.innerText = "Short Break";
  }

  else if (mode === "longBreak") {
    timeLeft = 5;
    modeEl.innerText = "Long Break";
  }
  updateTimer();
}

function handleSessionEnd() {

  if (currentMode === "focus") {

    completedPomodoros++;

    sessionCountEl.innerText =
      `Completed Sessions: ${completedPomodoros}`;

    if (completedPomodoros % 4 === 0) { //after every 4 focus sessions..

      switchMode("longBreak");
      startTimer();

    } else {

      switchMode("shortBreak");
      startTimer();

    }

  }

  else {

    switchMode("focus");
    startTimer();

  }

}




focusBtn.addEventListener("click", () => {
  switchMode("focus");
})
shortBreakBtn.addEventListener("click", () => {
  switchMode("shortBreak");
})
longBreakBtn.addEventListener("click", () => {
  switchMode("longBreak");
})



