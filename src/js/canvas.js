// Initial Setup
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

document.addEventListener(function(e) {

	if (e.keyCode == 13) {

				console.log('enter stroked');
			}
},false);

addEventListener('resize', function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});


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
		if(this.y + this.radius > canvas.height)
		{
			this.dy= -this.dy;

		}
		else{
			this.dy += 1.2;
		}

		if(this.x + this.radius >= canvas.width|| this.x - this.radius <= 0)
		{
			this.dx= -this.dx;

		}

		this.x+= this.dx;
		this.y+= this.dy;

		this.draw();

	};

	//update ends here

	//  creates a bubble for the mouse and its movement
	this.shoot = function(){
	//calls draw to put it into the canvas
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
//balls

// Initiante the bubble array, pointer bubble, and notDebounced boolean
// var ball;
// var smallBall;
// var mediumBAll;
var pointer;
var ballArray= [];
var notDebounced = true;

// Initialization function
function init() {
	//create bubble array and pointer
	ballArray=[];
	// ball = new Ball(50, 50,3,2,40,'blue');
	// smallBall = new Ball(100, 400,3,2,15,'red');
	// mediumBAll= new Ball(100, 200,3,2,20,'purple');
	pointer= new Ball(undefined, undefined,3,2,10,'black');

	// create Ball objects and push them into the bubble array
	for (var i = 0; i < 4; i++) {
		var x= (Math.random() * innerWidth) - 100;
		var y = (Math.random() * innerHeight) - 100;

		ballArray.push(new Ball(x,y,3,2,30,'blue'));
	}
}

// Animation Loop
	function animate() {
		requestAnimationFrame(animate);
		//clear canvas
		c.clearRect(0, 0, canvas.width, canvas.height);
		pointer.x= mouse.x;
		pointer.y= mouse.y;
		pointer.shoot();

		draw(ghost);


		ballArray.forEach(function(bubble){

			if((distance(bubble.x,bubble.y,pointer.x,pointer.y)< bubble.radius + pointer.radius) && notDebounced)
			{
				notDebounced = false;

				setTimeout(function() {
					notDebounced = true;
				}, 500);
				ballArray = ballArray.filter(function(ball) {
					return !(ball.x === bubble.x && ball.y === bubble.y);
				});
				ballArray.push(new Ball(bubble.x + bubble.dx, bubble.y + bubble.dy,3,2,20,'red'));
				ballArray.push(new Ball(bubble.x - bubble.dx, bubble.y - bubble.dy,3,2,20,'red'));

			}
			bubble.update();
		});
}

var ghost = {
	x:(canvas.width)/2,
	y:canvas.height - 100,
	// moveUp:    function() { this.y -= 25 },
	// moveDown:  function() { this.y += 25 },
	moveLeft:  function() { this.x -= 25 },
	moveRight: function() { this.x += 25 },
}

function draw(ghost) {
	var img = new Image();
	img.src = "https://media.giphy.com/media/xUA7aRSQ01d3iCEWZO/giphy.gif";
	c.drawImage(img, ghost.x, ghost.y, 100, 100);
	document.onkeydown = function(e) {
	e.preventDefault();
  switch (e.keyCode) {
    // case 38: ghost.moveUp();    console.log('up',    ghost); break;
    // case 40: ghost.moveDown();  console.log('down',  ghost); break;
    case 37: ghost.moveLeft();  console.log('left',  ghost); break;
    case 39: ghost.moveRight(); console.log('right', ghost); break;
  }

}
}

init();
animate();
