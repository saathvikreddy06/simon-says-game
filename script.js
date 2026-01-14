let gameSeq = [];
let userSeq = [];
let colors = ["yellow","red","blue","green"];
let started = false;
let level = 0;
let idx = 0;
let h2 = document.querySelector("h2");
let btns = document.querySelectorAll(".inner");
let score = 0;
let highScore = 0;

window.addEventListener("keydown", ()=>{
    if(started==false) {
        started = true;
        levelUp();
    }
});


function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random()*4);
    let randCol = colors[randIdx];
    let btn = document.querySelector(`.${randCol}`);
    gameSeq.push(randCol);
    flashBtn(btn);
}

function flashBtn(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function btnPress() {
    flashBtn(this);
    userSeq.push(this.classList[1]);
    if(gameSeq[idx]!=userSeq[idx]) {
        document.body.style.backgroundColor = "red";
        setTimeout(()=>{
            document.body.style.backgroundColor = "white";
        },250);
        h2.innerHTML = `GAME OVER!, Your score was ${score}<br>Press any key to restart.<br>High Score: ${highScore}`;
        level = 0;
        started = false;
        gameSeq = [];
        userSeq = [];
        score = 0;
        idx = 0;
        return;
    }
    idx++;
    if(gameSeq.length==userSeq.length) {
        setTimeout(()=>{
            score += level;
            highScore = (score>highScore)? score : highScore;
            userSeq = [];
            idx = 0;
            levelUp();
        },1000);
    }
}

for(let btn of btns) {
    btn.addEventListener("click", btnPress);
}