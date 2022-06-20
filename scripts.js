const boardContainer = document.querySelector(".boardcontainer");
const arrOfSquares = document.querySelectorAll(".grid");

//game state of shared variables
const gameState = {
  winConditions: [
    //rows
    ["sq1", "sq2", "sq3"],
    ["sq4", "sq5", "sq6"],
    ["sq7", "sq8", "sq9"],
    //columns
    ["sq1", "sq4", "sq7"],
    ["sq2", "sq5", "sq8"],
    ["sq3", "sq6", "sq9"],
    //Diagonals
    ["sq1", "sq5", "sq9"],
    ["sq3", "sq5", "sq7"],
  ],
  roundOver: false,
  roundNotice: document.querySelector(".turnNotice"),
  resetButton: document.querySelector(".resetButton"),
  unoccupiedSquares: [],
  aiButton: document.querySelector(".aiToggle"),
};

//Player 1 Object, for data tracking and allow function reuse
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

//Player 2 Object, for data tracking and allow function reuse
const playerTwo = {
  name: "Player 2",
  class: "playerTwo",
  score: 0,
  memory: [],
  ai: false,
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

//Update turn notice
const TurnUpdateNotice = () => {
  if (
    playerOne.memory.length === 5 &&
    playerTwo.memory.length === 4 &&
    gameState.roundOver === false
  ) {
    gameState.roundNotice.innerText = "Its a Draw";
  } else if (gameState.roundOver !== true) {
    if (playerOne.memory.length === 0) {
      gameState.roundNotice.innerText = playerOne.name + " Starts";
    } else if (playerTwo.memory.length < playerOne.memory.length) {
      gameState.roundNotice.innerText = "It's " + playerTwo.name + " Turn";
    } else if (playerOne.memory.length < playerTwo.memory.length) {
      gameState.roundNotice.innerText = "It's " + playerOne.name + " Turn";
    } else {
      gameState.roundNotice.innerText = "It's " + playerOne.name + " Turn";
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
      gameState.roundNotice.innerText = player.name + " Wins!";
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
    gameState.roundNotice.innerText = "Its a Draw";
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
boardContainer.addEventListener("click", TurnUpdateNotice);

//Reset the board state
const gameReset = () => {
  for (grid of arrOfSquares) {
    grid.classList.remove("playerOne");
    grid.classList.remove("playerTwo");
  }
  playerOne.memory = [];
  playerTwo.memory = [];
  gameState.roundOver = false;
  gameState.roundNotice.innerText = playerOne.name + " Starts";
  console.log("reset click");
  console.log(playerOne.score, playerTwo.score);
};

//Listener for game reset button
gameState.resetButton.addEventListener("click", gameReset);

//Change Name after valid input
const changePlayerName = (player) => {
  const playerInput = prompt("Enter name: ");
  if (playerInput) {
    player.name = playerInput;
    player.HTMLName.innerText = playerInput;
  }
};

//Listener to change Name for P1
playerOne.HTMLName.addEventListener("click", () => {
  changePlayerName(playerOne);
});
playerOne.HTMLChangeNameButton.addEventListener("click", () => {
  changePlayerName(playerOne);
});

//Listener to change Name for P2
playerTwo.HTMLName.addEventListener("click", () => {
  changePlayerName(playerTwo);
});
playerTwo.HTMLChangeNameButton.addEventListener("click", () => {
  changePlayerName(playerTwo);
});

//change player profile pic
const changePlayerPic = (player) => {
  const playerInput = prompt("Enter Image URL: ");
  if (playerInput) {
    player.HTMLpic.src = playerInput;
  }
};

//Listener to change Pic for P1
playerOne.HTMLpic.addEventListener("click", () => {
  changePlayerPic(playerOne);
});
playerOne.HTMLChangePicButton.addEventListener("click", () => {
  changePlayerPic(playerOne);
});
//Listenerfpr P1 to change name and upate the turn notice to reflect
playerOne.HTMLName.addEventListener("click", TurnUpdateNotice);
playerOne.HTMLChangeNameButton.addEventListener("click", TurnUpdateNotice);

//Listener to change Pic for P2
playerTwo.HTMLpic.addEventListener("click", () => {
  changePlayerPic(playerTwo);
});
playerTwo.HTMLChangePicButton.addEventListener("click", () => {
  changePlayerPic(playerTwo);
});
//Listenerfpr P2 to change name and upate the turn notice to reflect
playerTwo.HTMLName.addEventListener("click", TurnUpdateNotice);
playerTwo.HTMLChangeNameButton.addEventListener("click", TurnUpdateNotice);

// AI move generator
const randomMove = () => {
  const move = Math.floor(Math.random() * 9);
  return move;
};

//Toggle ai on
const AiToggle = () => {
  if (playerTwo.ai !== true) {
    playerTwo.ai = true;
    gameState.aiButton.innerText = "A.I MODE \n ON";
  } else if (playerTwo.ai === true) {
    playerTwo.ai = false;
    gameState.aiButton.innerText = "A.I MODE OFF";
  }
};

//Ai Turn logic
const AiLogic = () => {
  if (playerTwo.ai === true) {
    if (gameState.roundOver !== true) {
      if (playerTwo.memory.length < playerOne.memory.length) {
        const freeSquare =
          gameState.unoccupiedSquares[
            Math.ceil(Math.random() * gameState.unoccupiedSquares.length - 1)
          ];
        playerTwo.memory.push(freeSquare.id);
        const idConvert = "#" + freeSquare.id;
        const extract = document.querySelector(idConvert);
        extract.classList.add("playerTwo");
        console.log(freeSquare.id);
      }
      winChecker(playerTwo);
    }
  }
};

// console.log(String(randomMove()));

const unoccupiedListforAi = () => {
  const result = [];
  for (square of arrOfSquares) {
    if (!square.classList.contains("playerOne")) {
      if (!square.classList.contains("playerTwo")) {
        result.push(square);
      }
    } else if (!square.classList.contains("playerTwo")) {
      if (!square.classList.contains("playerOne")) {
        result.push(square);
      }
    }
  }
  gameState.unoccupiedSquares = result;
};

gameState.aiButton.addEventListener("click", AiToggle);
boardContainer.addEventListener("click", unoccupiedListforAi);
boardContainer.addEventListener("click", AiLogic);
