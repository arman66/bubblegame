// Initial Setup
console.log("connected");
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


// Variables
const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

const colors = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66'
];


// Event Listeners
addEventListener('mousemove', event => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener('keydown', function(e) {

	if (e.keyCode == 32) {

   bulletArray.push(new Ball(Mel.x+45,Mel.y,3,5,10,"black"));
	 console.log("bullet shot");
 }
});

addEventListener('resize', function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});
// addEventListener('click', function() {
//
// 	init();
// });


// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    xDist = x2 - x1;
    yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}


// Bubble Ojject
function Ball(x, y, dx,dy,radius, color) {
	this.x = x;
	this.y = y;
	this.dy= dy;
	this.dx= dx;
	this.radius = radius;
	this.color = color;

	// update function checks to see if x and y are going to hit the borders as well as adding a fixed gravity to the balls
	this.update = function() {
		if(this.y + this.radius>= innerHeight)
		{
			this.dy = -this.dy;

		}

		else{
			this.dy += 0.1;
		}



		if(this.x + this.radius >= canvas.width|| this.x - this.radius <= 0)
		{
			this.dx = -this.dx;

		}


		this.x+= this.dx;
		this.y+= this.dy;

		this.draw();

	};

	this.disparar= function () {

		this.y -= this.dy;
		this.dy= 10;
		this.draw();
	};


	// draws the bubble to the canvas
	this.draw = function (){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();

};
}
// Implementation
var promptedbubbles = prompt("How Difficult Do You Want to Play\n 1 Bubble easy\n 3 Bubbles medium\n 5 Bubbles Hard\n 10 Bubbles God Mode");
var pointer;
var bullet;
var ballArray= [];
var notDebounced = true;
var alReadyHit= true;
// Initialization function
function init() {
	//create bubble array and pointer
	ballArray=[];
	bulletArray=[];

	// create Ball objects and push them into the bubble array
	for (var i = 0; i < promptedbubbles; i++) {
		var x= (Math.random() * innerWidth) - 100;
		var y = (Math.random() * innerHeight) - 200;


		ballArray.push(new Ball(x,y,2,2,30,'blue'));
	}


		bulletArray.push(new Ball(Mel.x+45,Mel.y,3,undefined,10,"black"));
}

// Animation Loop
function animate() {
		var animationId = requestAnimationFrame(animate);
		//clear canvas
		c.clearRect(0, 0, canvas.width, canvas.height);
		//create the mouse pointer bubble
		// pointer.x= mouse.x;
		// pointer.y= mouse.y;
		// pointer.clicker();
		//creates the bullet on top of mel Gibson
		// bullet.disparar();

		// draws mel Gibson
		draw(Mel);

		bulletArray.forEach(function(bullets){
			bullets.disparar();
		});

		ballArray.forEach(function(bubble){


			//checks if balls touch mel Gibson
			if((distance(bubble.x,bubble.y,Mel.x+50, Mel.y+50)< bubble.radius + 50))
			{
				console.log("collision detected"+ Mel.x + Mel.y);
				cancelAnimationFrame(animationId);

				c.font = "40px Ariel";
				c.textAlign= 'center';
				c.fillText("Game Over",innerWidth/2,innerHeight/2);

			}



			for (var i = 0; i < bulletArray.length; i++)
			{
					if((distance(bubble.x,bubble.y,bulletArray[i].x,bulletArray[i].y)< bubble.radius + bulletArray[i].radius)&& notDebounced)
					{
						notDebounced = false;

						setTimeout(function()
							{
								notDebounced = true;
							}, 500);

							if(bubble.radius===30)
							{
								ballArray = ballArray.filter(function(ball)
										{
											return !(ball.x === bubble.x && ball.y === bubble.y);
										});
								ballArray.push(new Ball(bubble.x, (bubble.y - 100),2,2,20,'red'));
								ballArray.push(new Ball(bubble.x, (bubble.y - 100),-2,2,20,'red'));
							}

							else if(bubble.radius===20)
							{

								ballArray = ballArray.filter(function(ball)
										{
											return !(ball.x === bubble.x && ball.y === bubble.y);
										});
								ballArray.push(new Ball(bubble.x,(bubble.y - 100),2,2,10,'purple'));
								ballArray.push(new Ball(bubble.x,(bubble.y - 100),-2,2,10,'purple'));

							}
							else if(bubble.radius=== 10)
							{
								ballArray = ballArray.filter(function(ball)
										{
											return !(ball.x === bubble.x && ball.y === bubble.y);
										});
							}

					}

			}

			if (ballArray.length===0) {

				cancelAnimationFrame(animationId);
				c.font = "40px Ariel";
				c.textAlign= 'center';
				c.fillText("YOU WON!!",innerWidth/2,innerHeight/2);
			}


			bubble.update();
		});
}

// Initialize MEl Gibson
var Mel = {
	x:(canvas.width)/2,
	y:(canvas.height)-100,
	// moveUp:    function() { this.y -= 25 },
	// moveDown:  function() { this.y += 25 },
	moveLeft:  function() { this.x -= 40 },
	moveRight: function() { this.x += 40 },
};

// Draw Mel Gibson, fucktion called inside animate
			function draw(Mel) {
				var img = new Image();
				img.src = "https://media.giphy.com/media/xUA7aRSQ01d3iCEWZO/giphy.gif";
				c.drawImage(img, Mel.x, Mel.y, 100, 100);
				document.onkeydown = function(e) {
				e.preventDefault();
			  switch (e.keyCode) {
			    // case 38: ghost.moveUp();    console.log('up',    ghost); break;
			    // case 40: ghost.moveDown();  console.log('down',  ghost); break;
			    case 37: Mel.moveLeft();   break;
			    case 39: Mel.moveRight();  break;
			  									}

				};
			}



init();
animate();
