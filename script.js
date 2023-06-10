"use strict";
// querrySelectors
const guessString = document.querySelector(".guess");
const button = document.querySelector(".check");
const message = document.querySelector(".message");
const currentScore = document.querySelector(".score");

const jsConfetti = new JSConfetti();

// variables
const secretNumber = Math.trunc(Math.random() * 10) + 1;
document.querySelector(".number").textContent = secretNumber;

// states
let reducedScore = 10;

// functions
button.addEventListener("click", () => {
  const guess = Number(guessString.value);
  if (!guess) {
    message.textContent = "You didn't enter any number ☹️";
  } else if (guess === secretNumber) {
    document.body.classList.add("won");
    jsConfetti
      .addConfetti({
        emojis: ["🌈", "⚡️", "💥", "✨", "💫", "🌸"],
      })
      .then(() => jsConfetti.addConfetti());
    message.textContent = "Correct number 😀";
  } else {
    if (reducedScore > 1) {
      if (guess > secretNumber) {
        message.textContent = "Too high ☹️";
        scoreReducer();
      } else if (guess < secretNumber) {
        message.textContent = "Too low ☹️";
        scoreReducer();
      }
    } else {
      message.textContent = "Game over ☹️. Please start the game again";
      currentScore.textContent = 0;
      document.body.classList.add("lost");
    }
  }

  console.log(currentScore.textContent);
});

function scoreReducer() {
  reducedScore--;
  return (currentScore.textContent = reducedScore);
}
