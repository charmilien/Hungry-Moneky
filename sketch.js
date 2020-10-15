
var monkey , monkey_running, mtree, mtreeI;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var ground, groundImage,iground,a;
var gameState="Play";
var sound1, sound2;
var gameOverI, gmi, restart, ri;

function preload()
{  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage=loadImage("jungle2.jpg");
  
  sound1=loadSound("pooth.mp3")
  sound2=loadSound("moca.mp3")
  
  mtreeI=loadImage("Monkey.png")
  
 gmi=loadImage("gameOver.png")
 ri=loadImage("restart.png")
  
}



function setup() 
{
  createCanvas(600,450);
  ground=createSprite(250,100,600,40);
  ground.addImage(groundImage);
  ground.scale=1.2; 
  
  iground=createSprite(250,320,500,40)
  iground.visible=false;
    
  monkey=createSprite(50,250,20,20)
  monkey.addAnimation("running M", monkey_running)
  monkey.scale=0.1;
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  //monkey.debug=true;
  monkey.setCollider("circle",0,00,100)
 // obstacleGroup.debug=true;
 // obstacleGroup.setColliderEach("circle",0,0,20)
 gameOverI=createSprite(280,350,10,10)
  gameOverI.addImage(gmi)
  gameOverI.scale=0.6
  gameOverI.visible=false;
  
 restart=createSprite(280,380,10,10)
  restart.addImage(ri)
  restart.scale=0.5;
  restart.visible=false;
}


function draw() 
{
  background("pink")
  monkey.collide(iground);
 //  score=score+ Math.round(getFrameRate()/60);
 // console.log(monkey.y)
  
  
  if(gameState==="Play")
  {
      
     
        if (keyDown("space") && monkey.y>259)
          {
            monkey.velocityY=-15;
            sound1.play();
          }
        monkey.velocityY=monkey.velocityY + 0.5;

        ground.velocityX=-(5+ score/100)
        if(ground.x<0)
          {
            ground.x=ground.width/2;
          }

        spwanBanana();
        spwanObstacles();
    
       if(FoodGroup.isTouching(monkey))
          {
            FoodGroup.destroyEach();
            score=score+5;
            monkey.scale=monkey.scale+0.02 
          }

        if(obstacleGroup.isTouching(monkey))
          {
            //monkey.collide(obstacleGroup)
            //mtree=createSprite(200,200)
            //mtree.addImage(mtreeI)
            //mtree.scale=0.1
            
            sound2.play();
            gameState="END"           
          }
  } 
  
  if(gameState==="END")
    {
      monkey.addImage("running M",mtreeI)
            //monkey.addImage(mtreeI)
            monkey.scale=0.06;
      gameOverI.visible=true;
      restart.visible=true;
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
      ground.velocityX=0;
      monkey.velocityY=0;
      sound1.stop();
      
      if(mousePressedOver(restart) && gameState==="END")
        {
          gameState="Play"
          obstacleGroup.destroyEach();
          FoodGroup.destroyEach();
          monkey.addAnimation("running M", monkey_running)
          gameOverI.visible=false;
      restart.visible=false;
        }
    }
    
  drawSprites();
  
  
  fill("yellow")
  textSize(20)
  text("Survivle Time:  "+ score,350,30)
}


function spwanBanana()
{
  if(frameCount%100===0)
    {
  banana=createSprite(620,random(10,250),10,10)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-5;
  banana.lifetime=130;
  banana.depth=monkey.depth;
  monkey.depth++;
  FoodGroup.add(banana);
    }
}
  
function spwanObstacles()
{
  if(frameCount%140===0)
    {
  obstacle=createSprite(620,320,10,10)
  obstacle.addImage(obstacleImage);
  obstacle.scale=random(0.1,0.3)
  obstacle.velocityX=-(5+score/100)
  obstacle.lifetime=130;
 //obstacle.depth=monkey.depth;
 // monkey.depth++;
  obstacleGroup.add(obstacle);
    }
}

function reset()
{
        ground.velocityX=0;
        monkey.velocityY=0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        sound1.stop();
        text("Press M to restart",120,100)
       
      //score=a;
        
      
    } 


