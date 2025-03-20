// Array Of Months
const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

// Array Of Words
const words = {
    "Easy": [
        "Hello",
        "Code",
        "Town",
        "Github",
        "Python",
        "Scala",
        "Cscade",
        "Coding",
        "Funny",
        "Task",
        "Runner",
        "Roles",
        "Test",
        "Rust",
    ],

    "Medium": ["Youtube",
        "Linkedin",
        "Paradigm",
        "Working",
        "Internet",
        "Playing",
        "Country",
        "Twitter", 
        "Styling",
        "Testing",
    ],

    "Hard": ["Programming",
        "Javascript",
        "Destructuring",
        "documentation",
        "Dependencies",
        "postgraduate",
        "anadromous",
        "scenography",
        "encyclopedism",
        "ferroelectric"
]};

const lvls = {
    "Easy": 6,
    "Medium": 4,
    "Hard": 2,
};


// localStorage.clear();

// Catch Selectors
let selectedLvl = document.getElementById("lvl");
let lvlDuration = document.querySelector(".seconds");
let startBtn = document.querySelector(".start");
let word = document.querySelector(".the-word");
let input = document.querySelector("input");
let wordsList = document.querySelector(".words");
let timeLeft = document.querySelector(".time span");
let scoreGot = document.querySelector(".got");
let totalScore = document.querySelector(".total");
let finishMsg = document.querySelector(".finish");
let instruction = document.querySelector(".instruction");
let wordsLvl, firstWord;

input.onpaste = function() {
    return false;
}

// Add game Instruction
function theInstr(lvl) {
    instruction.innerHTML = `<span class="exp">Explanation: </span>You are playing the ${lvl} Level & you have ${lvls[lvl]} seconds and 3 seconds extra for 
            the first word if you fail to write the correct word during the time you will lose, 
            if you write all words corectly you will pass the game.<br/>
        Click <span>Start Playing</span> and start your challenge.`
}


// Get Level Name And Time
function getLevel(op) {
    const defaultLvl = op;
    const lvlTime = lvls[defaultLvl];
    lvlDuration.innerHTML = lvlTime;
    timeLeft.innerHTML = lvlTime;
    totalScore.innerHTML = words[defaultLvl].length;
    wordsLvl = words[defaultLvl];
    firstWord = words[defaultLvl].length;
    theInstr(op);
};
getLevel(selectedLvl.value);
// console.log(firstWord);


selectedLvl.onchange = (e) => {
    getLevel(e.target.value);
    theInstr(e.target.value)
    // if(!startBtn.isConnected) {
    //     genWord();
    // }
};

// When Start
startBtn.onclick = function() {
    this.remove();
    input.focus();
    genWord();
};

// Generate Rondom Word
function genWord() {
    let wordIn = Math.floor(Math.random() * wordsLvl.length);
    word.innerHTML = wordsLvl[wordIn];  
    displayWords(wordIn); 
    countTime(); 
}

// Show Words List
function displayWords(index) {
    wordsList.innerHTML = "";
    wordsLvl.splice(index,1);
    wordsLvl.forEach(word => {
        wordsList.innerHTML += `<span>${word}</span>`;
    });
};

// To Count Down Time Left
function countTime() {
    if(wordsLvl.length === firstWord - 1) {
        timeLeft.innerHTML = +lvlDuration.innerHTML + 3;
    } else {
        timeLeft.innerHTML = lvlDuration.innerHTML;
    }
    let count = setInterval(function() {
        timeLeft.innerHTML--;
        if(timeLeft.innerHTML === "0") {
            clearInterval(count);
            check();
        }
    }, 1000);
}

// Check if passed or not
function check() {
    if(word.innerHTML.toLowerCase() === input.value.trim().toLowerCase()) {
        input.value = '';
        scoreGot.innerHTML++;
        if(wordsLvl.length === 0) {
            finishMsg.innerHTML =`<div class="passed">Congrats</div>`;
        } else {
            genWord();
        }
    } else {
        finishMsg.innerHTML = `<div class="game-over">Game Over</div>`;
    }
    let datenow = new Date();
    let date = `${datenow.getDate()} ${months[datenow.getMonth()]} ${datenow.getFullYear()}`;
    let lastScoreObj = {
        score: scoreGot.innerHTML,
        date: date,
    }
    window.localStorage.setItem("lastScore", JSON.stringify(lastScoreObj));
}



// Get Last Score
function getLastScore() {
    if (localStorage.getItem("lastScore") !== null) {
        let lastScore = JSON.parse(localStorage.getItem("lastScore"));
        finishMsg.innerHTML += `<div class="last-score">Your Last Score: <span>${lastScore.score}</span> on Date: ${lastScore.date}</div>`;
    }
}
getLastScore();

