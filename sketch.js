//Create variables here
var dog, happyDog;
var Foodobj, foodStock;
var dogImg, happyDogImg;
var feed, AddFood, position;
var database;
var feedTime, lastFeed = 0;
var bg_img;
var FoodRemaining = 90;
function preload() {
  //load images here;
  bg_img = loadImage("images/bg3.png");
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  food_img = loadImage("images/Milk.png");
}

function setup() {
  createCanvas(1000, 800);
  createCanvas(1000, 800);
  database = firebase.database();
  //take foodStock value from database.
  foodStoke = database.ref('foodReamining');
  foodStoke.on("value", readStoke);
  //take lastfed time from database.
  feedTime = database.ref('feedTime');
  feedTime.on("value", function (data) {
    lastFeed = data.val();
  })
  console.log(lastFeed);
  //create feed button.
  feed = createButton("FEED THE DOG");
  feed.position(500, 50);
  feed.mousePressed(FeedDog);
  //create addFood button.
  AddFood = createButton("ADD FOOD");
  AddFood.position(610, 50);
  AddFood.mousePressed(Addfood);
  //create dog sprite.
  dog = createSprite(800, 350, 50, 50);
  dog.addImage("dg", dogImg);
  dog.scale = 0.3;
  //create foodobject.
  Foodobj = new Food();
}



function draw() {
  background(color(46, 139, 87));

  Foodobj.display();
  drawSprites();

  fill("black");
  textSize(15);
  text("Food Remaining : " + FoodRemaining, 20, 35);
  text("https://virtual-pet-2-f16fe-default-rtdb.firebaseio.com/", 450, 650)



}
//read stock function.
function readStoke(data) {
  position = data.val();
  Foodobj.updateFoodStock(position);
}
//write stock
function writeStoke(x) {
  if (x > 0) {
    x = x - 1;
  }
  else {
    x = 0;
  }
  database.ref('/').set(
    { 'foodReamining': x })
}
//function to feed the dog.
function FeedDog() {
  dog.addImage("dg", happyDogImg);
  FoodRemaining = FoodRemaining - 1;
  Foodobj.updateFoodStock(Foodobj.getFoodStock() - 1);
  database.ref('/').update({
    foodReamining: Foodobj.getFoodStock(),
    feedTime: hour(),
  })
}
//function to addFood.
function Addfood() {
  console.log(FoodRemaining);
  FoodRemaining = FoodRemaining + 1;
  database.ref('/').update({
    foodReamining: FoodRemaining


  })
}