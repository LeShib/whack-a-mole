// Le but de ce jeu traditionnel est d'empêcher les "taupes" de sortir du sol avec un marteau. Chaque seconde, une nouvelle "taupe" apparaît et vous devrez cliquer dessus pour lui dire doucement de retourner dans le sol auquel elle appartient. Le jeu n'a pas besoin d'imaginer des taupes ou de la cruauté envers les animaux, vous pouvez simplement afficher des cercles <div>pour commencer. Chaque fois que vous cliquez sur une taupe, votre score augmente.
// Variables
const but = document.getElementById("start_but");
const holes = document.querySelectorAll(".circle");
const scoreDiv = document.getElementById("score");
const scoreSpan = document.createElement("span");
const bestStreakDiv = document.getElementById("best_streak");
const BestStreakSpan = document.createElement("span");
const streakDiv = document.getElementById("streak_in_progress");
const streakSpan = document.createElement("span");
const timerDiv = document.getElementById("timer");
const timerSpan = document.createElement("span");
let score;
let streak;
let maxStreak;
let interval;
let lastHole;
let timerInterval;
let gameInterval;
let min;
let sec;


// Fonctions
function getRandomValue(max) {
    return Math.floor(Math.random() * max);
}

function clearHoles(){
    holes.forEach(hole => {
        hole.classList.remove("used");
    });
}

function timer(){
    sec--;
    if(sec == 0 && min > 0){
        min--;
        sec = 59;
    }
    if(sec < 10){
        timerSpan.textContent = min + ":0" + sec;
    } else {
        timerSpan.textContent = min + ":" + sec;
    }
    if(min == 0 && sec == 0){
        clearInterval(timerInterval);
        clearInterval(gameInterval);
        alert("score final : " + (score + (maxStreak*5)));
    }
}

function moleAppearance(){
    clearHoles();
    let i = getRandomValue(holes.length);
    if(i == lastHole){
        i = getRandomValue(holes.length);
    }
    holes[i].classList.add("used");
    lastHole = i;
}

function update(event){
    if(event.target.classList[2] == "used"){
        event.target.classList.remove("used");
        score += 10;
        if(interval > 0){
            interval -= 50;
        }
        streak++;
        if(maxStreak < streak){
            maxStreak = streak;
        }
    }else{
        score -= 10;
        streak = 0;
        interval = 1000;
    }
    scoreSpan.textContent = score;
    streakSpan.textContent = streak;
    BestStreakSpan.textContent = maxStreak;
}

function start(){
    min = 0;
    sec = 20;
    score = 0;
    streak = 0;
    maxStreak = 0;
    interval = 1000;
    scoreSpan.textContent = score;
    streakSpan.textContent = streak;
    BestStreakSpan.textContent = maxStreak;
    timerInterval = setInterval(timer, 1000);
    gameInterval = setInterval(moleAppearance, interval);
}

// Programme
scoreDiv.appendChild(scoreSpan);
bestStreakDiv.appendChild(BestStreakSpan);
streakDiv.appendChild(streakSpan);
timerDiv.appendChild(timerSpan);


// Evenements
but.addEventListener("click", start);
holes.forEach(hole => {
    hole.addEventListener("click", update);
});

// LeaderBoard 