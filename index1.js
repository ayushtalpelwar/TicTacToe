const cells = document.querySelectorAll(".cell");
const statustext = document.querySelector("#statustext");
const restart = document.querySelector("#restart");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 5]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentplayer = "X";
let running = false;

initialize();
function initialize() {
    cells.forEach(cell => cell.addEventListener("click", cellclicked));
    restart.addEventListener("click", restartgame);
    statustext.textContent = `${currentplayer}'s turn`;
    running = true;
}
function cellclicked() {
    console.log(this)
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index) {
    options[index] = currentplayer;
    cell.textContent = currentplayer;
}
function changeplayer() {
    currentplayer = (currentplayer == "X") ? "O" : "X";
    statustext.textContent = `${currentplayer}'s turn`;
}
function checkWinner() {
    let roundwon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundwon = true;
            break;
        }
    }
    if (roundwon) {
        statustext.textContent = `${currentplayer} wins!`;
        running = false;
    }
    else if (!options.includes("")) {
        statustext.textContent = `Draw!`;
        running = false;
    }
    else {
        changeplayer();
    }
}
function restartgame() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentplayer = "X";
    statustext.textContent = `${currentplayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}