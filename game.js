let gameState = {};

function preload() {}

function create() {}

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
