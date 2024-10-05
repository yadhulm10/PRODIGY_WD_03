// Game variables
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// DOM elements
const cells = document.querySelectorAll(".cell");
const messageDisplay = document.getElementById("message");
const resetButton = document.getElementById("reset-btn");

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Display message helper
const displayMessage = (message) => {
    messageDisplay.textContent = message;
};

// Check for a win or draw
const checkGameStatus = () => {
    let roundWon = false;

    // Check if a player has won
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        displayMessage(`${currentPlayer} has won!`);
        isGameActive = false;
        return;
    }

    // Check for a draw
    if (!board.includes("")) {
        displayMessage("It's a draw!");
        isGameActive = false;
    }
};

// Handle cell click
const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute("data-index");

    // Prevent clicking if game is over or cell is already filled
    if (board[clickedCellIndex] !== "" || !isGameActive) {
        return;
    }

    // Update the game state
    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    // Check if the game is won or drawn
    checkGameStatus();

    // Switch players
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (isGameActive) {
        displayMessage(`It's ${currentPlayer}'s turn.`);
    }
};

// Reset the game
const resetGame = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;

    cells.forEach(cell => {
        cell.textContent = "";
    });

    displayMessage(`It's ${currentPlayer}'s turn.`);
};

// Add event listeners
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});
resetButton.addEventListener("click", resetGame);

// Initialize game message
displayMessage(`It's ${currentPlayer}'s turn.`);
