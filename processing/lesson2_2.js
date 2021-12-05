// Declare a number
var x_width = 400;

// Declare a number
var y_height = 400;

// Declare a ‘Boolean’
var makeCircle = true;

var currentBrush = "square";

function setup() {
   // Declare a ‘String’
   var message = "Hello Variables !!";

   createCanvas(x_width, y_height);
   noLoop();
   console.log(message);
}

function draw() {
   background(0,0,255);
   fill(255,0,0);
   
if( makeCircle === true){
   circle(100,100,100);
} else {
   console.log("No Circle Requested");
}

fill(128,128,128);
switch(currentBrush){
   case "square" :
      rect(100,100, 50);
      break;
   case "line" :
      line(50,50,100,100);
      break;
   default :
      console.log("Draw What? " + shapeToDraw);
      break;
}


}
