var bananaImg, obstacleImg, backgroundImg, backg, player_running, player, invisibleGround;

var score = 1;

var obstaclesGroup;

var foodsGroup; 

function preload() {
backgroundImg = loadImage("jungle.png");
player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
 
bananaImg = loadImage("banana.png");
obstacleImg = loadImage("stone.png");  
}

function setup() {
  createCanvas(285,285);
  backg = createSprite(130,155,700, 700);
  backg.addImage("background", backgroundImg);
  backg.velocityX = -5;
  if (backg.x < 45) {
    backg.x = backg.width/2;
  }
  invisibleGround = createSprite(142.5, 240, 570, 10);
  invisibleGround.visible = false; 
  
  player = createSprite(30, 233, 20);
  player.addAnimation("running", player_running);
  player.scale = 0.065;
  
  obstaclesGroup = new Group();
  foodsGroup = new Group();
}

function draw() {
  background(220);
   if (backg.x < 45) {
    backg.x = backg.width/2 - 90;
  }
  
  if(keyDown("space")) {
      player.velocityY = -12;
  }
  food();
  obstacle();
  
  if (foodsGroup.isTouching(player)) {
    score = score + 2; 
    foodsGroup.destroyEach();
    switch(score) {
      case 10: player.scale = 0.12;
               break;
      case 20: player.scale = 0.14;
                break;
     case 20: player.scale = 0.16;
                break;   
     case 20: player.scale = 0.18;
                break;           
    
    }
  }
  
  if (obstaclesGroup.isTouching(player)) {
    player.scale = 0.065; 
    score = score - 2; 
  }
  
  
  player.velocityY = player.velocityY + 0.8
    player.collide(invisibleGround);
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("score: "+ score, 185, 40);
}

function food() {
if (frameCount % 80 === 0) {
  var banana = createSprite(255, 233, 20, 20);
  banana.scale = 0.025;
  banana.y = Math.round(random(160, 212));
  banana.addImage(bananaImg);
  banana.velocityX = -2.5;
  banana.lifetime = 100;
  foodsGroup.add(banana);
  }

}

function obstacle() {
  if (frameCount % 60 === 0) {
var obstacle = createSprite (255, 225, 20, 20);
obstacle.addImage(obstacleImg);
obstacle.scale = 0.05;
obstacle.velocityX = -2.5;
obstacle.lifetime = 100;
obstaclesGroup.add(obstacle);
  } 
}
