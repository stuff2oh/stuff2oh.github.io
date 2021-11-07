// Lesson 05_01 ohmmeter

// ***********
// Variables
// ***********

var five = require("johnny-five");
var board = new five.Board();

var voltage;

var VS = 5; // 5 Supply voltage
  	
// ************
// Functions
// ************

// Can we write any code into functions to reduce code redundancy
// And improve program maintainability?

// *************
// Main Code
// *************

board.on('exit', function() {
    console.log("Handling CTRL-C");

	// Any cleanup to do?

});

board.on("ready", function(){  

	voltage = new five.Sensor({pin:'A0',freq:1000});
  
	voltage.on("change", function() {

	// Calculate voltage from scaled value of 0-1023
   var value = this.value;
   var V2 = 5 * (value / 1023);
   console.log("V2 - "+V2);

   // Must be in regular ohms, not 1000's ('k') of ohms.  The formula expects this.
   // Our known resistor is 100k, so that is why we have 100000 (three extra zeros)
   // This math below will result in 100000.
   var r_known  = 100 * 1000; 

   // Given a known value for the resistor in our voltage divider
   // Figure out the resistor under test value
   var r_unknown = r_known * (VS / V2 - 1);
   
   console.log("Resistor is ~ "+Math.round(r_unknown));
   
  });

});
