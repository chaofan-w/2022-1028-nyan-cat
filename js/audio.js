class Audio {
  constructor(root, file, id) {
    this.root = root;
    this.file = file;
    this.id = id;
    const audio = document.createElement("audio");
    audio.setAttribute("src", file);
    audio.setAttribute("type", "audio/mpeg");
    audio.setAttribute("id", id);
    root.appendChild(audio);
  }
}

const bgmAudio = new Audio(
  document.getElementById("app"),
  "./audio/Nyan Cat BGM.mp3",
  "BGM"
);
document.getElementById("BGM").loop = true;
document.getElementById("BGM").volume = 0.5;

const gameOverAudio = new Audio(
  document.getElementById("app"),
  "./audio/Nyan Cat Gameover.mp3",
  "gameOverSound"
);
document.getElementById("gameOverSound").loop = false;
document.getElementById("gameOverSound").playbackRate = 0.7;

const pikaSpeed = new Audio(
  document.getElementById("app"),
  "./audio/pikaspeed.mp3",
  "pikaspeed"
);
document.getElementById("pikaspeed").loop = false;
const shooting = new Audio(
  document.getElementById("app"),
  "./audio/shooting_20221031161442.mp3",
  "shooting"
);
document.getElementById("pikaspeed").loop = false;

const speedUp = new Audio(
  document.getElementById("app"),
  "./audio/speedUp.mp3",
  "speedUp"
);
document.getElementById("speedUp").loop = false;
