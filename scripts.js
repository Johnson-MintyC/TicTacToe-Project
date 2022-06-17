const boardContainer = document.querySelector(".boardcontainer");
const clickMemory = [];
const playerOneMemory = [];
const playerTwoMemory = [];

const winConditions = [
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
];

const boardStateCheck = () => {
  const boardState = document.querySelectorAll(".grid");
  return console.log(boardState);
};

const checkWin = (param) => {
  for (criterias of winConditions) {
    for (condition of criterias) {
      if (condition.every((choice) => param.includes(choice))) {
        console.log("win");
      }
    }
    console.log(condition);
  }
};

const TurnCheck = (param) => {
  if (playerOneMemory.length === 0) {
    playerOneClick(param);
  } else if (playerTwoMemory.length < playerOneMemory.length) {
    playerTwoClick(param);
  } else if (playerOneMemory.length < playerTwoMemory.length) {
    playerOneClick(param);
  } else {
    playerOneClick(param);
  }
};

const playerOneClick = (param) => {
  const clickedChildEle = param.target;
  if (param.currentTarget !== clickedChildEle) {
    param.target.classList.add("playerOneClick");
    playerOneMemory.push(param.target.id);
    checkWin(playerOneMemory);
    console.log(playerOneMemory);
    console.log(playerTwoMemory);
    console.log("player1running");
  }
};

const playerTwoClick = (param) => {
  const clickedChildEle = param.target;
  if (param.currentTarget !== clickedChildEle) {
    param.target.classList.add("playerTwoClick");
    playerTwoMemory.push(param.target.id);
    checkWin(playerTwoMemory);
    console.log(playerTwoMemory);
    console.log("player2running");
  }
};

const clickWriteToStorage = (param) => {
  const clickedChildEle = param.target;
  clickMemory.push(param.target.outerHTML);
  console.log(clickMemory);
};

// boardContainer.addEventListener("click", clickWriteToStorage);
boardContainer.addEventListener("click", TurnCheck);

test1 = [1, 2];
test2 = [3, 4, 1, 2];

for (a in test1) {
  if (test2.every(a)) console.log("test");
}
