// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    this.bullets = [];
    // We add the background image to the game
    addBackground(this.root);
    this.countBanner = new Text(this.root, "5vw", "5vh");
    this.countBullet = new Text(this.root, `${GAME_WIDTH - 300}px`, "5vh");
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.

    this.countBanner.update(`Fuel: ${fuel}% | Score: ${score}`);
    this.countBullet.update(`Bullet Loads: ${bulletLoad} of 30`);
    document.removeEventListener("keydown", startGameHandler);

    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
      enemyGenerationCounts++;
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      document.addEventListener("keydown", startGameHandler);
      document.removeEventListener("keydown", keydownHandler);
      if (fuel >= 20) {
        fuel -= 20;
        this.countBanner.update(`Fuel: ${fuel}% | Score: ${score}`);
      } else {
        fuel = 0;
        this.countBanner.update(`Fuel: ${fuel}% | Score: ${score}`);
      }
      if (fuel === 0) {
        let gameover = new Text(
          this.root,
          `${GAME_WIDTH / 2 - 200}px`,
          `${GAME_HEIGHT / 2 - 100}px`
        );
        gameover.domElement.className = "gameover";
        gameover.domElement.style.textAlign = "center";
        gameover.domElement.style.width = "400px";
        gameover.domElement.style.height = "200px";
        gameover.update("G A M E   O V E R ! \n Press <Enter> to play again");
      }
      console.log(enemyGenerationCounts);
      return;
    }

    // else {
    //   return;
    // }
    // window.alert("Game over");

    // -----------------------------------------------------------------
    if (this.lastBulletFrame === undefined) {
      this.lastBulletFrame = new Date().getTime();
    }

    let bulletTimeDiff = new Date().getTime() - this.lastBulletFrame;
    this.lastBulletFrame = new Date().getTime();
    this.bullets.forEach((bullet) => {
      bullet.update(bulletTimeDiff);
      this.enemies.forEach((enemy) => {
        if (
          enemy.y >= bullet.y - ENEMY_HEIGHT &&
          // enemy.x <= bullet.x + BULLET_WIDTH &&
          // enemy.x >= bullet.x - ENEMY_WIDTH
          bullet.x === enemy.x + ENEMY_WIDTH / 4
        ) {
          if (enemy.domElement) {
            // enemy.root.removeChild(enemy.domElement);
            enemy.domElement.remove();
            enemy.destroyed = true;
            score++;
          }
          if (bullet.domElement) {
            bullet.destroyed = true;
            // bullet.root.removeChild(bullet.domElement);
            bullet.domElement.remove();
          }
        }
      });
    });

    this.bullets = this.bullets.filter((bullet) => {
      return !bullet.destroyed;
    });

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  shoot = () => {
    this.bullets.push(new Bullet(this.root, this.player.x, this.player.y));
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.

  isPlayerDead = () => {
    let collision = false;
    this.enemies.forEach((enemy) => {
      if (
        enemy.y <= this.player.y + PLAYER_HEIGHT &&
        enemy.y >= this.player.y - ENEMY_HEIGHT &&
        this.player.x === enemy.x
      ) {
        if (enemy.domElement.classList.contains("goldApple")) {
          collision = false;
          fuel = 100;
          let fuelPopUp = new Popup(
            this.root,
            this.player.x,
            `${this.player.y + 20}px`
          );
          fuelPopUp.update("100% recovered!");
          setTimeout(() => {
            fuelPopUp.domElement.remove();
          }, 800);
          enemy.domElement.remove();
          enemy.destroyed = true;
        } else if (enemy.domElement.classList.contains("reload")) {
          collision = false;
          bulletLoad = 30;
          let fuelPopUp = new Popup(
            this.root,
            this.player.x,
            `${this.player.y + 20}px`
          );
          fuelPopUp.update("30 Arrows Reloaded!");
          setTimeout(() => {
            fuelPopUp.domElement.remove();
          }, 800);
          enemy.domElement.remove();
          enemy.destroyed = true;
        } else {
          collision = true;
        }
      }
    });
    return collision;
  };
}
