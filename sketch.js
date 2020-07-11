var database;
var dog,dogSprite,dogHappy,dogRegular;
var foodS,foodStock;

function preload(){
  dogRegular = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();

  foodStock = database.ref("food");
  foodStock.on("value",readPosition);

  dog = createSprite(250,400,10,10);
  dog.addImage(dogRegular);
  dog.scale = 0.25;
}

function draw(){
  background(46,139,87)

  if(keyWentDown(UP_ARROW)){
    writePosition(foodS);
    dog.addImage(dogHappy);
  }
  else{
    dog.addImage(dogRegular);
  }

  drawSprites();
  
  textSize(15);
  fill(0);
  text("Press the up arrow key to feed the dog",75,50);
  text("Amount of Food Left: "+foodS,150,300)
}

function readPosition(data){
  foodS = data.val();
}

function writePosition(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref("/").update({
    food:x
  })
}