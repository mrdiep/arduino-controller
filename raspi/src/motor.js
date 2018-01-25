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

  forward(105);

  //forward(199);

  var socket = require('socket.io-client')('http://localhost:3003', {
    reconnect: true
  });

  socket.on('connect', function () {
    console.log('connected');
    socket.emit('car-connect', {
      message: 'Hello server. I am a raspbian car'
    });
  });

  socket.on('move', function (data) {
    console.log(data);
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
        break;
      case 'right':
        motor1Move(-data.speed);
        motor2Move(data.speed);
        break;
      default:
        motor1Move(data.left);
        motor2Move(data.right);
      break;
    }
  });

  socket.on('disconnect', function () {
    console.log('disconnect');
  });

});