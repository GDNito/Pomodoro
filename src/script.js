const configPopup = document.querySelector("#popup")
const clock = document.querySelector("#clock")
const focusSetting = document.querySelector("#foco")
const restSetting = document.querySelector("#descanso")
const playBtn = document.querySelector("#play")
const nav = document.querySelector("#nav")
const upperhalf = document.querySelector("#upperhalf")
let running = false
let starterMinutes = localStorage.getItem("starterMinutes") || 25
let restMinutes = localStorage.getItem("restMinutes") || 5
let minutes = starterMinutes
let seconds = 0
let formated = [minutes, seconds];
let focus = true
let configVisibility = true
let interval = null
focusSetting.value = starterMinutes
restSetting.value = restMinutes


function setVisibility() {
    if (configVisibility) {
        configPopup.style.display = "flex"
    } else{
        configPopup.style.display = "none"
    }
}

function changeVisibility(state){
    if (state) {
        configVisibility = true
    }
    else{
        configVisibility = false
    }
    setVisibility()
}

function formatTimer(){
    while (seconds >= 60) {
        minutes = minutes + 1
        seconds = seconds - 60
    }
    if(seconds < 0){
        minutes = minutes - 1
        seconds = 59
    }
    if(minutes < 0){  
        seconds = 0
        minutes = 0
        let running = true
        modeSetter()
    }
    if (minutes < 10) {
        formated[0] = "0" + minutes
    } else{
        formated[0] = minutes
    }
    if (seconds < 10) {
        formated[1] = "0" + seconds
    }else{
        formated[1] = seconds
    }
    
    setTimer() 
}
function setTimer(){
    clock.innerText = formated[0] + ":" + formated[1]
}

function runTimer(){
    seconds--
    formatTimer()
}

function decrease(value) {
    seconds = seconds - value
    formatTimer()
}


function increase(value) {
    seconds = seconds + value
    formatTimer()
}

function playPause(){
    if(running){
    playBtn.src = "imgs/play.svg"
    clearInterval(interval)
    running = false}
    else{
        playBtn.src = "imgs/pause.svg"
        runTimer()
        interval = setInterval(runTimer, 1000)
        running = true
    }
}

function saveSettings() {
    localStorage.setItem("starterMinutes", focusSetting.value)
    starterMinutes = focusSetting.value
    localStorage.setItem("restMinutes", restSetting.value)
    restMinutes = restSetting.value
    focus = !focus
    modeSetter()
    console.log(minutes, starterMinutes, restMinutes)
    seconds = 0
    formatTimer()
}

function modeSetter(){
    if(focus){
        minutes = restMinutes
        seconds = 0
        nav.style.background = "#3b82f6"
        upperhalf.style.background = "#60a5fa"
        focus = false
    } else {
        minutes = starterMinutes
        seconds = 0
        nav.style.background = "#ef4444"
        upperhalf.style.background = "#f87171"
        focus = true
    }
}

formatTimer()


