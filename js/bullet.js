class Bullet {
  constructor(theRoot, playerX, playerY) {
    this.root = theRoot;
    this.playerX = playerX;
    this.playerY = playerY;
    this.x = this.playerX + PLAYER_WIDTH / 2;
    this.y = this.playerY;
    this.destroyed = false;

    this.domElement = document.createElement("img");
    this.domElement.src = "images/icons8-bullet-50.png";
    this.domElement.style.width = `${BULLET_WIDTH}px`;
    this.domElement.style.width = `${BULLET_HEIGHT}px`;
    this.domElement.style.position = "absolute";
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.zIndex = 5;

    this.root.appendChild(this.domElement);
    this.speed = -1;
  }

  update(timeDiff) {
    this.y = this.y + timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;
    if (this.y <= 0) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
  }
}
