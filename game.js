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
  initializePage(this);
  const firstPage = fetchPage(1);
  displayPage(this, firstPage);
}

function renderCharacter(scene, key) {
  if (gameState.character) {
    gameState.character.destroy();
  }
  gameState.character = scene.add.image(270, 340, key);
  gameState.character.setOrigin(0.5, 1);
  gameState.character.setScale(0.7);
}

function initializePage(scene) {
  // creates options list and background
  // and saves them into gameState

  if (!gameState.options) {
    // creates options list
    // if it doesn't exist
    gameState.options = [];
  }

  if (!gameState.narrative_background) {
    // creates narrative background
    // if it doesn't exist
    gameState.narrative_background = scene.add.rectangle(
      10,
      360,
      430,
      170,
      0x000
    );
    gameState.narrative_background.setOrigin(0, 0);
  }
}

function destroyPage() {
  // wipe out narrative text and options

  if (gameState.narrative) {
    // destroy narrative if it exists
    gameState.narrative.destroy();
  }

  for (let option of gameState.options) {
    // destroy options if they exist
    option.optionBox.destroy();
    option.optionText.destroy();
  }
}

function displayPage(scene, page) {
  const narrativeStyle = {
    fill: "#ffffff",
    fontStyle: "italic",
    align: "center",
    wordWrap: { width: 340 },
    lineSpacing: 8
  };

  // display general page character
  // & narrative here:
  renderCharacter(scene, page.character);
  gameState.narrative = scene.add.text(65, 380, page.narrative, narrativeStyle);

  // for-loop creates different options
  // need the index i for spacing the boxes
  for (let i = 0; i < page.options.length; i++) {
    let option = page.options[i];

    // color in the option box
    const optionBox = scene.add.rectangle(
      40 + i * 130,
      470,
      110,
      40,
      0xb39c0e,
      0
    );
    optionBox.strokeColor = 0xb39c0e;
    optionBox.strokeWeight = 2;
    optionBox.strokeAlpha = 1;
    optionBox.isStroked = true;
    optionBox.setOrigin(0, 0);

    // adds in the option text
    const baseX = 40 + i * 130;
    const optionText = scene.add.text(baseX, 480, option.option, {
      fontSize: 14,
      fill: "#b39c0e",
      align: "center",
      wordWrap: { width: 110 }
    });
    const optionTextBounds = optionText.getBounds();

    // centers each option text
    optionText.setX(optionTextBounds.x + 55 - optionTextBounds.width / 2);
    optionText.setY(optionTextBounds.y + 10 - optionTextBounds.height / 2);

    // adds in gameplay functionality
    // for options here
    optionBox.setInteractive();
    optionBox.on(
      "pointerup",
      function() {
        const newPage = this.option.nextPage;
        if (newPage !== undefined) {
          destroyPage();
          displayPage(scene, fetchPage(newPage));
        }
      },
      { option }
    );
    optionBox.on(
      "pointerover",
      function() {
        this.optionBox.setStrokeStyle(2, 0xffe014, 1);
        this.optionText.setColor("#ffe014");
      },
      { optionBox, optionText }
    );
    optionBox.on(
      "pointerout",
      function() {
        this.optionBox.setStrokeStyle(1, 0xb38c03, 1);
        this.optionText.setColor("#b39c0e");
      },
      { optionBox, optionText }
    );

    gameState.options.push({
      optionBox,
      optionText
    });
  }
}

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
