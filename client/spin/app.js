var game = new Phaser.Game(800, 900, Phaser.AUTO, 'spin', { preload: preload, create: create, update: update, render: render });

console.log(moment)

function preload() {
  game.load.image('spinner', 'assets/Yellow_Fidget_Spinner.png');
  game.load.image('startButton', 'assets/play-button.png');
  // game.load.spritesheet('slambar', 'assets/spritesheet.png', 260, 116)
  // game.load.spritesheet('directions', 'assets/direction-spritesheet.png', )
}

var timePassed = 0;
var startTime;
var pauseTime;
var time;
var spinner;
var point;
var startButton;
var spinning;
var slambar;
var cursors;
var pausePoints = [ 0.5654866776461306, 2.6203209836607546, -1.5466526054757181 ];
var oldVelocity;
var frameMap = {'down': '↓', 'left': '←', 'right': '→', 'up': '↑'}
var strMap = { 'left': 37, 'up': 38, 'right': 39, 'down': 40 }
var directions = { 38:  ['down', 'left', 'right' ], 40: ['up', 'left', 'right'], 37: ['up', 'down', 'right'], 39: ['up', 'down', 'left'] }
var target = 38;
var temp

function score(e) {
  if(!spinning) {
    return
  }

  // If the direction pressed matches the one displayed
  if(e.keyCode === target) {

    // Decide next direction and increase speed
    var randomIndex = Math.round(Math.random() * 1000 % 2)
    temp = directions[target][randomIndex]

    target = strMap[temp]

    direction.text = 'Press this key: \n ' + '    ' + temp + '   ' + frameMap[temp]

    // direction2.frame = frameMap.indexOf(direction.text)
    spinner.body.angularVelocity += 45;
  } else {
    // Wrong input, decrease speed
    spinner.body.angularVelocity -= 15;
  }

}

function create() {
  time = moment();
  spinning = false
  game.physics.startSystem(Phaser.Physics.ARCADE);

  spinner = game.add.sprite(300, 270, 'spinner');
  // slambar = game.add.sprite(180, 550, 'slambar')
  // direction2 = game.add.sprite(600, 550, 'directions')
  button = game.add.button(650, 50, 'startButton', toggleSpinner, this);
  scoreText = game.add.text(545, 176, 'Current Speed: 0', { fontSize: '24px', fill: 'white' });
  Timer = game.add.text(25, 476, '  Timer: \n 00:00:00', { fontSize: '24px', fill: 'white' });
  direction = game.add.text(600, 476, 'Click Play to start!', { fontSize: '24px', fill: 'white' });

  game.physics.enable(spinner, Phaser.Physics.ARCADE);
  spinner.anchor.set(0.579952267, 0.5)
  cursors = game.input.keyboard.createCursorKeys();
  tagButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  tagButton.onDown.add(() => {
    if(!spinning) {
      // spinner.body.angularVelocity = oldVelocity || 15
      // spinning = true
      // scoreText.text = 'Current Speed: ' + spinner.body.angularVelocity;
    } else {
      oldVelocity = spinner.body.angularVelocity
      spinner.body.angularVelocity = 0
      spinning = false
      scoreText.text = 'Current Speed: ' + spinner.body.angularVelocity;
      return
    }
  })
  cursors.up.onDown.add(score)
  cursors.down.onDown.add(score)
  cursors.left.onDown.add(score)
  cursors.right.onDown.add(score)

  // cursors.l
}

function startTimer() {
  time = moment()
  startTime = moment();
}

function victory() {
  spinning = false
  startTime = null
  direction.text = 'You win!'
}

function update() {
  time = moment()
  if(startTime) {
    timePassed += time.diff(startTime, 'ss')
    Timer.text = 'Timer: \n ' + moment(timePassed).format('mm:ss:SS')
    startTime = time
  }
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
  // if(tagButton.isDown) {
  //   slambar.frame = 1
  // } else if (match) {
  //   slambar.frame = 1
  // } else {
  //   slambar.frame = 0
  // }

  if(spinner.body.angularVelocity == 1000) {
    victory()
  }
}

function render() {

}

function toggleSpinner () {
  if(!spinning) {
    spinner.body.angularVelocity = 8
  } else {
    spinner.body.angularVelocity = 0
  }

  spinning = !spinning
  startTimer()
  direction.text = 'Press this key: \n ' + '    ' + 'up' + '   ' + '↑'
}
