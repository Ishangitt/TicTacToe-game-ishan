const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const btn = document.querySelector(".btn");  // Changed to querySelector

window.onload = initGame;  // This initializes the game when the window loads

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Function to initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    btn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove("win");
    });
}

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "0";
    } else {
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        if (gameGrid[position[0]] !== "" && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[0]] === gameGrid[position[2]]) {
            answer = gameGrid[position[0]];

            // Add color to winning positions
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        btn.classList.add("active");
        boxes.forEach(box => box.style.pointerEvents = "none");
    } else if (!gameGrid.includes("")) {
        gameInfo.innerText = "It's a draw!";
        btn.classList.add("active");
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // Check if the game is over
        checkGameOver();
        // Swap turn if the game isn't over
        if (!btn.classList.contains("active")) {
            swapTurn();
        }
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

btn.addEventListener("click", initGame);  // Fixed to pass function reference
