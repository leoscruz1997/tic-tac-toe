const areas = document.querySelectorAll(".area");
const displayWinner = document.querySelector(".display");
const restartBtn = document.querySelector(".restartBtn");
let winnerSequence = [];

let turnPlayer = "✖️";
let winner = false; // VERIFICA SE OUVE UM VENCEDOR
let gameEnded = false; //VERIFICA SE O GAME ACABOU
let virtualBoard = ["", "", "", "", "", "", "", "", ""]; // ARMAZENA AS JOGADAS
const winingOptions = [
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal
    [0, 4, 8],
    [2, 4, 6],
]; // SEQUENCIAS VENCEDORAS

const handleClick = (area, index) => {
    if (area.textContent !== "" || winner) {
        return;
    } // RETORNA SE A POSIÇÃO JA FOI PREENCHIDAS

    virtualBoard[index] = turnPlayer; // ARMAZENA A POSIÇÃO JOGADA NO ARRAY VIRTUAL
    area.textContent = turnPlayer; // RENDERIZA A POSIÇÃO CLICADA

    turnPlayer = turnPlayer === "✖️" ? "⭕" : "✖️"; // TROCA O PLAYER ATUAL
    displayWinner.innerHTML = `<h2>Vez de ${turnPlayer}</h2>`;

    area.style.cursor = "auto"; // REMOVE O CURSOR POINTER

    handleWin();
    handleGameEnded();
};

const initializeGame = () => {
    displayWinner.innerHTML = `<h2>Vez de ${turnPlayer}</h2>`;
    areas.forEach((area, index) => {
        area.addEventListener("click", () => handleClick(area, index));
        area.style.cursor = "pointer";
    });
};

const handleWin = () => {
    for (values of winingOptions) {
        if (
            virtualBoard[values[0]] === "✖️" &&
            virtualBoard[values[1]] === "✖️" &&
            virtualBoard[values[2]] === "✖️"
        ) {
            winnerSequence = values;
            winner = true;
            gameEnded = true;
            displayWinner.innerHTML = "<h2>✖️ Venceu</h2>";
        }
        if (
            virtualBoard[values[0]] === "⭕" &&
            virtualBoard[values[1]] === "⭕" &&
            virtualBoard[values[2]] === "⭕"
        ) {
            winnerSequence = values;
            winner = true;
            gameEnded = true;
            displayWinner.innerHTML = "<h2>⭕ Venceu</h2>";
        }
    }
};

const handleGameEnded = () => {
    if (winner) {
        gameEnded = true;
        areas.forEach((item) => (item.style.cursor = "auto"));
        for (values of winnerSequence) {
            areas[values].classList.add("winner");
        }
    }
    if (!virtualBoard.includes("") && !winner) {
        gameEnded = true;
        displayWinner.innerHTML = "<h2>EMPATE</h2>";
    }
    if (gameEnded) {
        restartBtn.style.display = "inline-block";
    }
};

const handleRestart = () => {
    // ZERA TODAS AS VARIAVEIS

    turnPlayer = "✖️";
    winner = false;
    gameEnded = false;
    virtualBoard = ["", "", "", "", "", "", "", "", ""];
    winnerSequence = [];
    restartBtn.style.display = "none";
    displayWinner.innerHTML = `<h2>Vez de ${turnPlayer}</h2>`;
    areas.forEach((item) => {
        item.textContent = "";
        item.style.cursor = "pointer";
        item.classList.remove("winner");
    });
};

initializeGame();
restartBtn.addEventListener("click", handleRestart);
