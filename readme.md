# TIC TAC TOE

Tic Tac Toe Project <br/>
[Tic-Tac-Toe](https://johnson-mintyc.github.io/TicTacToe-Project/) <-- Click on link to play!

## What this is built on

This web tic tac toe game uses the following

- HTML
- CSS
- JAVASCRIPT

## Brief

Using this as a [brief](brief.md).
Create a web game as my first solo project for the General Assembly Software Engineering bootcamp

## Functionality

Tic Tac Toe is a game where one player representing X and another player representing O try to occupy 3 squares in a row

For my implementation of the game, it features the following:

1. Take turns with your friend, placing markers on the board
1. **Customize** Player **Name**
1. **Customize** Player Profile **Picture**
1. Scoreboards that keep track of win totals across multiple games
1. A **Turn Notice** that displays the current players turn
1. **Hovering** over the squares displays the current players turn
1. Sounds for wins and actions
1. **Play against a AI**, it's _pretty good_ at tic tac toe
1. Added small Easter Egg

## How the AI Works

The AI will currently actively go for _Wins_ when presented, _Block_ the player if they are close to winning and _choose a square_ when none of those are available.

## Screenshots

![Screenshot1](./Screenshots/Screen%20Shot%202022-06-22%20at%201.44.46%20PM.png)
![Screenshot2](./Screenshots/Screen%20Shot%202022-06-22%20at%205.10.29%20PM.png)
![Screenshot3](./Screenshots/Screen%20Shot%202022-06-22%20at%205.11.05%20PM.png)
![Screenshot4](./Screenshots/Screen%20Shot%202022-06-22%20at%205.38.06%20PM.png)
![Screenshot5](./Screenshots/Screen%20Shot%202022-06-22%20at%205.39.17%20PM.png)
![Screenshot3](./Screenshots/Screen%20Shot%202022-06-22%20at%205.38.31%20PM.png)

## Future Additions

- Change icons possibly
- Adjustable Grid Size

## Bug and Solution

- Original win check involved joining the players array into a string and doing the same with win condition and seeing if includes returned true
- Below is how it worked originally, minus bits for visibility

```js
const winChecker = (player, playerName) => {
  for (const criterias of gameState.winConditions) {
    let sCondition = condition.join("");
    let pMemoryString = player.memory
      .sort((a, z) => {
        return a - z;
      })
      .join("");
    console.log(pMemoryString);
    if (pMemoryString.includes(sCondition)) {
      alert(playerName + " Wins!");
      if (player.memory.length === 5) {
        console.log("Its a Draw");
        break;
      } else if (pMemoryString.includes(sCondition)) {
        alert(player.name + " Wins!");
      }
    }
  }
};
```

- This worked for most situations, except diagonals broke in long games, i.e turn 4 or greater
- As player memory will now be for example squares [1,2,5,9] and squares [1,5,9] will now no longer evaluate to win
- Solution was looking for a actual way to test for subsets and supersets, which isn't natively built into Javascript
- This now does it by checking if every element of win e.g [1,2,3] is included in player.memory via win.every((elemOfwin) => player.memory.includes(elemOfwin))
- This will check if all elements of win is a subset of the player memories superset, with the evaluation being true if all 3 of win is included
