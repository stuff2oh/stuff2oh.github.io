// Lesson 09 Servo

// ***********
// Variables
// ***********

var five = require("johnny-five");
var board = new five.Board();

var ANGLE_PARK = 90;

// Factor to convert 0-1023 to angles 0-180'ish
// BTW, 1023 / 6 = 170.5 which would be our max value
var FLAP_VALUE_TO_ANGLE_FACTOR = 6;

var angle      = 90;
var increment  = 10;
var servo, flap, servo_fuel;
var btnRight, btnLeft;
var potStick;
var s3,s4,s5;  // fuel sensors

var v3, v4, v5 = 10;  // initial values for fuel sensors

var PIN_A0  = "A0";
var PIN_A1  = "A1";
var PIN_A2  = "A2";
var PIN_A3  = "A3";
var PIN_A4  = "A4";
var PIN_A5  = "A5";

var PIN_3   = 3;  // a PWM pin
var PIN_5   = 5;  // a PWM pin
var PIN_6   = 6;  // a PWM pin
  	
var servo_ss, servo_mi, servo;

var timer = 0;  	
  	
// ************
// Functions
// ************

// Can we write any code into functions to reduce code redundancy
// And improve program maintainability?

function leftRightButton(){

	btnRight.on("press",function(){
		angle = angle + increment;
		servo.to(angle);
		console.log("R - Going to angle - "+angle);
	});
	
	btnLeft.on("press",function(){
		angle = angle - increment;
		servo.to(angle);
		console.log("L - Going to angle - "+angle);
	});
}

function leftRightButtonSafety(){

	btnRight.on("press",function(){
		if(angle < 180) {
			angle = angle + increment;
			servo.to(angle);
			console.log("R - Going to angle - "+angle);
	} else {
			console.log("R - Max angle limit reached !! - None shall pass !!");
	}
	
	});
	
	btnLeft.on("press",function(){
		if(angle > 0){
			angle = angle - increment;
			servo.to(angle);
			console.log("L - Going to angle - "+angle);
		} else {
			console.log("L - Min angle limit reached !! - None shall pass !!");
		}
	});
}

function potSticker(){
	potStick.on("change",function(){
		var flap_angle = this.value/FLAP_VALUE_TO_ANGLE_FACTOR;
		flap.to(flap_angle);
		console.log("Flap angle - "+flap_angle);
	})
}

function airplaneProject(){

	servo_ss   = new five.Servo(PIN_3);
	servo_mi   = new five.Servo(PIN_5);
	servo_hh   = new five.Servo(PIN_6);
  	//servo_fuel = new five.Servo({pin:PIN_3,invert:false}); // only 3 servos in kit
  
	s3 = new five.Sensor({pin:PIN_A3,freq:500});
	s4 = new five.Sensor({pin:PIN_A4,freq:500});
	s5 = new five.Sensor({pin:PIN_A5,freq:500});
  
  	// Event handlers for fuel tank sensors
  	s3.on("data", function() {
   	if ( this.value < 100 ) v3 = 45; else v3 = 5;
  });
  s4.on("data", function() {
    if ( this.value < 100 ) v4 = 55; else v4 = 5;
  });
  s5.on("data", function() {
    if ( this.value < 100 ) v5 = 65; else v5 = 5;
  });
  
	timer = setInterval(function() {
		console.log('get time');
		var date = new Date();
		var hh = date.getHours();    // returns 0 - 23
		var mi = date.getMinutes();
		var ss = date.getSeconds();
		
		// Dashboard assumes 12 hour clock
		if(hh > 12)
			hh = hh - 11; // Use 11 because hour is 0 based
		
		var hh_convert = 180 / 12; // = 15
		var mi_convert = 180 / 60; // = 3
		var ss_convert = 180 / 60; // = 3
		
		var hh_angle = hh * hh_convert;
		var mi_angle = mi * mi_convert;
		var ss_angle = ss * ss_convert;
		
		servo_hh.to(hh_angle,990);
		servo_mi.to(mi_angle,990);
		servo_ss.to(ss_angle,990);
		
		console.log("Time - "+hh+":"+mi+":"+ss);
		
		// Update fuel Gauge
		var total = v3 + v4 + v5;
    	console.log("Fuel - " + total );
    	//servo_fuel.to(total,800);
	},1000);

}

// *************
// Main Code
// *************

board.on('exit', function() {
    console.log("Handling CTRL-C");

	// Any cleanup to do?
	
	if(timer)
		clearInterval(timer);
	
	// In case it has exceeded limits, set it to something reasonable
	servo.to(ANGLE_PARK); 
});

board.on("ready", function(){  

	// Items for exercises
	servo    = new five.Servo(PIN_3);
	flap     = new five.Servo(PIN_5);
	btnRight = new five.Button(PIN_A0);
	btnLeft  = new five.Button(PIN_A2); 
	potStick = new five.Sensor(PIN_A1); 

	// Each exercise is coded as a function
	//leftRightButton();
	//leftRightButtonSafety();
	//potSticker(); // har har
	 airplaneProject();
	
});

// ***********
// NOTES
// ***********

/*

Setup servo to have a more limited angle range, default is 0-180
use the servo.min(); and servo.max(); commands to travel to these new limits.  Here
we set the range to be fro 45 to 135 degrees.  This limits range of motion to 90 degrees.
	 
	servo = new five.Servo({pin:PIN_3,range:[45,135]);
	servo.min();
	servo.max();

Define a 'home' position for the servo.  This is an additional argument that, for example
could be defined along with the range, as shown above.  Here we set 'home' to 45 degrees.

	servo = new five.Servo({pin:PIN_3,StartAt: 45);
	servo.home();

The servo.to(...) function can do more than just go to a specific angle. Where..
 angle = what angle to move the servo to
 time  = duration in milliseconds action should take
 steps = how many steps to take performing the action

	servo.to(angle, time, steps);
	
You can have the servo move back and forth, or sweep, between two angles within a given time.
You might also call this 'scanning', 'panning'
 range    = between what two angles
 interval = time in milliseconds in which to perform action
 step     = how many steps to take while performing sweep

	servo.sweep(range:[45,135],interval:2000,step:5)

*/	

