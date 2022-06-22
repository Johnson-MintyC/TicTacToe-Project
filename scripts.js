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
  SoundWin: new Audio("./Assets/yay-6326.mp3"),
  SoundDraw: new Audio(
    "./Assets/no-luck-too-bad-disappointing-sound-effect-112943.mp3"
  ),
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
      gameState.SoundWin.play();
    }
  }
  if (
    playerOne.memory.length === 5 &&
    playerTwo.memory.length === 4 &&
    gameState.roundOver === false
  ) {
    gameState.roundNotice.innerText = "Its a Draw";
    gameState.SoundDraw.play();
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
  if (playerInput === "Robot") {
    playerTwo.HTMLName.innerText = playerInput;
    playerTwo.name = playerInput;
    playerTwo.HTMLpic.src =
      "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=957&q=80";
    playerTwo.ai = true;
    gameState.aiButton.innerHTML = "Robot has\n hijacked";
  } else if (playerInput) {
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

//Harder AI cleaned up
//Row Checker that loops through, using wining combo as relationships to check
const RowCheckerV2 = () => {
  for (criterias of gameState.winConditions) {
    let critID1 = "#" + criterias[0];
    let critID2 = "#" + criterias[1];
    let critID3 = "#" + criterias[2];
    let square1 = document.querySelector(critID1);
    let square2 = document.querySelector(critID2);
    let square3 = document.querySelector(critID3);
    if (
      square1.classList.contains("playerOne") &&
      square2.classList.contains("playerOne") &&
      !square3.classList.contains("playerTwo")
    ) {
      return square3;
    } else if (
      square2.classList.contains("playerOne") &&
      square3.classList.contains("playerOne") &&
      !square1.classList.contains("playerTwo")
    ) {
      return square1;
    } else if (
      square1.classList.contains("playerOne") &&
      square3.classList.contains("playerOne") &&
      !square2.classList.contains("playerTwo")
    ) {
      return square2;
    }
  }
};

//WinRowCheckerV2
//Checks if P2 occupies 2/3 squares of and the 3rd is free
const WinRowCheckerV2 = () => {
  for (criterias of gameState.winConditions) {
    let critID1 = "#" + criterias[0];
    let critID2 = "#" + criterias[1];
    let critID3 = "#" + criterias[2];
    let square1 = document.querySelector(critID1);
    let square2 = document.querySelector(critID2);
    let square3 = document.querySelector(critID3);
    if (
      square1.classList.contains("playerTwo") &&
      square2.classList.contains("playerTwo") &&
      !square3.classList.contains("playerOne")
    ) {
      return square3;
    } else if (
      square2.classList.contains("playerTwo") &&
      square3.classList.contains("playerTwo") &&
      !square1.classList.contains("playerOne")
    ) {
      return square1;
    } else if (
      square1.classList.contains("playerTwo") &&
      square3.classList.contains("playerTwo") &&
      !square2.classList.contains("playerOne")
    ) {
      return square2;
    }
  }
};

//push square into P2 memory
const pushintoAImemory = (square) => {
  square.classList.add("playerTwo");
  playerTwo.memory.push(square.id);
};

//Harder Ai, mapped entire decision tree, First Attempt
const hardAI = () => {
  if (playerTwo.ai === true) {
    if (gameState.roundOver !== true) {
      if (playerOne.memory.length + playerTwo.length != 9) {
        if (playerTwo.memory.length < playerOne.memory.length) {
          let freeSquare = "";
          //Go for wins
          if (WinRowCheckerV2()) {
            freeSquare = WinRowCheckerV2();
            pushintoAImemory(freeSquare);
          } else if (RowCheckerV2()) {
            freeSquare = RowCheckerV2();
            pushintoAImemory(freeSquare);
          } else if (gameState.unoccupiedSquares.length != 0) {
            freeSquare =
              gameState.unoccupiedSquares[
                Math.ceil(
                  Math.random() * gameState.unoccupiedSquares.length - 1
                )
              ];
            playerTwo.memory.push(freeSquare.id);
            const idConvert = "#" + freeSquare.id;
            const extract = document.querySelector(idConvert);
            extract.classList.add("playerTwo");
          }
        }
      }
    }
  }
  winChecker(playerTwo);
  TurnUpdateNotice();
};

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
boardContainer.addEventListener("click", hardAI); //Ailogic check

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
