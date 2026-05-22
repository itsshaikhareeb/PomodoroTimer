import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container">

    <h1>Pomodoro Timer</h1>

    <div class="modes">

  <button id="focus-btn">Focus</button>

  <button id="short-break-btn">Short Break</button>

  <button id="long-break-btn">Long Break</button>

</div>

    <div class="timer" >
      25:00
    </div>

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


let timeLeft = 6;
let isRunning = false;
let currentMode = "focus";


function updateTimer(){ 
  const minutes = Math.floor(timeLeft/60);

  const seconds = String(timeLeft % 60).padStart(2, "0");

  timerEle.innerText = `${minutes}:${seconds}`
} 
updateTimer()

let intervalId;

startBtn.addEventListener("click", () => {
  console.log("Started");
  if (isRunning) return;
  isRunning = true;
  
  intervalId = setInterval(() => {
    if(timeLeft > 0){

    timeLeft--;
    updateTimer();
  }

  else{
    isRunning =false;
    clearInterval(intervalId) 
  }
}, 1000);

});
 
pauseBtn.addEventListener("click",()=>{
  console.log("Paused");
  clearInterval(intervalId);
  isRunning =false;
})

resetBtn.addEventListener("click",()=>{
  clearInterval(intervalId)
  
  timeLeft = 10;
  updateTimer()
  isRunning= false
})



const modeEl = document.querySelector(".modes");

const focusBtn = document.querySelector("#focus-btn");

const shortBreakBtn = document.querySelector("#short-break-btn");

const longBreakBtn = document.querySelector("#long-break-btn");

function switchMode(mode){
  clearTimeout(intervalId);
  isRunning = false;

  currentMode = mode;

  if(mode === "focus"){
    timeLeft = 50
    modeEl.innerText = "Focus Time";
  } 

  else if(mode === "ShortBreak"){
    timeLeft = 20;
    modeEl.innerText = "Short Break";
  }

  else if(mode ==="longBreak"){
    timeLeft = 30;
    modeEl.innerText = "Long Break";
  }
  updateTimer();
}

focusBtn.addEventListener("click",()=>{
  switchMode("focus");
})
shortBreakBtn.addEventListener("click",()=>{
  switchMode("ShortBreak");
})
longBreakBtn.addEventListener("click",()=>{
  switchMode("longBreak");
})
 
 
 