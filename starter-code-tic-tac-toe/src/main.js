import "./index.html";
import "./main.css";

import _ from "lodash";

// Develop below this line

var theTile;
var gameOver = false;
var currentPlayer = "X";

var tileMatrix = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

document.querySelector(".restart").addEventListener("click", clearTiles);

document.addEventListener("click", clickTile);

// function declaration below

function clearTiles() {
  var arrayOfTD = document.querySelectorAll("td");

  for (let i = 0; i < arrayOfTD.length; i++) {
    arrayOfTD[i].innerHTML = "";
  }

  document.querySelector(".winner-sign").style.top = "-50px";

  gameOver = false;
  currentPlayer = "X";
  tileMatrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
}

function clickTile(event) {
  if (
    event.target.nodeName === "TD" &&
    event.target.innerHTML.length === 0 &&
    !gameOver
  ) {
    theTile = event.target;
    drawOnTile(theTile);
  } else {
    return;
  }
}

function drawOnTile(tile) {
  tile.innerHTML = currentPlayer;

  var tileRow = tile.className[0];
  var tileCol = tile.className[1];

  tileMatrix[tileRow][tileCol] = currentPlayer;

  // here we will check who is the winner
  // checkWinner => boolean
  if (checkWinner(tileRow, tileCol)) {
    gameOver = true;
    document.querySelector(
      ".winner-sign"
    ).innerHTML = `The winner is ${currentPlayer}`;
    document.querySelector(".winner-sign").style.top = "calc(50% - 25px)";
    return;
  }

  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}

function checkWinner(tileRow, tileCol) {
  var rowWin = tileMatrix[tileRow].every(function (tile) {
    return tile === currentPlayer;
  });

  var colWin = tileMatrix.every(function (row) {
    return row[tileCol] === currentPlayer;
  });

  var leftToRightDiagWin = tileMatrix.every(function (row, index) {
    return row[index] === currentPlayer;
  });

  var rightToLeftDiagWin = tileMatrix.every(function (row, index) {
    return row[row.length - index - 1] === currentPlayer;
  });

  return rowWin || colWin || leftToRightDiagWin || rightToLeftDiagWin;
}