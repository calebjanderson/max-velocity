setTimeout(() => {
  var game = new Phaser.Game(1300, 600, Phaser.AUTO, 'spin', { preload: preload, create: create, update: update, render: render });

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
  var Timer;
  var cursors;
  var pausePoints = [ 0.5654866776461306, 2.6203209836607546, -1.5466526054757181 ];
  var oldVelocity;
  var frameMap = {'down': '↓', 'left': '←', 'right': '→', 'up': '↑'}
  var strMap = { 'left': 37, 'up': 38, 'right': 39, 'down': 40 }
  var directions = { 38:  ['down', 'left', 'right' ], 40: ['up', 'left', 'right'], 37: ['up', 'down', 'right'], 39: ['up', 'down', 'left'] }
  var target = 38;
  var temp
  var bestTimeValue = Infinity;

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

      direction.text = 'Press this key: \n ' + '  ' + temp + ' ' + frameMap[temp]

      // direction2.frame = frameMap.indexOf(direction.text)
      spinner.body.angularVelocity += 25;
    } else {
      // Wrong input, decrease speed
      spinner.body.angularVelocity -= 15;
    }

  }

  function create() {
    time = moment();
    spinning = false
    game.physics.startSystem(Phaser.Physics.ARCADE);

    spinner = game.add.sprite(250, 270, 'spinner');
    spinner.anchor.set(0.579952267, 0.5)
    game.physics.enable(spinner, Phaser.Physics.ARCADE);
    // slambar = game.add.sprite(180, 550, 'slambar')
    // direction2 = game.add.sprite(600, 550, 'directions')
    startButton = game.add.button(182, 201, 'startButton', toggleSpinner, this);
    speed = game.add.text(605, 163, 'Speed: 0', { font: '16px Press Start 2P', fill: 'white' });
    direction = game.add.text(605, 336, 'Click Play to start!', { font: '16px Press Start 2P', fill: 'white' });
    bestTime = game.add.text(605, 195, 'Fastest Time: \n  --:--:--', { font: '16px Press Start 2P', fill: 'white' })
    rules = game.add.text(605, 396, 'Rules:\nGet the spinner to max veloctiy (1000)\nUse arrow keys to increase speed', { font: '16px Press Start 2P', fill: 'white' })
    Timer = game.add.text(605, 256, '  Timer: \n 00:00:00', { font: '16px Press Start 2P', fill: 'white' });
    Timer.visible = false

    cursors = game.input.keyboard.createCursorKeys();
    tagButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    tagButton.onDown.add(() => {
      if(!spinning) {
        // spinner.body.angularVelocity = oldVelocity || 15
        // spinning = true
        // speed.text = 'Speed: ' + spinner.body.angularVelocity;
        spinning = true
        startButton.visible = false

        Timer.visible = true
        startTimer()
        direction.text = 'Press this key: \n ' + '  ' + (temp || 'up') + ' ' + (frameMap[temp] || '↑')
        spinner.body.angularVelocity = 12
      } else {
        oldVelocity = spinner.body.angularVelocity
        spinner.body.angularVelocity = 0
        spinning = false
        speed.text = 'Speed: ' + spinner.body.angularVelocity;
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
    startButton.visible = true

    console.log(timePassed, bestTimeValue, timePassed > bestTimeValue, timePassed > moment(bestTimeValue))
    if(timePassed < bestTimeValue) {
      direction.text = 'You win! New record!'
      bestTimeValue = timePassed
      bestTime.text = 'Fastest Time: \n  ' + moment(bestTimeValue).format('mm:ss:SS')
    } else {
      direction.text = 'You win!'
    }

    timePassed = 0
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
    speed.text = 'Speed: ' + spinner.body.angularVelocity;

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
    startButton.visible = false
    
    Timer.visible = true
    startTimer()
    direction.text = 'Press this key: \n ' + '  ' + (temp || 'up') + ' ' + (frameMap[temp] || '↑')
  }
}, 200)