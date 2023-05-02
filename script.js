// Le but de ce jeu traditionnel est d'empêcher les "taupes" de sortir du sol avec un marteau. Chaque seconde, une nouvelle "taupe" apparaît et vous devrez cliquer dessus pour lui dire doucement de retourner dans le sol auquel elle appartient. Le jeu n'a pas besoin d'imaginer des taupes ou de la cruauté envers les animaux, vous pouvez simplement afficher des cercles <div>pour commencer. Chaque fois que vous cliquez sur une taupe, votre score augmente.

const holes = document.querySelectorAll(".circle");
const scoreDiv = document.getElementById("score");
const scoreSpan = document.createElement("span");
const streakDiv = document.getElementById("streak");
const streakSpan = document.createElement("span");
let score = 0;
let streak = 0;
let maxStreak = 0;
let flag = 0;
let interval = 1000;
scoreDiv.appendChild(scoreSpan);
streakDiv.appendChild(streakSpan);


function getRandomValue(max) {
    return Math.floor(Math.random() * max);
}

// function clearHoles(){
//     holes.forEach(hole => {
        
//     });
// }

function moleAppearance(){
    if(flag == 0){
        i = getRandomValue(holes.length);
        holes[i].style.backgroundColor = "red";
        flag++;
    }
}

function update(event){
    if(event.target.style.backgroundColor == "red"){
        event.target.style.backgroundColor = "white";
        score += 10;
        flag--;
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
    }
    scoreSpan.textContent = score;
    streakSpan.textContent = maxStreak;
}

setInterval(moleAppearance, interval);

holes.forEach(hole => {
    hole.addEventListener("click", update);
});

// varier intervalle
// Condition d'échec
// Clear à chaque appel
// Utiliser classe à la place de "red"