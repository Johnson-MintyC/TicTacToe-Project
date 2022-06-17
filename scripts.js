const boardContainer = document.querySelector(".boardcontainer");
const gameState = {
  playerOneMemory: [],
  playerTwoMemory: [],
  winConditions: [
    //rows
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    //columns
    [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ],
    //Diagonals
    [
      [1, 5, 9],
      [3, 5, 7],
    ],
  ],
};
// const playerOneMemory = [];
// const playerTwoMemory = [];

// const winConditions = [
//   //rows
//   [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ],
//   //columns
//   [
//     [1, 4, 7],
//     [2, 5, 8],
//     [3, 6, 9],
//   ],
//   //Diagonals
//   [
//     [1, 5, 9],
//     [3, 5, 7],
//   ],
// ];

//Use to check board class assignment working
const boardStateCheck = () => {
  const boardState = document.querySelectorAll(".grid");
  return console.log(boardState);
};

//Track and check whos turn it is
const TurnCheck = (param) => {
  if (gameState.playerOneMemory.length === 0) {
    playerOneClick(param);
  } else if (
    gameState.playerTwoMemory.length < gameState.playerOneMemory.length
  ) {
    playerTwoClick(param);
  } else if (
    gameState.playerOneMemory.length < gameState.playerTwoMemory.length
  ) {
    playerOneClick(param);
  } else {
    playerOneClick(param);
  }
};

//Check if square has one of the classes added and refuse
const occupiedSquareCheck = (event) => {
  if (
    !event.target.classList.contains("playerOneClick") ||
    !event.target.classList.contains("playerTwoClick")
  ) {
    event.target.classList.add("playerOneClick");
  }
};

//Jank Win Checker
const stringChecker = () => {
  for (const criterias of gameState.winConditions) {
    for (const condition of criterias) {
      let sCondition = condition.join("");
      let pOneString = gameState.playerOneMemory.sort().join("");
      console.log(pOneString);
      if (pOneString.includes(sCondition)) {
        alert("player wins");
      }
    }
  }
};

const playerOneClick = (param) => {
  const clickedChildEle = param.target;
  if (param.currentTarget !== clickedChildEle) {
    param.target.classList.add("playerOneClick");
    gameState.playerOneMemory.push(param.target.id);
    stringChecker();
    console.log(gameState.playerOneMemory);
    console.log(gameState.playerTwoMemory);
    console.log("player1running");
  }
};

const playerTwoClick = (param) => {
  const clickedChildEle = param.target;
  if (param.currentTarget !== clickedChildEle) {
    param.target.classList.add("playerTwoClick");
    gameState.playerTwoMemory.push(param.target.id);
    stringChecker();
    console.log(gameState.playerTwoMemory);
    console.log("player2running");
  }
};

// boardContainer.addEventListener("click", clickWriteToStorage);
boardContainer.addEventListener("click", TurnCheck);
