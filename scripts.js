const boardContainer = document.querySelector(".boardcontainer");
const arrOfSquares = document.querySelectorAll(".grid");

//game state of shared variables
const gameState = {
  winConditions: [
    //rows
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    //columns
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    //Diagonals
    ["1", "5", "9"],
    ["3", "5", "7"],
  ],
  roundOver: false,
  resetButton: document.querySelector(".resetButton"),
};

const playerOne = {
  name: "Player 1",
  class: "playerOne",
  score: 0,
  memory: [],
  HTMLScoreBoard: document.querySelector("#p1Scoreboard"),
  HTMLName: document.querySelector("#p1Handle"),
  HTMLChangeNameButton: document.querySelector("#p1NameChange"),
  HTMLpic: document.querySelector("#p1pic"),
  HTMLChangePicButton: document.querySelector("#p1PicChange"),
};
console.log(playerOne.HTMLpic.src);

const playerTwo = {
  name: "Player 2",
  class: "playerTwo",
  score: 0,
  memory: [],
  HTMLScoreBoard: document.querySelector("#p2Scoreboard"),
  HTMLName: document.querySelector("#p2Handle"),
  HTMLChangeNameButton: document.querySelector("#p2NameChange"),
  HTMLpic: document.querySelector("#p2pic"),
  HTMLChangePicButton: document.querySelector("#p2PicChange"),
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

// Check if square has one of the classes added and refuse
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
    if (criterias.every((element) => player.memory.includes(element))) {
      alert(player.name + " Wins!");
      increaseScore(player);
      gameState.roundOver = true;
      console.log(gameState.roundOver);
      // test.TextContent = "Score: " + player.score;
    }
  }
  if (
    playerOne.memory.length === 5 &&
    playerTwo.memory.length === 4 &&
    gameState.roundOver === false
  ) {
    alert("Its a Draw");
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

//Reset the board state
const gameReset = () => {
  for (grid of arrOfSquares) {
    grid.classList.remove("playerOne");
    grid.classList.remove("playerTwo");
  }
  playerOne.memory = [];
  playerTwo.memory = [];
  gameState.roundOver = false;
  console.log("reset click");
  console.log(playerOne.score, playerTwo.score);
};

//change name of Player 1 HTML Profile
const changePlayerOneName = () => {
  const playerInput = prompt("Enter name: ");
  if (playerInput) {
    playerOne.name = playerInput;
    playerOne.HTMLName.innerText = playerInput;
  }
};

//change name of Player 2 HTML Profile
const changePlayerTwoName = () => {
  const playerInput = prompt("Enter name: ");
  if (playerInput) {
    playerTwo.name = playerInput;
    playerTwo.HTMLName.innerText = playerInput;
  }
};

gameState.resetButton.addEventListener("click", gameReset);

//Listener to change Name for P1
playerOne.HTMLChangeNameButton.addEventListener("click", changePlayerOneName);

//Listener to change Name for P2
playerTwo.HTMLChangeNameButton.addEventListener("click", changePlayerTwoName);

const changePlayerOnePic = () => {
  const playerInput = prompt("Enter Image URL: ");
  if (playerInput) {
    playerOne.HTMLpic.src = playerInput;
  }
};

const changePlayerTwoPic = () => {
  const playerInput = prompt("Enter Image URL: ");
  if (playerInput) {
    playerTwo.HTMLpic.src = playerInput;
  }
};

playerOne.HTMLpic.addEventListener("click", changePlayerOnePic);
playerOne.HTMLChangePicButton.addEventListener("click", changePlayerOnePic);

playerTwo.HTMLpic.addEventListener("click", changePlayerTwoPic);
playerTwo.HTMLChangePicButton.addEventListener("click", changePlayerTwoPic);
