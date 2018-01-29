var five = require("johnny-five"),
  board = new five.Board();

var FORWARD = 'forward';
var REVERSE = 'reverse';

board.on("ready", function () {

  var motors = new five.Motors([{
      pins: {
        dir: 10,
        pwm: 9
      },
      invertPWM: true
    },
    {
      pins: {
        dir: 5,
        pwm: 6
      },
      invertPWM: true
    }
  ]);

  function limitSpeed(speed) {
    speed = Math.abs(speed);
    if (speed < 50) speed = 0;
    if (speed > 250) speed = 250;
    return speed;
  }

  function motor1Move(speed) {
    var isMoveForward = speed > 0;
    speed = limitSpeed(speed);

    if (isMoveForward)
      motors[0].forward(speed);
    else
      motors[0].reverse(speed);
  }

  function motor2Move(speed) {
    var isMoveForward = speed > 0;
    speed = limitSpeed(speed);
    if (isMoveForward)
      motors[1].forward(speed);
    else
      motors[1].reverse(speed);
  }

  function forward(speed) {
    motor1Move(speed);
    motor2Move(speed);
  }

  function reverse(speed) {
    motor1Move(-speed);
    motor2Move(-speed);
  }

  function left(speed) {
    motor1Move(-speed);
    motor2Move(speed);
  }

  function right(speed) {
    motor1Move(speed);
    motor2Move(-speed);
  }

  function moveNow(data) {
    switch (data.type) {
      case 'forward':
        motor1Move(data.speed);
        motor2Move(data.speed);
        break;
      case 'reverse':
        motor1Move(-data.speed);
        motor2Move(-data.speed);
        break;
      case 'left':
        motor1Move(data.speed);
        motor2Move(-data.speed);
        var lastMoveData = {
          speed: lastMove.speed,
          type: lastMove.type,
        }
        setTimeout(() => {
          moveNow(lastMoveData);
        }, 1500);

        break;
      case 'right':
        motor1Move(-data.speed);
        motor2Move(data.speed);

        var lastMoveData = {
          speed: lastMove.speed,
          type: lastMove.type,
        }

        setTimeout(() => {
          moveNow(lastMoveData);
        }, 1500);
        

        break;
      default:
        motor1Move(data.left);
        motor2Move(data.right);
      break;
    }

    lastMove = data;
  }
  //forward(105);

  //forward(199);

  var socket = require('socket.io-client')('https://whispering-fjord-88916.herokuapp.com/', {
    reconnect: true
  });

  socket.on('connect', function () {
    console.log('connected');
    socket.emit('car-connect', {
      message: 'Hello server. I am a raspbian car'
    });
  });

  var lastMove = '';

  socket.on('move', function (data) {
    console.log(data);
    moveNow(data);
  });


  socket.on('disconnect', function () {
    console.log('disconnect');
  });

});