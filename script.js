"use strict";
// querrySelectors ---------------------------------------------------------------
const guessString = document.querySelector(".guess");
const button = document.querySelector(".check");
const message = document.querySelector(".message");
const currentScore = document.querySelector(".score");
const playAgain = document.querySelector(".again");
const number = document.querySelector(".number");
const body = document.querySelector(".body");
const highscore = document.querySelector(".highscore");

const jsConfetti = new JSConfetti();

// variables --------------------------------------------------------------------
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// states -----------------------------------------------------------------------
let reducingScore = 20;
let topScore = 0;

// dispaly message func ---------------------------------------------------------
function dispalyMessage(msg) {
  return (message.textContent = msg);
}

// background color changer func ------------------------------------------------
function backgroundClr(color) {
  body.style.backgroundColor = color;
}

// game logic: lose, win, decrease score func -----------------------------------
button.addEventListener("click", () => {
  const guess = Number(guessString.value);
  if (!guess) {
    dispalyMessage("You didn't enter any number ☹️");
  } else if (guess === secretNumber) {
    backgroundClr("#37db63");
    jsConfetti
      .addConfetti({
        emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
      })
      .then(() => jsConfetti.addConfetti());
    dispalyMessage("Hurray! you won the game. 😀");
    number.textContent = secretNumber;
    const topCurrScore = Number(currentScore.textContent);
    if (topScore < topCurrScore) {
      topScore = topCurrScore;
      highscore.textContent = topScore;
    }
  } else if (guess !== secretNumber) {
    if (reducingScore > 1) {
      message.textContent = guess > secretNumber ? "Too high 📈" : "Too low 📉";
      reducingScore--;
      return (currentScore.textContent = reducingScore);
    } else {
      dispalyMessage("Game over ☹️. Please start the game again");
      currentScore.textContent = 0;
      backgroundClr("red");
    }
  }

  console.log(currentScore.textContent);
});

// play again btn func ---------------------------------------------------------
playAgain.addEventListener("click", () => {
  dispalyMessage("Let's play again 😀");
  backgroundClr("#012d33");
  reducingScore = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  currentScore.textContent = 20;
  number.textContent = "?";
  guessString.value = "";
});
