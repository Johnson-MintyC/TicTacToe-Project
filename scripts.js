const boardContainer = document.querySelector(".boardcontainer");
const resetButton = document.querySelector(".resetButton");
const arrOfSquares = document.querySelectorAll(".grid");

//game state of shared variables
const gameState = {
  winConditions: [
    //rows
    [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ],
    //columns
    [
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["3", "6", "9"],
    ],
    //Diagonals
    [
      ["1", "5", "9"],
      ["3", "5", "7"],
    ],
  ],
  roundOver: false,
};

const playerOne = {
  name: "placeholderForLater1",
  class: "playerOne",
  score: 0,
  memory: [],
  HTMLScoreBoard: document.querySelector("#p1Scoreboard"),
};

const playerTwo = {
  name: "placeholderForLater2",
  class: "playerTwo",
  score: 0,
  memory: [],
  HTMLScoreBoard: document.querySelector("#p2Scoreboard"),
};

//Use to check board state class assignment working, Debugging purposes
const boardStateCheck = () => {
  const boardState = arrOfSquares;
  return console.log(boardState);
};

//Track and check whos turn it is
const TurnCheck = (param) => {
  if (gameState.roundOver !== true) {
    if (playerOne.memory.length === 0) {
      playerOneClick(param);
    } else if (playerTwo.memory.length < playerOne.memory.length) {
      playerTwoClick(param);
    } else if (playerOne.memory.length < playerTwo.memory.length) {
      playerOneClick(param);
    } else {
      playerOneClick(param);
    }
  }
};

//Check if square has one of the classes added and refuse
const occupiedSquareCheck = (event, player, whoMemory) => {
  if (
    !event.target.classList.contains("playerOne") &&
    !event.target.classList.contains("playerTwo")
  ) {
    event.target.classList.add(player.class);
    whoMemory(event); //push into memory
  }
};

//Record event id to player 1 memory
const pushIntoPOneMememory = (event) => {
  playerOne.memory.push(event.target.id);
};

//Record event id to player 2 memory
const pushIntoPTwoMememory = (event) => {
  playerTwo.memory.push(event.target.id);
};

//increase score by 1, and update the HTML to reflect
const increaseScore = (player) => {
  player.score++;
  player.HTMLScoreBoard.innerText = "Score: " + player.score;
};

//Check win array is subset of the player superset
const winChecker = (player) => {
  for (const criterias of gameState.winConditions) {
    for (const condition of criterias) {
      if (playerOne.memory.length === 5 && playerTwo.memory.length === 4) {
        alert("It's a Draw");
        player.memory.push("Void Token");
      } else if (
        condition.every((element) => player.memory.includes(element))
      ) {
        alert(player.name + "win");
        increaseScore(player);
        gameState.roundOver = true;
        console.log(gameState.roundOver);
        // test.TextContent = "Score: " + player.score;
      }
    }
  }
};

//player 1 actions, and board state checks
const playerOneClick = (param) => {
  const clickedChildEle = param.target;
  if (param.currentTarget !== clickedChildEle) {
    occupiedSquareCheck(param, playerOne, pushIntoPOneMememory);
    winChecker(playerOne);
    console.log("player1ran");
  }
};

//player 2 actions, and board state checks
const playerTwoClick = (param) => {
  const clickedChildEle = param.target;
  if (param.currentTarget !== clickedChildEle) {
    occupiedSquareCheck(param, playerTwo, pushIntoPTwoMememory);
    winChecker(playerTwo);
    console.log("player2ran");
  }
};

boardContainer.addEventListener("click", TurnCheck);

const gameReset = () => {
  for (grid of arrOfSquares) {
    grid.classList.remove("playerOne");
    grid.classList.remove("playerTwo");
  }
  playerOne.memory = [];
  playerTwo.memory = [];
  console.log("resert click");
  console.log(playerOne.score, playerTwo.score);
};

resetButton.addEventListener("click", gameReset);
