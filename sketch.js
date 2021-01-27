var tower, towerImg, ghost,ghostImg, door, doorImg, climber,climberImg,block;
var doorGroup, climberGroup,blockGroup;
var sound;
var gameState="PLAY";

function preload(){
  towerImg=loadImage("bg.jpg");
  ghostImg=loadImage("JC.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  sound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=1;
  tower.scale=1.5;
     
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImg);  
  ghost.scale=0.3;
  
  doorGroup=createGroup();
  climberGroup=createGroup();
  blockGroup=createGroup();
  
  //sound.loop();
  
}

function draw(){
  background("black");
  if(gameState==="PLAY"){
    
  
  if(tower.y>400){
    tower.y=tower.width/2;
  }
  if(keyDown("space")){
    ghost.velocityY=-10;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  if(keyDown("left")){
    ghost.x=ghost.x-5;
  }
  if(keyDown("right")){
    ghost.x=ghost.x+5;
  }
  spawnDoors();
  if(blockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="END";
  }
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
  drawSprites();
  }
  if (gameState==="END"){
    fill("yellow");
    textSize(30);
    text("Game Over",150,250);
  }
}

function spawnDoors(){
if(World.frameCount%200===0){
  door=createSprite(300,-50);
  door.addImage(doorImg);
  door.velocityY=1;
  door.x=Math.round(random(120,450));
  doorGroup.add(door);
  
  climber=createSprite(300,10);
  climber.addImage(climberImg);
  climber.velocityY=1;
  climber.x=door.x;
  climberGroup.add(climber);
    
  block=createSprite(300,15);
  block.velocityY=1;
  block.x=door.x;
  blockGroup.add(block);
  block.shapeColor="green";
  block.width=climber.width;
  block.height=2;
  
  ghost.depth=door.depth;
  ghost.depth+=1;
  
 }
 function moveCamera(){
   camera.position.x=ghost;
   camera.position.y=ghost;
 }
}