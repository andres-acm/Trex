var box;


function setup() {
  createCanvas(1700,800);
  box = createSprite(100,100,400,400);

}

function draw() 
{
  background(30);

if(keyIsDown(RIGHT_ARROW)){
  box.position.x = box.position.x + 2;
}
if(keyIsDown(LEFT_ARROW)){
  box.position.x = box.position.x - 2;
}
if(keyIsDown(UP_ARROW)){
  box.position.y = box.position.y - 2;
}
if(keyIsDown(DOWN_ARROW)){
  box.position.y = box.position.y + 2;
}

  drawSprites();
}



