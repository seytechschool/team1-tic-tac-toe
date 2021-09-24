import "./index.html";
import "./main.css";

import _ from "lodash";

// Develop below this line

var theTile;
var gameOver = false;
var currentPlayer = "X";
var stepNum = 0;

var tileMatrix = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
var stepsArr = [];

document.querySelector(".restart").addEventListener("click", clearTiles);

document.addEventListener("click", clickTile);

// function declaration below

function clearTiles() {
  var arrayOfTD = document.querySelectorAll("td");
  console.log(arrayOfTD)

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
  clearSteps()
}

function clickTile(event) {
  // console.log(event.target)
  if (
    event.target.nodeName === "TD" &&
    event.target.innerHTML.length === 0 &&
    !gameOver
  ) {
    // console.log(event.target)
    theTile = event.target;
  // console.log(theTile)
    // console.log(theTile)
    drawOnTile(theTile);
    stepNum++;
    displaySteps(stepNum)

  } else {
    return;
  }
}

function drawOnTile(tile) {
  tile.innerHTML = currentPlayer;

  var tileRow = tile.className[0];
  var tileCol = tile.className[1];
  // console.log(tileCol, tileRow)


  tileMatrix[tileRow][tileCol] = currentPlayer;
  stepsArr.push(tileMatrix)
  console.log(stepsArr)
  // console.log(tileMatrix[tileRow][tileCol])
  
  // here we will check who is the winner
  // checkWinner => boolean
  if (checkWinner(tileRow, tileCol)) {
    gameOver = true;
    document.querySelector(".winner-sign").innerHTML = `The winner is ${currentPlayer}`;
    document.querySelector(".winner-sign").style.top = "calc(50% - 25px)";
    document.querySelector('p').innerHTML = 'The winner is: ' + currentPlayer
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


console.log(theTile, 'test')

function displaySteps(step){
  var ol = document.getElementById('listSteps')
  var li = document.createElement('LI');
  li.setAttribute('class', 'liSteps')
  var btn = document.createElement('button');
  btn.setAttribute('class', 'stepsBtn');
  btn.innerHTML = 'Go to move #' + step;
  li.appendChild(btn);
  ol.appendChild(li);
  let p = document.querySelector('p');
  p.innerHTML = 'Next player is: ' + currentPlayer;
}

function clearSteps(){
  stepNum = 0;
  var ol = document.getElementById('listSteps')
  ol.querySelectorAll('.liSteps').forEach(function(item) {
        item.remove();
    });
  let p = document.querySelector('p');
  p.innerHTML = 'Next player is: ' + currentPlayer;
}
// function goToStep(){

// }
