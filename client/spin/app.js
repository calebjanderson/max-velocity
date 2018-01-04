var game = new Phaser.Game(800, 900, Phaser.AUTO, 'spin', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.image('spinner', 'assets/Yellow_Fidget_Spinner.png');
  game.load.image('startButton', 'assets/play-button.png');
  game.load.spritesheet('slambar', 'assets/spritesheet.png', 260, 116)
}

var spinner;
var point;
var startButton;
var spinning;
var slambar;

function create() {
  spinning = false
  game.physics.startSystem(Phaser.Physics.ARCADE);

  spinner = game.add.sprite(300, 270, 'spinner');
  slambar = game.add.sprite(180, 550,'slambar')
  button = game.add.button(650, 50, 'startButton', toggleSpinner, this);

  game.physics.enable(spinner, Phaser.Physics.ARCADE);
  spinner.anchor.set(0.579952267, 0.5)
  cursors = game.input.keyboard.createCursorKeys();
  tagButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update() {

  if(!spinning) return
  if (cursors.left.isDown || cursors.up.isDown) {
    spinner.body.angularVelocity -= 15;
  } else if (cursors.right.isDown || cursors.down.isDown) {
    spinner.body.angularVelocity += 15;
  }

  if(tagButton.isDown) {
    slambar.frame = 1
    spinner.body.angularVelocity = 0
  } else {
    slambar.frame = 0
  }

}

function render() {

}

function toggleSpinner () {
  if(!spinning) {
    spinner.body.angularVelocity = 50
  } else {
    spinner.body.angularVelocity = 0
  }

  spinning = !spinning
}
