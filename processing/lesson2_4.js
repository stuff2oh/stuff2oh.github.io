var x_width  = 400;
var y_height = 400;

var color_background = [128,128,128,255];
var color_draw       = [200,200,200,255];

var currentSize  = 10;
var currentColor = color_draw;
var currentBrush = "square";

var shouldDraw = false;

var menuLocation = 350;

function setup() {
  createCanvas(x_width, y_height);
  noStroke();
  background(color_background);

  rectMode(CENTER);
  setupMenu();
}

function draw() {
if (mouseIsPressed === true) {
      shouldDraw = true;
   } else {
      shouldDraw = false;
   }

   if( shouldDraw != true)
      return;

   fill(currentColor);

   switch(currentBrush){
      case "circle" :
         ellipse(mouseX,mouseY,currentSize,currentSize);
         break;
      case "square" :
         rect(mouseX,mouseY,currentSize,currentSize);
         break;
      default :
         console.log("Draw What? " + currentBrush);
   }  



}

function setupMenu(){
   stroke(0);

   // Color Menu
   line(0,menuLocation,x_width,menuLocation)
   fill(255,0,0)
   rect(25,menuLocation+20, 25, 25);  
   fill(0,255,0);
   rect(50,menuLocation+20, 25, 25);  
   fill(0,0,255);
   rect(75,menuLocation+20, 25, 25);  
   noFill();
   rect(100,menuLocation+20, 25, 25);  
   
   // Brush Menu
   rect(150,menuLocation+20, 25, 25);  
   ellipse(150,menuLocation+20,10,10);
   rect(175,menuLocation+20, 25, 25);  
   rect(175,menuLocation+20, 10, 10);  

   noStroke();
}
