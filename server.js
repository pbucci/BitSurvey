//------------------------------------------------------------------------------
// Requires
//------------------------------------------------------------------------------
var express = require('express'); // server package -- runs the server
var app = express();              //
var five = require("johnny-five");// the thing that moves the arduino
var fs = require('fs');           // communicates with the file system
var path = require('path');       // as communicates with the file system

//------------------------------------------------------------------------------
// Globals
//------------------------------------------------------------------------------
var board, myServo;             // board is arduino, servo is client side servo object
var rendered_path = [];         // setpoints, each s_i 0:180 degrees

//------------------------------------------------------------------------------
// Server setup
//------------------------------------------------------------------------------


app.use("/css", express.static(__dirname + '/css'));    // serve the folder called 'css'
app.use("/thirdparty", express.static(__dirname + '/thirdparty'));//etc
app.get('/', function (req, res) {                  // when someone tries to access root, send index
  res.sendfile(__dirname + '/index.html');
});
var server = app.listen(8080, function () { // run server at 8080
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

//------------------------------------------------------------------------------
// Socket setup
//------------------------------------------------------------------------------
var io = require('socket.io')(server); // the websocket hook

//------------------------------------------------------------------------------
// Socket functions (connect to index.html)
//------------------------------------------------------------------------------
io.on('connection', function(socket){
	console.log('User connected.');

	//User disconnects
	socket.on('disconnect', function(){
		console.log('User disconnected.');
	});

	// Test servo motion
	socket.on('test', function(){
        	io.emit('server_message', 'Started arduino sweep.');
        	myServo.to(0); // sends servo to zero degrees
		console.log('Arduino test.');
	});

    // Move to degree
    socket.on('degree', function(degree){
            var d = parseInt(degree);
        	io.emit('server_message', 'Moving to degree ' + degree + ".");
        	myServo.to(d);
		console.log('Moving to degree ' + degree + ".");
    });

    socket.on('stop_render', function() { // stops motion from rendering, no return
        stop_render();
    });


/// var obj = {key:value,key2:value2}

    socket.on('path', function(msg){ //
        var path = msg['path'];
        var range = msg['range'];
        console.log("Path received.");
        makepath(range,path);
    });

	socket.on('render', function(){ // 'play' function
        console.log('Rendering...');
        render(); // can take array ???
	});
});

board = new five.Board();
var myServo;
board.on("ready", function() {
	myServo = new five.Servo({
		pin:9,
		center:true,
		range: [0,180]
	});
	board.repl.inject({
		servo: myServo
	});
	io.emit('server_message','Ready to start board.');
    	console.log('Sweep away, my captain.');
});

// maps the server message to 0-180 degrees
function makepath(range,path) {
    var unscaled_points = [];
    var scaled_points = [];
    var values = path.split(',');

    for (var i=10; i<values.length; i++) {
        var value = parseFloat(values[i].split('L')[0]);
        unscaled_points.push(value);
    }
    for (var i=0; i < unscaled_points.length; i++) {
        var p = (unscaled_points[i] / range) * 180;
        scaled_points.push(p);
    }
    rendered_path = scaled_points;
}


var timeouts = [];
function render() {
    stop_render();
    if (rendered_path.length==0) {
        console.log('No path to render yet...');
    }
    else {
        for(var i=0;i<rendered_path.length;i++) {
            timeouts.push(doSetTimeout(i));
        }
    }
}

function stop_render() {
    // console.log("Stopping render...");
    for (var i=0; i<timeouts.length; i++) {
        clearTimeout(timeouts[i]);
    }
    console.log("Stopped render.");
}
function doSetTimeout(i) {
    var t = setTimeout(function(){
        myServo.to(rendered_path[i]);
        console.log('Moving servo to ' + rendered_path[i]);
    },5 * i);
    return t;
}

// setTimeout(function(){},millisends_to_start); (like a wait)
