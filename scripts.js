const boardContainer = document.querySelector(".boardcontainer");
console.log(boardContainer);

const clickTest = (param) => {
  const clickedChildEle = param.target;
  if (param.currentTarget !== clickedChildEle) {
    console.log("testing testing");
  }
};

boardContainer.addEventListener("click", clickTest);
