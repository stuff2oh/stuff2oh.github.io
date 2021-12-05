// Declare a number
var x_width = 400;

// Declare a number
var y_height = 400;

// Declare a ‘Boolean’
var makeCircle = true;

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
   
   // ?? What is the difference
   // ?? between ‘==‘ and ‘===‘
   if( makeCircle = true){
      circle(100,100,100);
   }
}

