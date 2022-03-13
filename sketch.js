var END = 0;
var PLAY = 1;
var gameState = PLAY;
var dragonImg, dragonGroup;
var forestImg, forest;
var knightImg, knight;
var invisibleGround;
var score;
var bg;


function preload(){
// adding images to variable names
    forestImg = loadImage("forest.png");
    knightImg = loadImage("knight.png");
    dragonImg = loadImage("dragon.png");
}
  
function setup() {
 createCanvas(600,400);

 bg = createSprite(400,200,600,400);
    bg.addImage(forestImg);
    bg.scale = 1.5;   

    //displaying score
    text("Score: "+ score, 550,50);

    //creating knight
    knight = createSprite(80,320);
    knight.addImage(knightImg);
    knight.scale = 0.25;

    //creating invisible ground so knight won't fall
    invisibleGround = createSprite(300,390,600,20);
    invisibleGround.visible = true;

    score = 0;

    dragonGroup = new Group();

    //knight.debug = true;
    
}

function draw() {
    background("black");

    if(gameState === PLAY){
        bg.velocityX =-2;

        if(bg.x<100){
            bg.x = 400;
        }

        //jump when the space key is pressed
       if(keyDown("space") && knight.y >= 100 ) {
            knight.velocityY = -10;}

      if(dragonGroup.isTouching(knight)){
             gameState = END;
         
        }
        score = score + Math.round(getFrameRate()/60);
        //add gravity
        knight.velocityY = knight.velocityY + .8;
    }

    else if (gameState === END) {
    
         invisibleGround.velocityX = 0;
         knight.velocityY = 0
        
        text("game over!", 200,300);
        textSize(20);
        bg.velocityX =0;
        

       dragonGroup.setLifetimeEach(-1);
    
       dragonGroup.setVelocityXEach(0);
    
   
    }

    knight.collide(invisibleGround);

    SpawnDragons();

    drawSprites();
}

function SpawnDragons(){
    //creating dragon
    if(frameCount % 150 == 0){
        var dragon = createSprite(620,340);
        dragon.addImage(dragonImg);
        dragon.scale = 0.4;
        dragon.velocityX = -2;
        dragon.lifetime = 300;

        //add each dragon to the group
        dragonGroup.add(dragon);

        //dragon.debug = true;
    dragon.setCollider("rectangle",0,0,dragon.width - 150, dragon.height - 100);
    }

}
