var x;

var y;

var xSpeed;

var ySpeed;



var mass;

var accel;



var finalScore = [];





function setup() {

	createCanvas(1200, 800);

	//mass = 26;

	//x = (width/4)-(mass/2);

	//y = 150;

	//ySpeed = 0;

	//isFlipped = false;

	//accel = mass * 0.01;

	//noStroke();

	stroke(255, 204, 0);

	strokeWeight(3);



	var checkX;

	var checkY;

	var wallheight = 0;

}



var player = function(x,y,mass,ySpeed,isFlipped,accel) {

	this.x = x;

	this.y = y;

	this.mass = mass;

	this.ySpeed = ySpeed;

	this.isFlipped = isFlipped;

	this.accel = accel;

	this.health = 20;

	this.score = 0;

	this.update = function() {

		//fill (0,0,0, 25);

		//rect(this.x-6,this.y-7,this.mass,this.mass*1.5);

		fill(0);

		this.ySpeed += this.accel;

		this.y += this.ySpeed;

		rect(this.x,this.y,this.mass/2,this.mass);



		this.score += 1;

		textSize(56);

		text(this.score, 900, 60);





		if (this.isFlipped) {

			triangle(this.x-10, this.y, this.x+(this.mass/2)+10, this.y, this.x+(this.mass/4), (this.y-(this.mass/2)));



		} else if (!this.isFlipped) {

			triangle(this.x-10, this.y+this.mass, this.x+(this.mass/2)+10, this.y+this.mass, this.x+(this.mass/4), (this.y+(this.mass*1.5)));

		}

		if (this.y > height - this.mass-(this.mass/2)) {

	    this.ySpeed *= -0.5;

	    this.y = height - this.mass-(this.mass/2);

	  }

		if (this.y < 0 + (this.mass/2)) {

	    this.ySpeed *= -0.5;

	    this.y = 0+(this.mass/2);

	  }

		fill(255,0,0);

		noStroke();

		rect(20,20,this.health*10,15);

		stroke(255, 204, 0);

		strokeWeight(4);



	}

	this.reset = function() {

		this.health = 20;

		this.score = 0;

	}

}



function getRandomInt(min,max) {

  return Math.floor((Math.random()*max)+min);

}



var token = function(x,y,speed,angle) {

	this.x = x;

	this.y = y;

	this.speed = speed;

	this.angle = angle;

	this.update = function() {

		this.x -= this.speed;

		this.y += this.angle;

		fill(255,215,0);

		rect(this.x,this.y,25,25);

		if (this.y < 0 || this.y > 800) {

			this.angle *= -1;

		}

	}

	this.reset = function() {

		this.x += 1500;

	}

}



var enemy = function(x,y,speed,size,angle) {

	this.x = x;

	this.y = y;

	this.speed = speed;

	this.size = size;

	this.angle = angle;

	this.update = function() {

		this.x -= this.speed;

		this.y += this.angle;

		fill(100,0,0);

		rect(this.x,this.y,this.size,this.size);

		if (this.y < 0 || this.y > 800) {

			this.angle *= -1;

		}

	}

	this.reset = function() {

		this.x += 1500;

	}





}



var tokens = [];

for (var w = 0; w <	10; w++) {

	tokens[w] = new token(getRandomInt(1200,7000),getRandomInt(100,800), getRandomInt(4,7), getRandomInt(1,2));

	//console.log(enemies[i].y);

}



var enemies = [];

for (var i = 0; i <	50; i++) {

	enemies[i] = new enemy(getRandomInt(1200,7000),getRandomInt(100,800), getRandomInt(4,7), 25, getRandomInt(1,2));

	//console.log(enemies[i].y);

}

var walls = [];

for (var q = 0; q < 500; q++) {

	walls[q] = new enemy(getRandomInt(1200,7000),Math.round(Math.random(0,1))*775, 5, 25, 0);

	//console.log(enemies[i].y);

}

player1 = new player(281,400,25,0,false,0.26);



var draw = function() {

	if (player1.health > 0) {



		for (var t = 0; t < 50; t++) {

			if (enemies[t].x <0) {

				enemies[t].x += getRandomInt(1200,3000);



			}

			if (walls[t].x < 0) {

				walls[t].x += getRandomInt(1200,3000);



			}



		}



		for (var t = 0; t < 10; t++) {

			if (tokens[t].x < 0) {

				tokens[t].x += getRandomInt(1200,3000);



			}

		}



		background(40);

		player1.update();

		checkX = player1.x-6;

		checkY = player1.y-7;



		for (var i = 0; i < enemies.length; i++) {

			enemies[i].update();

			walls[i].update();

			//console.log(enemies[i].x);

			if (enemies[i].x > 281

					&& enemies[i].x < (281+player1.mass)

					&& enemies[i].y > (player1.y-7)

				  && enemies[i].y < ((player1.y-7)+(player1.mass*1.5))) {

					console.log("COLLISION");

					player1.health -= 1;



					background(255,0,0);

			}

			if (walls[i].x > 281

					&& walls[i].x < (281+player1.mass)

					&& walls[i].y > (player1.y-7)

				  && walls[i].y < ((player1.y-7)+(player1.mass*1.5))) {

					console.log("COLLISION");

					player1.health -= 1;

					background(255,0,0);

			}





		}



		for (var t = 0; t < tokens.length; t++) {

			tokens[t].update();

			//console.log(tokens[t].x);

			if (tokens[t].x > 281

					&& tokens[t].x < (279+player1.mass)

					&& tokens[t].y > (player1.y-9)

					&& tokens[t].y < ((player1.y-9)+(player1.mass*1.59))) {

					console.log("COLLISION");

					player1.health += 1;



					background(0,255,255);

			}

		}



	} else {



			background(50);

			textSize(64);

			fill(200);

			noStroke();

			text('You Died', 450, 400);

			text('Final Score: ' + player1.score, 400, 500);

	}



};



function reset() {

	for (var t = 0; t < tokens.length; t++) {

		tokens[t].reset();

	}

	for (var i = 0; i < enemies.length; i++) {

		enemies[i].reset();

		walls[i].reset();

	}

	player1.reset();



}



function setScore() {

					finalScore.push(player1.score);

					finalScores = JSON.stringify(finalScore);

					localStorage.setItem("scoreList", finalScores);









          var scoreListParsed = JSON.parse(localStorage.getItem("scoreList"));

          //document.getElementById("scoreList1").innerHTML = scoreListParsed;

          //var scoreListGrabbed = localStorage.getItem("scoreList");

          document.getElementById("scoreListGrabbed").innerHTML = scoreListParsed;

};







function mouseClicked() {

	player1.isFlipped = !player1.isFlipped;

	//ySpeed -= 50;

	player1.ySpeed = 0;

	player1.accel *= -1;

}



function keyPressed() {

  if ((keyCode === DOWN_ARROW) && player1.isFlipped) {



		player1.ySpeed += 25;



  } else if ((keyCode === UP_ARROW) && !player.isFlipped) {



		player1.ySpeed -= 25;



  } else if (keyCode === CONTROL) {

		player1.isFlipped = !player1.isFlipped;

		//ySpeed -= 50;

		player1.ySpeed = 0;

		player1.accel *= -1;

	}

}


