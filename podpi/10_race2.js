// This game relates to PodPi Volume 10, page 11
// The goal of the game is to push your opponent off 
// the LCD screen.

// ************
// Variables
// ************

var five  = require("johnny-five");
var board = new five.Board();

var left, right;

// define some local variables
var row  = 1;
var col  = 8;
var play = true;

var lcd;

// ***********
// Functions
// ***********

function resetGame(){
	col = 8;
	
	// get ready to play
	lcd.clear();
	lcd.cursor(0, 0).print("Ready to play ?");
	board.wait(3000, function() {
		lcd.clear().cursor(0, 6).print("GO!!!");
		play = true;
	});
}

function isWinner(player){
	var win = false;
	
	if(player === "A" && col < 0){
      	lcd.clear().cursor(0,1).print("Player A wins!");
      	win = true;
   }

	if(player === "B" && col > 16){
      	lcd.clear().cursor(0,1).print("Player B wins!");
      	win = true;
   }
   
   // Play is on if there is not a winner
   play = ! win;
   
	return win;
}

function playGame(player){

	// reject input if game play is off
	if( ! play ){
		resetGame();
		return;
	}

	if(player === "A"){
		col--;
		if(! isWinner(player))
      	lcd.clear().cursor(row,col).print(":runninga:");
	}
	
	if(player === "B"){
		col++;
		if(! isWinner(player))
			lcd.clear().cursor(row,col).print(":runningb:");
	}
}

board.on("ready", function() {

  // define the input controllers
  left  = new five.Button("A0");
  right = new five.Button("A1");
  
  // setup the LCD display (using I2C)
  lcd = new five.LCD({controller: "PCF8574"});

  // define the special characters
  lcd.useChar("runninga");
  lcd.useChar("runningb");
  
  resetGame();
  
  // left button pressed - pin has pull down resistor
  left.on("press", function(){ playGame("A"); });

  // right button pressed - pin has pull down resistor
  right.on("press", function() { playGame("B"); });

});
