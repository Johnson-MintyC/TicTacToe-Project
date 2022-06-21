const boardContainer = document.querySelector(".boardcontainer");
const arrOfSquares = document.querySelectorAll(".grid");

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
  Audio: new Audio("./Assets/Dealing-playing-cards.mp3"),
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
  Audio: new Audio("./Assets/Dealing-playing-cards-2.mp3"),
};

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
  currentPlayer: playerOne.name,
  roundNotice: document.querySelector(".turnNotice"),
  resetButton: document.querySelector(".resetButton"),
  unoccupiedSquares: [],
  aiButton: document.querySelector(".aiToggle"),
  resetAudio: new Audio("./Assets/Wear-armor.mp3"),
  AiUP: new Audio("./Assets/Hi-tech-button-click-interface.mp3"),
  AiDown: new Audio("./Assets/Button-click-error.mp3"),
};

//Use to check board state class assignment working, Debugging purposes
const boardStateCheck = () => {
  const boardState = arrOfSquares;
  return console.log(boardState);
};

//Track, check and alternate whos turn it is
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
      gameState.currentPlayer = playerOne.name;
    } else if (playerTwo.memory.length < playerOne.memory.length) {
      gameState.roundNotice.innerText = "It's " + playerTwo.name + " Turn";
      gameState.currentPlayer = playerTwo.name;
    } else if (playerOne.memory.length < playerTwo.memory.length) {
      gameState.roundNotice.innerText = "It's " + playerOne.name + " Turn";
      gameState.currentPlayer = playerOne.name;
    } else {
      gameState.roundNotice.innerText = "It's " + playerOne.name + " Turn";
      gameState.currentPlayer = playerOne.name;
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
    playerOne.Audio.play();
  }
};

//player 2 actions, and board state checks
const playerTwoClick = (param) => {
  const clickedChildEle = param.target;
  if (param.currentTarget !== clickedChildEle) {
    occupiedSquareCheck(param, playerTwo, pushIntoPTwoMememory);
    winChecker(playerTwo);
    playerTwo.Audio.play();
  }
};

//Listener for grid for base game functionality, and update the botice
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
  gameState.resetAudio.play();
};

//Listener for game reset button
gameState.resetButton.addEventListener("click", gameReset);

//Change Name if valid input
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
//Listener for P1 to change name and upate the turn notice to reflect
playerOne.HTMLName.addEventListener("click", TurnUpdateNotice);
playerOne.HTMLChangeNameButton.addEventListener("click", TurnUpdateNotice);

//Listener to change Pic for P2
playerTwo.HTMLpic.addEventListener("click", () => {
  changePlayerPic(playerTwo);
});
playerTwo.HTMLChangePicButton.addEventListener("click", () => {
  changePlayerPic(playerTwo);
});
//Listener for P2 to change name and upate the turn notice to reflect
playerTwo.HTMLName.addEventListener("click", TurnUpdateNotice);
playerTwo.HTMLChangeNameButton.addEventListener("click", TurnUpdateNotice);

//Toggle ai on
const AiToggle = () => {
  if (playerTwo.ai !== true) {
    playerTwo.ai = true;
    gameState.aiButton.innerText = "A.I MODE \n ON";
    gameState.AiUP.play();
  } else if (playerTwo.ai === true) {
    playerTwo.ai = false;
    gameState.aiButton.innerText = "A.I MODE OFF";
    gameState.AiDown.play();
  }
};

// Ai Turn logic, pick randomly from array of unoccupied squares
const AiLogic = () => {
  if (playerTwo.ai === true) {
    if (gameState.roundOver !== true) {
      if (playerTwo.memory.length < playerOne.memory.length) {
        if (playerOne.memory.length + playerTwo.memory.length != 9) {
          const freeSquare =
            gameState.unoccupiedSquares[
              Math.ceil(Math.random() * gameState.unoccupiedSquares.length - 1)
            ];
          playerTwo.memory.push(freeSquare.id);
          const idConvert = "#" + freeSquare.id;
          const extract = document.querySelector(idConvert);
          extract.classList.add("playerTwo");
        }
      }
      winChecker(playerTwo);
      TurnUpdateNotice();
    }
  }
};

//Harder Ai

//Return array of squares with no P1 or P2 class, therefore unoccupied
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

//Listeners to switch AI on/off, and run once AI is true
gameState.aiButton.addEventListener("click", AiToggle);
//First update list of latest unoccupied squares
boardContainer.addEventListener("click", unoccupiedListforAi);
//Then run AI to pick from latest
boardContainer.addEventListener("click", AiLogic); //Ailogic check

//Mouse over function to add text to empty divs
const mouseOver = (event) => {
  event.target.textContent = gameState.currentPlayer;
};

//Remove the text on mouse exit
const mouseOut = (event) => {
  event.target.textContent = "";
};

//Listener for for mouse on and exit
boardContainer.addEventListener("mouseover", mouseOver);
boardContainer.addEventListener("mouseout", mouseOut);

//Hard Ai
// const hardAI = () => {
//   const sq1 = document.querySelector("#sq1");
//   const sq2 = document.querySelector("#sq2");
//   const sq3 = document.querySelector("#sq3");
//   const sq4 = document.querySelector("#sq4");
//   const sq5 = document.querySelector("#sq5");
//   const sq6 = document.querySelector("#sq6");
//   const sq7 = document.querySelector("#sq7");
//   const sq8 = document.querySelector("#sq8");
//   const sq9 = document.querySelector("#sq9");
//   for (square of arrOfSquares) {
//     if (
//       sq1.classList.contains("playerOne") &&
//       sq2.classList.contains("playerOne" && !sq3.classList("playerTwo"))
//     ) {
//       sq3.classList.add("playerTwo");
//       playerTwo.memory.push("sq3");
//     } else if (
//       sq2.classList.contains("playerOne") &&
//       sq3.classList.contains("playerOne" && !sq1.classList("playerTwo"))
//     ) {
//       sq1.classList.add("playerTwo");
//       playerTwo.memory.push("sq1");
//     } else if (
//       sq1.classList.contains("playerOne") &&
//       sq3.classList.contains("playerOne" && !sq2.classList("playerTwo"))
//     ) {
//       sq2.classList.add("playerTwo");
//       playerTwo.memory.push("sq2");
//     }
//   }
// };
