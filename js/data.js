// In this file we have some data that the other source files will use.
// Most of this data is stored in constants.
// Constants are just variables that never change. By convention,
// We write constants with upper case letters.

// The GAME_WIDTH and GAME_HEIGHT constants denote the size
// of the game area in pixels and is used in engine-utilities.js.
const GAME_WIDTH = 1120;
const GAME_HEIGHT = 650;
const STEP_X = 16;

// These constants represent the width and height of an enemy in pixels
// as well as the maximum number of enemies on screen at any given time.
const ENEMY_WIDTH = GAME_WIDTH / STEP_X;
const ENEMY_HEIGHT = ENEMY_WIDTH * 2;
const MAX_ENEMIES = Math.floor(STEP_X / 3);

// These constants represent the player width and height.
const PLAYER_WIDTH = GAME_WIDTH / STEP_X;
const PLAYER_HEIGHT = PLAYER_WIDTH * 0.7;

const BULLET_WIDTH = PLAYER_WIDTH / 2;
const BULLET_HEIGHT = PLAYER_WIDTH / 2;
let fuel = 100;
let bulletLoad = 30;
let score = 0;

const startGame = () => {
  document.addEventListener("keydown", keydownHandler);
  if (fuel > 0) {
    fuel = fuel;
    bulletLoad = bulletLoad;
    score = score;
  } else {
    fuel = 100;
    bulletLoad = 30;
    score = 0;
  }
  if (document.querySelectorAll(".enemy")) {
    document.querySelectorAll(".enemy").forEach((enemy) => {
      enemy.remove();
    });
  }

  if (document.querySelectorAll(".bullet")) {
    document.querySelectorAll(".bullet").forEach((bullet) => {
      bullet.remove();
    });
  }

  gameEngine.gameLoop();
};

const keydownHandler = (event) => {
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }
  if (event.code === "ArrowUp") {
    gameEngine.player.moveUp();
  }
  if (event.code === "ArrowDown") {
    gameEngine.player.moveDown();
  }
  if (event.code === "KeyB") {
    if (bulletLoad > 0) {
      bulletLoad--;
      gameEngine.shoot();
    }
  }
};
