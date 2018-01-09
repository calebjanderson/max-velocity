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
var cursors;
var pausePoints = [ 0.5654866776461306, 2.6203209836607546, -1.5466526054757181 ];
var oldVelocity;
var strMap = { 'left': 37, 'up': 38, 'right': 39, 'down': 40 }
var directions = { 38:  ['down', 'left', 'right' ], 40: ['up', 'left', 'right'], 37: ['up', 'down', 'right'], 39: ['up', 'down', 'left'] }
var target = 38
function create() {
  spinning = false
  game.physics.startSystem(Phaser.Physics.ARCADE);

  spinner = game.add.sprite(300, 270, 'spinner');
  slambar = game.add.sprite(180, 550,'slambar')
  button = game.add.button(650, 50, 'startButton', toggleSpinner, this);
  scoreText = game.add.text(545, 176, 'Current Speed: 0', { fontSize: '24px', fill: 'white' });
  direction = game.add.text(600, 476, 'up', { fontSize: '24px', fill: 'white' });

  game.physics.enable(spinner, Phaser.Physics.ARCADE);
  spinner.anchor.set(0.579952267, 0.5)
  cursors = game.input.keyboard.createCursorKeys();
  tagButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  tagButton.onDown.add(() => {
    console.log('press button')
    if(!spinning) {
      spinner.body.angularVelocity = oldVelocity || 15
      spinning = true
      scoreText.text = 'Current Speed: ' + spinner.body.angularVelocity;
    } else {
      oldVelocity = spinner.body.angularVelocity
      spinner.body.angularVelocity = 0
      spinning = false
      scoreText.text = 'Current Speed: ' + spinner.body.angularVelocity;
      return
    }
  })
  console.log(cursors)
  cursors.up.onDown.add((e) => {
    if(!spinning) {
      return
    }
    console.log('is down: ', e.keyCode, target)
    if(e.keyCode === target) {
      var randomIndex = Math.round(Math.random() * 1000 % 2)
      direction.text = directions[target][randomIndex]
      target = strMap[direction.text]
      spinner.body.angularVelocity += 25;
    } else {
      spinner.body.angularVelocity -= 15;
    }

  })
  cursors.down.onDown.add((e) => {
    if(!spinning) {
      return
    }
    console.log('is down: ', e.keyCode, target)
    if(e.keyCode === target) {
      var randomIndex = Math.round(Math.random() * 1000 % 2)
      direction.text = directions[target][randomIndex]
      target = strMap[direction.text]
      spinner.body.angularVelocity += 25;
    } else {
      spinner.body.angularVelocity -= 15;
    }

  })
  cursors.left.onDown.add((e) => {
    if(!spinning) {
      return
    }
    console.log('is down: ', e.keyCode, target)
    if(e.keyCode === target) {
      var randomIndex = Math.round(Math.random() * 1000 % 2)
      direction.text = directions[target][randomIndex]
      target = strMap[direction.text]
      spinner.body.angularVelocity += 25;
    } else {
      spinner.body.angularVelocity -= 15;
    }


  })
  cursors.right.onDown.add((e) => {
    if(!spinning) {
      return
    }
    console.log('is down: ', e.keyCode, target)
    if(e.keyCode === target) {
      var randomIndex = Math.round(Math.random() * 1000 % 2)
      direction.text = directions[target][randomIndex]
      target = strMap[direction.text]
      spinner.body.angularVelocity += 25;
    } else {
      spinner.body.angularVelocity -= 15;
    }


  })
  // console.log(spinner)
  // cursors.l
  console.log(tagButton)
}

function update() {
  if(!spinning) {
    return
  }
  scoreText.text = 'Current Speed: ' + spinner.body.angularVelocity;

  // if (cursors.left.isDown || cursors.up.isDown) {
  //   spinner.body.angularVelocity -= 1;
  // } else if (cursors.right.isDown || cursors.down.isDown) {
  //   spinner.body.angularVelocity += 1;
  // }
  var match = pausePoints.find(n => {
    if(spinner.rotation <= n + 0.05 && spinner.rotation >= n - 0.05) {
      return n
    }
  })
  if(tagButton.isDown) {
    slambar.frame = 1
  } else if (match) {
    console.log('match')
    slambar.frame = 1
  } else {
    slambar.frame = 0
  }

}

function render() {

}

function toggleSpinner () {
  if(!spinning) {
    spinner.body.angularVelocity = 12
  } else {
    spinner.body.angularVelocity = 0
  }

  spinning = !spinning
}
