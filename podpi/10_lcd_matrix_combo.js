// Lesson 10 LCD

// ***********
// Variables
// ***********

var five = require("johnny-five");
var board = new five.Board();

var lcd;
  	
var idxCarousel = 0;
var idxFrame = 0
var timer = 0;

// Along with characters the LCD can display a set of special characters.
var symbols = [
		"circle","cdot","donut","ball",
		"square","fbox","dice1","dice2","dice3","dice4","dice5","dice6","sdot",
		"arrownw","arrowsw","arrowne","arrowse",
		"duck","runninga","runningb","smile",
		"target","heart","check","x",
		"bell","note","sound","speaker","clock"
		];

	var bell = [
		0b00000000,
		0b00010000,
		0b00111000,
		0b00111000,
		0b00111000,
		0b01111100,
		0b00010000,
		0b00000000
	];		
	
	var ball = [
		0b00000000,
		0b00111100,
		0b01111110,
		0b01111110,
		0b01111110,
		0b01111110,
		0b00111100,
		0b00000000
	];		
	
	var heart = [
		0b01100110,
		0b10011001,
		0b10000001,
		0b10000001,
		0b01000010,
		0b01000010,
		0b00100100,
		0b00011000
	];
	
	var matrix_symbols = {"heart":heart,"bell":bell,"ball":ball};

// ************
// Functions
// ************

// Can we write any code into functions to reduce code redundancy
// And improve program maintainability?

function helloWorld(theBoard){
	lcd.clear();
	lcd.cursor(0,2);
	lcd.print("Hello World");
	
	theBoard.wait(3000,function(){
		lcd.clear().cursor(1,1).print("Are You Ready?");
	})
	
	// Make 'lcd' available on the Node command line !!
	theBoard.repl.inject({lcd:lcd});
}

function symbolCarousel(){

	// Update LCD
	var symbol = symbols[idxCarousel];
	lcd.useChar(symbol);
	lcd.clear();
	lcd.print(symbol);
	lcd.cursor(1,0);
	lcd.print(' :'+symbol+':');

	if(idxCarousel < symbols.length-1)
		idxCarousel ++;
	else
		idxCarousel = 0;

	// Update Matrix if there is a matching symbol defined
	if(symbol in matrix_symbols)
		drawPixels(matrix_symbols[symbol]);
	else
		matrix.clear();		
}

function drawPixels(array){
	matrix.clear();
	
	// Process all rows in order
	for(var row = 0; row <= 7;row++){
		// Reverse to read bits left to right
		for(var col = 7;col >= 0;col--){
			var value = array[row];
			// Bitwise 'and' to isolate bit to consider
			var bit = value & (1 << col); 
			if(bit)
				matrix.led(0,row,col,1);
		}
	}
}

// *************
// Main Code
// *************

board.on('exit', function() {
    console.log("Handling CTRL-C");

	// Any cleanup to do?
	lcd.off();
	matrix.off();
		
	if(timer)
		clearInterval(timer);
});

board.on("ready", function(){  
	lcd = new five.LCD({controller: "PCF8574",Rows:2, Cols:16});
	
	matrix = new five.Led.Matrix({
		addressees: [0x70],
		controller: "HT16K33",
		rotation: 3
	
	});
	//helloWorld(this);	
	timer = setInterval(symbolCarousel,1000);
	
});

// ***********
// NOTES
// ***********

/*

  What were your observations in this episode?

  1) Brand new LCD boards (with fresh IC2 adaptors) might need contrast adjusted on first
     use as it appears there is no text at first.

LCD Reference - see http://johnny-five.io/api/lcd ...
  
  var lcd = new five.LCD({controller: "PCF8574", Rows:2, Cols:16});

  lcd.print(message);
  
  lcd.useChar(charcode);
  lcd.useChar("heart");
  lcd.print('Hello:heart:');  // NOTE special ' (single quote) usage for quoting here

Other Commands

	lcd.home();				// Returns cursor to upper left hand corner (0,0) by default
	lcd.on();            // Turn on display
	lcd.off();           // Turn off display
	lcd.autoscroll();    // Text will scroll when screen is full
	lcd.noAutoscroll();  // Text will NOT scroll when screen becomes full   
	  

*/	

