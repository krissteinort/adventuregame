let gameState = {};

function preload() {
  // load in background and characters
  this.load.image("bg", "../media/adventuregamebackground.png");
  this.load.image("knight", "../media/adventuregameknight.png");
  this.load.image("orc", "../media/adventuregameorc.png");
  this.load.image("wizard", "../media/adventuregamewizard.png");
}

function create() {
  gameState.background = this.add.image(0, 0, "bg");
  gameState.background.setOrigin(0, 0);
  gameState.character = renderCharacter(this, "orc");
}

function renderCharacter(scene, key) {}

function initializePage(scene) {}

function destroyPage() {}

function displayPage(scene, page) {}

const config = {
  type: Phaser.WEBGL,
  parent: "phaser-game",
  backgroundColor: 0xfea0fd,
  width: 450,
  height: 550,
  scene: {
    preload,
    create
  }
};

const game = new Phaser.Game(config);

function fetchPage(page) {}
