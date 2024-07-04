let housekey

let housekeyBrushBool = false
let ellipseBrushBool = false

function preload (){
     housekey = loadImage('housekey.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {

  imageMode (CENTER)
  background(111, 183, 209);

 
  if(mouseX > 750 && mouseY > 30){
    background (24, 29, 74)
  }else{
  background (111, 183, 209)
  }


    
  fill (26, 64, 10)
  rect(0,375,3050,650)
  fill (230, 225, 209)
  rect (70,195,200,180)
  fill (82, 2, 22)
  triangle (170,80,50,215,300,215)
  fill (82, 2, 22)
  rect (145,300,50,75)
  fill (237, 191, 5)
  rect (400,298,28,28,28,)
  fill (255, 255, 255)
  rect (404,325,20,28)
  fill (255, 255, 255)
  rect (404,352,10,22)
  fill (255, 255, 255)
  rect (414,352,10,22)
  fill (255, 255, 255)
  rect (394,326,10,22)
  fill (255, 255, 255)
  rect (424,326,10,22)
  fill (0, 5, 0)
  rect (405,307,5,5,5)
  fill (0,5,0)
  rect (417,307,5,5,5)
  fill (255, 255, 0)
  rect (600,30,80,80,80)

  
  fill (69, 36, 7)
line (410,320,418,320)
  
  line (560,70,480,70)
  line(580,130,530,170)
  line (640,130,640,200)
  
  fill (255,255,255)
 rect (402,292,25,6)
  
  fill (255,255,255)
  rect (405,280,18,13)

}

function housekeyBrush (){
  image(housekey, mouseX,mouseY,50,50)

}


function ellipseBrush (){
     fill (random(255), random (255), random (255))
     ellipse(mouseX, mouseY,50,50)
}


function keyPressed (){
       if (key === 'q'){
            housekeyBrushBool = true
            ellipseBrushBool = false
       }
       
       if (key === 'w'){
            housekeyBrushBool = false
            ellipseBrushBool = true
       }
}
function windowResized (){
    resizeCanvas(windowWidth,windowHeight)
}
