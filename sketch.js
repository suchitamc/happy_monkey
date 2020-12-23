
var monkey , monkey_running, monkey_stop;
var ground,ground1,invisibleG;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY =1;
var END = 0;
var gameState= PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  monkey_stop = loadAnimation("monkey_0.png");
  ground1 = loadImage("ground.PNG");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 400);
  


  var survivalTime=0;
  
  ground = createSprite(400,350,900,10);
  ground.addImage(ground1);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  invisibleG = createSprite(300,360,600,10);
  invisibleG.visible = false;
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.addAnimation("stopped",monkey_stop);
   monkey.scale=0.1
  
  
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  monkey.collide(invisibleG);   
  if(gameState === PLAY){
   
    if(keyDown("space") && monkey.y>250 ) {
      monkey.velocityY = -14;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    survivalTime=Math.ceil(frameCount/frameRate());
    spawnFood();
    spawnObstacles();
 
    if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+1;
    }
  
    if(obstaclesGroup.isTouching(monkey)){
    gameState = END;
    }
  }else if(gameState === END){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        monkey.changeAnimation("stopped",monkey_stop);
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.destroyEach();
      }
  drawSprites();
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time: "+ survivalTime, 70,50);
  text("Score: "+score,300,50);
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 120 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
