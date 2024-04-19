var trex, trex_running, trex_collided, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var cloud_image, ground2;
var ground, invisibleGround, groundImage;
var score;
var group_obstacles, group_clouds;
var PLAY = 1;
var END = 0;
var game_state = PLAY;



function preload() {
trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
trex_collided = loadImage("trex_collided.png");
groundImage = loadImage("ground2.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
cloud_image = loadImage("cloud.png");
ground2 = loadImage("ground2.png");
gameover = loadImage("gameOver.png");
restart = loadImage("restart.png");
audio_jump = loadSound("jump.mp3");
audio_die = loadSound("die.mp3");
audio_checkpoint = loadSound("checkPoint.mp3");

}


function setup() {
createCanvas(600, 200);
//create a trex sprite
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.addAnimation("collided", trex_collided);
trex.scale = 0.5;

//create a ground sprite
ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;


invisible_ground = createSprite(200,190,400,10);
invisible_ground.visible = false;

group_obstacles = createGroup();
group_clouds = createGroup();

gameover_sprite = createSprite(300,100);
gameover_sprite.addImage(gameover);
gameover_sprite.scale = 0.5;

restart_sprite = createSprite(300,140);
restart_sprite.addImage(restart);
restart_sprite.scale = 0.5;

var run = Math.round(random(10,60));
console.log(run);


score = 0;

//trex.debug = true;
trex.setCollider("circle", 0, 0, 40);
}


function draw() {
    background("black");
    text("Score " + score , 70,50);

    
    //STATE PLAY
if(game_state == PLAY){
    ground.velocityX = -4;
    
    gameover_sprite.visible = false;
    restart_sprite.visible = false;

    score = score + Math.round(frameCount /60);
    if (ground.x < 0) {
        ground.x = ground.width / 2;
        }
    if (keyDown("space") && trex.y >= 100) {
    trex.velocityY = -10;
    audio_jump.play();

    }

    trex.velocityY = trex.velocityY + 0.8
    
    nubes();
    obstaculos();

    if(group_obstacles.isTouching(trex)){
    game_state = END;
    audio_die.play();
    }

    if(score > 0 && score % 300 == 0){

    audio_checkpoint.play();

} 

}
else if(game_state == END){
 gameover_sprite.visible = true;
 restart_sprite.visible = true;

 ground.velocityX = 0;
trex.velocityY = 0;

trex.changeAnimation("collided", trex_collided);
group_obstacles.setVelocityXEach(0);
group_clouds.setVelocityXEach(0);
group_obstacles.setLifetimeEach(-1);
group_clouds.setLifetimeEach(-1);

if(mousePressedOver(restart_sprite)){
    console.log("Reiniciar el juego");
    restart_over();

} 
}

trex.collide(invisible_ground);



drawSprites();
console.log(trex.y);
}


function nubes(){
    if(frameCount % 80 == 0){
        cloud = createSprite(600,30,70,30);
        cloud.addImage("cloud_image", cloud_image);
        cloud.velocityX = -3;
        cloud.scale = 0.3;
        cloud.y = Math.round(random(10,60));
        cloud.lifetime = 110;
        cloud.depth = trex.depth;
        trex.depth = trex.depth + 1;
        
        group_clouds.add(cloud); 
    }

}



function obstaculos(){
    if(frameCount % 60 == 0){
    var obstacle = createSprite(350,164,20,20);
    obstacle.velocityX = -(6+score/300);
    var range = Math.round(random(1,6));
    switch(range){
        case 1 : obstacle.addImage(obstacle1);
                 break;
        case 2 : obstacle.addImage(obstacle2);
                 break;
        case 3 : obstacle.addImage(obstacle3);
                 break;
        case 4 : obstacle.addImage(obstacle4);
                 break;
        case 5 : obstacle.addImage(obstacle5);
                 break;
        case 6 : obstacle.addImage(obstacle6);
                 break;
        default : break;
    }
    obstacle.scale = 0.05
    obstacle.lifetime = 200;
    group_obstacles.add(obstacle);
    }
}




function restart_over(){
    game_state = PLAY;
    group_obstacles.destroyEach();
    group_clouds.destroyEach();
    gameover_sprite.visible = false;
    restart_sprite.visible = false;
    trex.changeAnimation("running", trex_running);
    score = 0;

}



