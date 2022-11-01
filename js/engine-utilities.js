// In this file we have functions that will be used in the Engine.js file.
// nextEnemySpot is a variable that refers to a function. The function has one parameter,
// which we called enemies. enemies will refer to an array that will contain instances of the
// Enemy class. To get more information about the argument that will get passed to this function,
// please see the Engine.js file.

// The purpose of this function is to determine in which slot to place our next enemy.
// The possibilities are 0, 1, 2, 3 or 4.
const nextEnemySpot = (enemies) => {
  // enemySpots will refer to the number of spots available (can you calculate it?)
  const enemySpots = GAME_WIDTH / ENEMY_WIDTH;

  // To find out where to place an enemy, we first need to find out which are the spots available.
  // We don't want to place two enemies in the same lane. To accomplish this, we first create an
  // array with 5 elements (why 5?) and each element is false.
  // We then use forEach to iterate through all the enemies.
  // If you look at the constructor of the Enemy class, you can see that every instance will have a spot property.
  // We can use this property to modify the spotsTaken array.
  let spotsTaken = [];
  for (let i = 0; i < enemySpots; i++) {
    spotsTaken.push(false);
  }
  // const spotsTaken = [false, false, false, false, false];
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
  });

  // We are now in a position to find out position. We declare a variable candidate that is initially undefined.
  // candidate represents a potential spot. The variable will be repeatedly assigned different numbers.
  // We will randomly try different spots until we find out that is available
  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    // candidate is assigned a random number between 0 and enemySpots (not including enemySpots). (what number is enemySpots?)
    candidate = Math.floor(Math.random() * enemySpots);
  }

  // When the while loop is finished, we are assured that we have a number that corresponds to a free spot, so we return it.
  return candidate;
};

// addBackground contains all the logic to display the starry background of the game.
// It is a variable that refers to a function.
// The function takes one parameter
// The parameter represents the DOM node to which we will add the background
const addBackground = (root) => {
  // We create a new img DOM node.
  const bg = document.createElement("img");

  // We set its src attribute and the height and width CSS attributes
  bg.src = "images/minecraft.jpg";
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH}px`;

  // We add it to the root DOM node
  root.append(bg);

  // We don't want the enemies to go beyond the lower edge of the image
  // so we place a white div to hide the enemies after they reach the bottom.
  // To see what it does, you can comment out all the remaining lines in the function to see the effect.
  const whiteBox = document.createElement("div");

  // We put a high z-index so that the div is placed over all other DOM nodes
  whiteBox.style.zIndex = 100;
  whiteBox.style.position = "absolute";
  whiteBox.style.top = `${GAME_HEIGHT}px`;
  whiteBox.style.height = `${document.body.offsetHeight - GAME_HEIGHT}px`;
  whiteBox.style.width = `${GAME_WIDTH}px`;
  whiteBox.style.backgroundImage = "url('./images/bottomBkg.jpg-1.png')";
  whiteBox.style.backgroundPosition = "center";
  whiteBox.style.backgroundSize = "cover";

  root.append(whiteBox);

  const startPage = document.createElement("div");
  startPage.className = "startPage";
  startPage.style.zIndex = 100;
  startPage.innerText =
    "Let's help Mikey Turtle explore the world of minecraft!" +
    "\n" +
    "⬆ ➡ ⬇ ⬅ to move" +
    "\n" +
    "press 🅱 to fire" +
    "\n" +
    "catch 🍏 to refeul" +
    "\n" +
    "catch 🏹 to reload" +
    "\n" +
    "press enter to start";
  startPage.style = `
    text-align: 'center'; 
    margin:10vh auto;
    width:50vw;
    height:30vw;
    color:white;
    position:absolute;
    top:30%;
    left:50%;
    transform:translate(-50%,-50%);
    background:white;
    font-family:'Roboto Condensed', sans-serif;
    font-size:2.5vw;
    padding:10px;
    border-radius:7px;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    line-height:3vw;
    


  `;
  root.append(startPage);
};

// console.log(document.body.offsetHeight);
