var canvas = document.getElementById("imgCanvas");
var context = canvas.getContext("2d");
var mouseX;
var mouseY;
const colors = ['red', 'purple', 'green', 'blue', 'orange'];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function bubble(x, y, xSpeed, ySpeed, size, color) {
	this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.size = size;
  this.color = color;

  this.update = function() {
  	if (this.y < 0+this.size/2) {
      this.ySpeed *= -1;
    }
    if (this.y > window.innerHeight-this.size/2) {
      this.ySpeed *= -1;
    }
    if (this.x < 0+this.size/2) {
      this.xSpeed *= -1;
    }
    if (this.x > window.innerWidth-this.size/2) {
      this.xSpeed *= -1;
    }
  	this.x+=this.xSpeed;
    this.y+=this.ySpeed;


    context.strokeStyle = this.color;
    context.globalAlpha = 1;
    drawCircle(context, this.x, this.y, this.size);
    context.globalAlpha = 0.6;
    drawCircle(context, this.x, this.y, this.size*0.9);
    context.globalAlpha = 0.3;
    drawCircle(context, this.x, this.y, this.size*0.8);
    context.globalAlpha = 0.1;
    drawCircle(context, this.x, this.y, this.size*0.7);
    context.globalAlpha = 1;
  }
}


function createImageOnCanvas(imageId) {
  //canvas.style.display = "block";
  //document.getElementById("images").style.overflowY = "hidden";
  //var img = new Image(300, 300);
  //img.src = document.getElementById(imageId).src;
  //context.drawImage(img, (0), (0)); //onload....
}

bubbles = [];
for (var i = 0; i < 15; i++) {
  let random = Math.floor(Math.random() * colors.length);
	let bub = new bubble(getRandomInt(70,window.innerWidth-70),getRandomInt(70,window.innerHeight-70), getRandomNegPos(1), getRandomNegPos(1), getRandomInt(25,40), colors[random]);
  bubbles.push(bub);
  // if (i > 0) {
  //   if (circleCollision(bubbles[i-1].x, bubbles[i-1].y, bubbles[i-1].size, bubbles[i].x, bubbles[i].y, bubbles[i].size)) {
  //     bubbles.pop();
  //   }
  // }
}


function getMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  mouseX = evt.clientX;
  mouseY = evt.clientY;
}

function click(evt) {
	for (var i = 0; i < bubbles.length; i++) {
		if (circleCollision(mouseX, mouseY, 1, bubbles[i].x, bubbles[i].y, bubbles[i].size) && bubbles[i].size > 1) {
      let x = bubbles[i].x+(getRandomNegPos(1)*bubbles[i].size/3);
      let y = bubbles[i].y+(getRandomNegPos(1)*bubbles[i].size/3);
      let xSpeed = bubbles[i].xSpeed;
      let ySpeed = bubbles[i].ySpeed;
      let size = bubbles[i].size/2;
      let color = bubbles[i].color;
      bubbles.splice(i, 1); 
      let xOffSet = (getRandomInt((size/3)+1,size+1) * xSpeed);
      let yOffSet = (getRandomInt((size/3)+1,size+1) * ySpeed);
      let bub1 = new bubble(x + xOffSet, y + yOffSet, getRandomNegPos(2), getRandomNegPos(2), size, color);
      let bub2 = new bubble(x - xOffSet, y - yOffSet, getRandomNegPos(2), getRandomNegPos(2), size, color);
      
      bubbles.push(bub1);
      bubbles.push(bub2);
			
		}
	}
}

