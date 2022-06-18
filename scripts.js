const boardContainer = document.querySelector(".boardcontainer");
const resetButton = document.querySelector(".resetButton");
const arrOfSquares = document.querySelectorAll(".grid");

//game state of shared variables
const gameState = {
  playerOne: "playerOne",
  playerTwo: "playerTwo",
  playerOneScore: 0,
  playerTwoSCore: 0,
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

//Use to check board state class assignment working, Debugging purposes
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
const occupiedSquareCheck = (event, player, whoMemory) => {
  if (
    !event.target.classList.contains("playerOne") &&
    !event.target.classList.contains("playerTwo")
  ) {
    event.target.classList.add(player);
    whoMemory(event); //push into memory
  }
};

//Record event id to player 1 memory
const pushIntoPOneMememory = (event) => {
  gameState.playerOneMemory.push(event.target.id);
};

//Record event id to player 2 memory
const pushIntoPTwoMememory = (event) => {
  gameState.playerTwoMemory.push(event.target.id);
};

const increaseScore = () => {};

//Jank Win Checker
const winChecker = (player, playerName) => {
  for (const criterias of gameState.winConditions) {
    for (const condition of criterias) {
      let sCondition = condition.join("");
      let pMemoryString = player
        .sort((a, z) => {
          return a - z;
        })
        .join("");
      console.log(pMemoryString);
      if (pMemoryString.includes(sCondition)) {
        alert(playerName + " Wins!");
      }
    }
  }
};

//player 1 actions, and board state checks
const playerOneClick = (param) => {
  const clickedChildEle = param.target;
  if (param.currentTarget !== clickedChildEle) {
    occupiedSquareCheck(param, gameState.playerOne, pushIntoPOneMememory);
    winChecker(gameState.playerOneMemory, gameState.playerOne);
    console.log("player1ran");
  }
};

//player 2 actions, and board state checks
const playerTwoClick = (param) => {
  const clickedChildEle = param.target;
  if (param.currentTarget !== clickedChildEle) {
    occupiedSquareCheck(param, gameState.playerTwo, pushIntoPTwoMememory);
    winChecker(gameState.playerTwoMemory, gameState.playerTwo);
    console.log("player2ran");
  }
};

boardContainer.addEventListener("click", TurnCheck);

const gameReset = () => {
  for (grid of arrOfSquares) {
    grid.classList.remove("playerOne");
    grid.classList.remove("playerTwo");
  }
  gameState.playerOneMemory = [];
  gameState.playerTwoMemory = [];
};

resetButton.addEventListener("click", gameReset);
