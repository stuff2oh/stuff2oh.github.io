var x_width  = 400;
var y_height = 400;

var color_background = [128,128,128,255];
var color_draw       = [200,200,200,255];

var currentSize  = 10;
var currentColor = color_draw;
var currentBrush = "square";

var shouldDraw = false;


function setup() {
  createCanvas(x_width, y_height);
  noStroke();
  background(color_background);

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
