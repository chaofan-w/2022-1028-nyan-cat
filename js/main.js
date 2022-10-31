// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`

const gameEngine = new Engine(document.getElementById("app"));

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.

const startGameHandler = (event) => {
  if (event.code === "Enter") {
    startGame();
  }
};

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
// We call the gameLoop method to start the game
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keydown", startGameHandler);

// const startGame = () => {
//   if (fuel > 0) {
//     fuel = fuel;
//     bulletLoad = bulletLoad;
//     score = score;
//   } else {
//     fuel = 100;
//     bulletLoad = 30;
//     score = 0;
//   }
//   if (document.querySelectorAll(".enemy")) {
//     document.querySelectorAll(".enemy").forEach((enemy) => {
//       enemy.remove();
//     });
//   }

//   if (document.querySelectorAll(".bullet")) {
//     document.querySelectorAll(".bullet").forEach((bullet) => {
//       bullet.remove();
//     });
//   }

//   gameEngine.gameLoop();
// };
