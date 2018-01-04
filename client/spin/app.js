var game = new Phaser.Game(800, 600, Phaser.AUTO, 'spin', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.image('spinner', 'assets/Yellow_Fidget_Spinner.png');
  game.load.image('startButton', 'assets/play-button.png');
}

var spinner;
var point;
var startButton;
var spinning;

function create() {
  spinning = false
  game.physics.startSystem(Phaser.Physics.ARCADE);

  spinner = game.add.sprite(300, 270, 'spinner');
  startButton = game.add.sprite(650, 50, 'startButton')
  button = game.add.button(650, 50, 'startButton', toggleSpinner, this);

  game.physics.enable(spinner, Phaser.Physics.ARCADE);
  console.log(spinner)
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
