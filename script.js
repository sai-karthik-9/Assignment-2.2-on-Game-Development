const buttons = document.querySelectorAll(".button-option");
const popup = document.querySelector(".popup");
const newGameButton = document.getElementById("new-game");
const restartButton = document.getElementById("restart");
const message = document.getElementById("message");

const winningCombinations = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "X";
let movesMade = 0;

function disableButtons() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
  popup.classList.remove("hide");
}

function enableButtons() {
  buttons.forEach((button) => {
    button.textContent = ""; 
    button.disabled = false;
  });
  popup.classList.add("hide");
}

function announceWinner(player) {
  disableButtons();
  message.textContent = `Player '${player}' won the game!`;
}

function declareDraw() {
  disableButtons();
  message.textContent = "It's a Draw!";
}

newGameButton.addEventListener("click", () => {
  movesMade = 0;
  enableButtons();
});

restartButton.addEventListener("click", () => {
  movesMade = 0;
  enableButtons();
});

function checkForWinner() {
  for (const combination of winningCombinations) {
    const [firstIndex, secondIndex, thirdIndex] = combination;
    const firstValue = buttons[firstIndex].textContent;
    const secondValue = buttons[secondIndex].textContent;
    const thirdValue = buttons[thirdIndex].textContent;

    if (firstValue !== "" && firstValue === secondValue && secondValue === thirdValue) {
      announceWinner(firstValue);
      return;
    }
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.disabled) {
      return;
    }

    button.textContent = currentPlayer;
    button.disabled = true;

    movesMade++;

    checkForWinner();

    if (movesMade === 9) {
      declareDraw();
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  });
});

window.onload = enableButtons;
