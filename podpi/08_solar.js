// Lesson 08_01 Solar

// ***********
// Variables
// ***********

var five = require("johnny-five");
var barcli = require("barcli");
var board = new five.Board();

var solar_panel,photo_diode;

var PIN_A0  = "A0";
var PIN_A1  = "A1";

var PIN_9  = 9;
var PIN_10 = 10;
var PIN_11 = 11;

// AD conversion 10 bit value from 0 - 1023. .22 is 1/5 from voltage divider
var VOLTS_PER_VALUE_UNIT = .0047 * 1.22;
  	
var solar_value,photo_value;
var solar_voltage,photo_voltage;  	

var timer;
  
var solar_graph, photo_graph; 
  	
var red, green,blue;
  	
// ************
// Functions
// ************

// Can we write any code into functions to reduce code redundancy
// And improve program maintainability?

function showPanelVoltage(){
	console.log("Analog value - "+this.value);
}

function showVoltages(){
	console.log("Solar/Photo value - "+solar_value+"/"+photo_value);
	console.log("Solar/Photo Voltage - "+solar_voltage+"/"+photo_voltage);
}

function solarOutputRGB(value){
	colsole.log("solar value - "+value);
	
	if(value > 600){
		console.log("green");
		green.on();red.off();blue.off();
	} else if(value > 300){
		console.log("blue");
		green.off();red.on();blue.on();
	} else {
		console.log("red");
		green.off();red.on();blue.off();
	}
}

function updateGraphs(){
	photo_graph.update(photo_voltage);
	solar_graph.update(solar_voltage);
}

// *************
// Main Code
// *************

board.on('exit', function() {
    console.log("Handling CTRL-C");

	// Any cleanup to do?
	clearInterval(timer);
});

board.on("ready", function(){  

	photo_diode = new five.Sensor({pin:PIN_A0, freq:1000});
	solar_panel = new five.Sensor({pin:PIN_A1, freq:1000});

	// RBG LED mappings
	red   = new five.Led(PIN_9);
	green = new five.Led(PIN_10);
	blue  = new five.Led(PIN_11);

	// Sensor change event handling
	solar_panel.on('data',function() {
		solar_value = this.value;
		solar_voltage = Math.round(solar_value * VOLTS_PER_VALUE_UNIT);
		
		// Show values using RBG LED
		// solarOutputRGB(solar_value);
	});
	photo_diode.on('data',function() {
		photo_value = this.value;
		photo_voltage = Math.round(photo_value * VOLTS_PER_VALUE_UNIT);
	});

	// Show values with command line, kinda hard to read
	//timer = setInterval(showVoltages,1000);

	// Show values with fancy bar graphs
	photo_graph = new barcli({label:"Photo V @ A0"});
	solar_graph = new barcli({label:"Solar V @ A1"});
	timer = setInterval(updateGraphs,1000);

});



