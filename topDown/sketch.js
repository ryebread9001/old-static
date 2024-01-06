var mouseX = mouseX;

var mouseY = mouseY;



var clicked = false;

var bullets = [];



function setup() {

  createCanvas(800,800);

  background(100);



}





function getRandomInt(min,max) {

  return Math.floor((Math.random()*max)+min);

}



function keyPressed() {

  console.log(key);

  switch (key) {

      // For player direction.

      case "W":

        myPlayer.ySpeed = -5;

        break;



      case "D":

        myPlayer.xSpeed = 5;

        break;



      case "S":

        myPlayer.ySpeed = 5;

        break;



      case "A":

        myPlayer.xSpeed = -5;

        break;

  }

}





function keyReleased() {

  console.log(key);

  switch (key) {

      // For player direction.

      case "W":

        myPlayer.ySpeed = 0;

        break;



      case "D":

        myPlayer.xSpeed = 0;

        break;



      case "S":

        myPlayer.ySpeed = 0;

        break;



      case "A":

        myPlayer.xSpeed = 0;

        break;

  }

}











var player = function(x,y) {

  this.x = x;

  this.y = y;

  this.health = 10;

  this.xSpeed = 0;

  this.ySpeed = 0;



  this.update = function() {





    fill(255,10,10);

    rect(25,25,this.health * 10,10);

    this.x += this.xSpeed;

    this.y += this.ySpeed;

    fill(255);

    push();

    translate(this.x, this.y);

    rotate(atan2(mouseY-this.y, mouseX-this.x));

    noStroke();

    ellipse(0, 0, 15, 15);

    rect(-5, -3, 20, 5);

    pop();





  }

}







var myPlayer = new player(400,400);



var bullet = function(x,y) {

  this.x = x;

  this.y = y;





  this.speed = 0.05;

  this.xDirection = (myPlayer.x - mouseX);

  this.yDirection = (myPlayer.y - mouseY);

  this.xDirection *= this.speed;

  this.yDirection *= this.speed;



  this.draw = function() {



    this.x -= this.xDirection;



    this.y -= this.yDirection;



    noStroke();

    fill(255);

    ellipse(this.x,this.y,3,3);

  }



}



var enemy = function(x,y,speed, health) {

  this.x = x;

  this.y = y;

  this.speed = speed;

  this.health = health;

  this.xDirection = (myPlayer.x - this.x);

  this.yDirection = (myPlayer.y - this.y);







  this.move = function() {

    this.xDirection = (myPlayer.x - this.x);

    this.yDirection = (myPlayer.y - this.y);

    this.xDirection *= this.speed/10000;

    this.yDirection *= this.speed/10000;

    this.x += this.xDirection;

    this.y += this.yDirection;



    noStroke();

    fill(this.health*25,0,this.health*5);

    ellipse(this.x,this.y,13,13);



    if (

      this.y > height ||

      this.y < 0 ||

      this.x > width ||

      this.x < 0

    ) {

      this.x = 1010;

      this.y = 1010;

    }

  }



}



var enemies = [];

for (var i = 0; i < 20; i++) {

  enemies[i] = new enemy(getRandomInt(0,800),getRandomInt(0,800), getRandomInt(5,50), getRandomInt(1,5));

}



function mouseClicked() {

  clicked = true;



  bullets.push(new bullet(myPlayer.x,myPlayer.y));



}









function draw() {

  background(100);

  myPlayer.update();

  stroke(0);

  line(mouseX-6, mouseY, mouseX+6, mouseY);

  line(mouseX, mouseY+6, mouseX, mouseY-6);

  noStroke();

  if (clicked) {

    for (var i = 0; i < bullets.length; i++) {

      bullets[i].draw();

      for (var t = 0; t < enemies.length; t++) {

        if (Math.abs((enemies[t].x - bullets[i].x)) < 6 && Math.abs((enemies[t].y - bullets[i].y)) < 6) {

          enemies[t].health -= 1;

          if (enemies[t].health < 1) {

            enemies[t].x += getRandomInt(-1000,1000);

            enemies[t].y += getRandomInt(-1000,1000);

          }



        }

      }



    }

  }



  for (var i = 0; i < enemies.length; i++) {

    enemies[i].move();

    if (Math.abs(enemies[i].x - myPlayer.x) < 13 && Math.abs(enemies[i].y - myPlayer.y) < 13) {

      myPlayer.health -= 0.1;

    }



  }

}


