var man, man_running;
var ghost, ghostImg;
var ground,ground2, groundImg, groundImg2, invisibleGround, invisibleEdgeMan,invisibleEdgeGhost;
var moon, moonImg;
var stone, stoneImg, hand, handImg, RIP, RIPimg, obstaclesGroup;
var obstacle;

var score, restart, restartImg; 

var gameState = PLAY;
var PLAY = 1;
var END = 0;

function preload(){
man_running = loadAnimation("manRunning1.png", "manRunning2.png");
man_jumping = loadAnimation("manRunning1.png");
ghostImg = loadImage("ghostImg.png");
moonImg = loadImage("Moon.png");
groundImg = loadImage("ground2.png");
groundImg2 = loadImage("groundImg.png");
stoneImg = loadImage("rock.png");
handImg = loadImage("hand.png");
restartImg = loadImage("reset.jpg");
RIPimg = loadImage("RIP-IMG.png");
spookySound = loadSound("spooky.wav");
checkPointSound = loadSound("checkpoint.mp3");
jumpSound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");

}

function setup() {
 createCanvas (windowWidth,windowHeight);

man = createSprite(width/1.8, height/1.18, 20, 50);
man.addAnimation("running", man_running);
man.scale = 0.35;
man.setCollider("circle", 0,0,220);


ghost = createSprite(width/6, height/1.22, 20, 50);
ghost.addAnimation("ghost", ghostImg);
ghost.scale = 0.075;
ghost.setCollider("circle", -5,-10,1300);

 ground = createSprite(width/10,height/1.1,40,20);
 ground.addAnimation("ground",groundImg);
 ground.x = ground.width/10;
 ground.scale = 0.2
 


 moon = createSprite(width/4.5,height/7.5,10,10);
 moon.addAnimation("moon", moonImg);
 moon.scale = 0.1

  invisibleGround = createSprite(width/1.5,height/1.04,100000,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  
  score = 0;

  spookySound.loop ()

}

function draw() {
 background("darkBlue");
 text("Distance Covered (in m): "+ score, width/1.5,height/8);


 if(gameState = PLAY){

  ground.velocityX = -7;

ground.depth = man.depth, ghost.depth;
man.depth = man.depth + 3;
ghost.depth = ghost.depth + 2

  if (ground.x < width/2.1){
    ground.x = ground.width/10;
  }

  man.collide(invisibleGround);
  ghost.collide(invisibleGround);

  ground.velocityX = -(4 + 3* score/100)
  obstaclesGroup.velocityX = -(4 + 3* score/100)
  
  score = score + Math.round(getFrameRate()/50);

 if(score>0 && score%150 === 0) {
   checkPointSound.play()
 }

  if(keyDown("SPACE")&& man.y >= height/1.25) {
      man.velocityY = -19;
      jumpSound.play();
  }
  man.velocityY = man.velocityY + 0.7
  ghost.velocityY = ghost.velocityY + 0.7

  spawnObstacles ();
  
  if(obstaclesGroup.isTouching(man)){
  gameState = END;
  dieSound.play();
  }
  if(obstaclesGroup.isTouching(ghost)){
    ghost.velocityY = -19;
    }
}

if (gameState === END) {
  background("white");
    stroke("darkBlue");
    fill("darkBlue");
    textSize(50);
    text("Game Over", windowWidth/2.45, windowHeight/2.3);

    stroke("green");
    fill("green");
    textSize(30);
    text("Press Ctrl+R to Restart the Game", windowWidth/2.9, windowHeight/2);

  ground.velocityX = 0;
  man.destroy ()
  ghost.destroy ()
  moon.visible = false;
  score.visible = false;
 obstacle.destroy();
 ground.destroy();

}

drawSprites ()   
}
function spawnObstacles () {
  if (frameCount % 95 === 0){
    var obstacle = createSprite(width/1,height/1.15,10,40);
   obstacle.velocityX = -7;
    
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: obstacle.addImage(stoneImg);
               break;
       case 2: obstacle.addImage(handImg);
               break;
       case 3: obstacle.addImage(RIPimg);
               break;
       default: break;
     }
              
     obstacle.scale = 0.2;
     obstacle.lifetime = 450;
    
     obstaclesGroup.add(obstacle);
  }
}