function draw(e) {
	context.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < bubbles.length; i++) {
    
  	for (var j = 0; j < bubbles.length; j++) {
    	if (j != i) {
      	if (circleCollision(bubbles[j].x, bubbles[j].y, bubbles[j].size, bubbles[i].x, bubbles[i].y, bubbles[i].size)) {
        	//console.log("COLLISION");
          if (circleDistance(bubbles[j].x, bubbles[j].y, bubbles[j].size, bubbles[i].x, bubbles[i].y, bubbles[i].size) < (bubbles[j].size + bubbles[i].size)*0.9) {
            bubbles[j].x += Math.abs(bubbles[j].x - bubbles[i].x);
            bubbles[j].y += Math.abs(bubbles[j].y - bubbles[i].y);
          }
          
        	let tempX = bubbles[j].xSpeed;
          let tempY = bubbles[j].ySpeed;
          bubbles[j].xSpeed = bubbles[i].xSpeed;
          bubbles[j].ySpeed = bubbles[i].ySpeed;
          bubbles[i].xSpeed = tempX; 
          bubbles[i].ySpeed = tempY;

          // let x = bubbles[j].x+(getRandomNegPos(1)*bubbles[j].size/3);
          // let y = bubbles[j].y+(getRandomNegPos(1)*bubbles[j].size/3);
          // let xSpeed = bubbles[j].xSpeed;
          // let ySpeed = bubbles[j].ySpeed;
          // let size = bubbles[j].size/2;
          // let color = bubbles[j].color;
          // bubbles.splice(j, 1); 
          // let xOffSet = (getRandomInt((size/3)+1,size+1) * xSpeed);
          // let yOffSet = (getRandomInt((size/3)+1,size+1) * ySpeed);
          // let bub1 = new bubble(x + xOffSet, y + yOffSet, getRandomNegPos(2), getRandomNegPos(2), size, color);
          // let bub2 = new bubble(x - xOffSet, y - yOffSet, getRandomNegPos(2), getRandomNegPos(2), size, color);
          
          // bubbles.push(bub1);
          // bubbles.push(bub2);

        }
      }
    }

		bubbles[i].update();
    if (bubbles[i].size < 1) bubbles.splice(i, 1);
    if (bubbles.length < 10) {
      for (var i = 0; i < 10; i++) {
        let random = Math.floor(Math.random() * colors.length);
        let bub = new bubble(getRandomInt(70,window.innerWidth-70),getRandomInt(70,window.innerHeight-70), getRandomNegPos(1), getRandomNegPos(1), getRandomInt(15,30), colors[random]);
        bubbles.push(bub);
        // if (i > 0) {
        //   if (circleCollision(bubbles[i-1].x, bubbles[i-1].y, bubbles[i-1].size, bubbles[i].x, bubbles[i].y, bubbles[i].size)) {
        //     bubbles.pop();
        //   }
        // }
      }
    } 
	}

  // context.fillStyle = "#000000";
  // context.fillRect(mouseX, mouseY, 1, 1);
}

document.body.onload = function() {

  function gameLoop() {
  	window.addEventListener('mousemove', getMousePos, false);
		window.addEventListener('click', click, false);
    draw();
    window.requestAnimationFrame(gameLoop);
  }
  window.requestAnimationFrame(gameLoop);
};



function getRandomInt(min,max) {
    return Math.floor((Math.random()*max)+min);
}

function getRandomNegPos(max) {
	var num = Math.random()*max + 1; // this will get a number between 1 and max;
	num *= Math.round(Math.random()) ? 1 : -1;
	return num;

}

function drawCircle(ctx, cx, cy, rad) {
	ctx.beginPath();
  //ctx.fillRect(cx,cy,2,2);
  ctx.arc(cx, cy, rad, 0, 2 * Math.PI);
  ctx.stroke();

}



function circleCollision(p1x, p1y, r1, p2x, p2y, r2) {
  var a;
  var x;
  var y;

  a = r1 + r2;
  x = p1x - p2x;
  y = p1y - p2y;

  if ((Math.sqrt((x * x) + (y * y))) < a) {
    return true;
  } else {
    return false;
  }
}

function circleDistance(p1x, p1y, r1, p2x, p2y, r2) {
  var x;
  var y;
  x = p1x - p2x;
  y = p1y - p2y;
  return Math.sqrt((x * x) + (y * y))
}

