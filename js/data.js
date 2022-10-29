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
