"use strict";
const secretNumberEl = document.getElementById('secret-number');
const messageEl = document.getElementById('message');
const guessInput = document.getElementById('guess-input');
const checkBtn = document.getElementById('check-btn');
const againBtn = document.querySelector('.again-btn');
const scoreEl = document.getElementById('score');
const highscoreEl = document.getElementById('highscore');


const minNum = 1;
const maxNum = 20;


let secretNumber;
let score;
let highscore = 0;


function setMessage(msg) {
    messageEl.textContent = msg;
}


function generateSecretNumber() {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function resetGame() {
    secretNumber = generateSecretNumber();
    score = 20;
    scoreEl.textContent = score;
    secretNumberEl.textContent = '?';
    setMessage('');
    guessInput.value = '';
    secretNumberEl.style.backgroundColor = '#eeeeee';
    secretNumberEl.style.color = '#141414';
}


function updateScore(newScore) {
    score = newScore;
    scoreEl.textContent = score;
}


function winGame() {
    setMessage('👍Correct Number!');
    secretNumberEl.textContent = secretNumber;
    secretNumberEl.style.backgroundColor = '#60b347';
    secretNumberEl.style.color = '#fafafa';
    if (score > highscore) {
        highscore = score;
        highscoreEl.textContent = highscore;
    }
}


function checkGuess() {
    const guess = Number(guessInput.value);
    if (guess < minNum || guess > maxNum) {
        setMessage(`Please enter a valid number between ${minNum} and ${maxNum}.`);
        return;
    }
    if (guess === secretNumber) {
        winGame();
    } 
    else {
        if (score <= 1) {
        setMessage('⚠️Game Over! You lost the game.');
        updateScore(0);
        } 
        else {
            setMessage(guess > secretNumber ? '📈Too High!' : '📉Too Low!');
            updateScore(score - 1);
        }
    }
}


checkBtn.addEventListener('click', checkGuess);
againBtn.addEventListener('click', resetGame);

// Initialize game on load
resetGame();