var road, roadImage;
var wall, thickness;
var bullet, bulletImage;
var speed, weight;
var PLAY = 0;
var END = 1;
var gameState;
var restart, restartImage;
var damage;
var gun, gunInage;

function preload() {
  roadImage = loadImage("Road.jpg");
  bulletImage = loadImage("Bullet.png")
  restartImage = loadImage("replay.png")
  gunImage = loadImage("Gun.png")
}

function setup() {
  createCanvas(1200, 300);
  road = createSprite(600, 150);
  road.addImage(roadImage);
  road.scale = 3;
  thickness = random(22, 83);
  wall = createSprite(1000, 150, thickness, 300);

  bullet = createSprite(300, 150);
  bullet.addImage(bulletImage);
  bullet.scale = 0.2;
  bullet.debug = false;
  bullet.setCollider("rectangle", 0, 0, 500, 250);
  gun = createSprite(200, 200);
  gun.addImage(gunImage);
  gun.scale = 0.7;
  gameState = PLAY;
  restart = createSprite(600, 150);
  restart.addImage(restartImage);
  restart.scale = 0.2;
}

function draw() {
  background("black");
  if (gameState === PLAY) {
    bullet.velocityX = 7;
    thickness = random(22, 83)
    wall.shapeColor = (200, 200, 200)
    restart.visible = false;
    speed = random(223, 321)
    weight = random(30, 52);
    if (Touched(bullet, wall)) {
      bullet.velocityX = 0;
      damage = (0.5 * weight * speed * speed) / (thickness * thickness * thickness)
      if (damage > 10) {
        wall.shapeColor = color(255, 0, 0)
      }
      if (damage <= 10) {
        wall.shapeColor = color(0, 255, 0)
      }
      gameState = END;
    }
  }
  if (gameState === END) {
    restart.visible = true;
    if (mousePressedOver(restart)) {
      gameState = PLAY;
      bullet.x = 300;
    }
  }
  drawSprites();
}

function Touched(lbullet, lwall) {
  if (lbullet.x - lwall.x < lbullet.width / 6 + lwall.width / 6 &&
    lwall.x - lbullet.x < lbullet.width / 6 + lwall.width / 6 &&
    lbullet.y - lwall.y < lbullet.height / 6 + lwall.height / 6 &&
    lwall.y - lbullet.y < lbullet.height / 6 + lwall.height / 6) {
    return true;
  } else {
    return false
  }
}