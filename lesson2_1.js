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
   
var x_pos = 50;

   while(x_pos <= 150) { 

      circle(x_pos,100,50);
      x_pos = x_pos + 50;

   }

   fill(128);
   for(var y_pos = 0;y_pos <= 150;y_pos = y_pos + 50){
      rect(100,y_pos,50,60);
   }

}
