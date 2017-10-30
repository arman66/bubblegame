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


// Objects
function Ball(x, y, dx,dy,radius, color) {
	this.x = x;
	this.y = y;
	this.dy= dy;
	this.dx= dx;
	this.radius = radius;
	this.color = color;


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

	this.shoot = function(){
		this.draw();
	};

	this.draw = function (){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	};
}


// Implementation
var ball;
var pointer;
var smallBall;
var mediumBAll;
var ballArray= [];
function init() {
ballArray=[];
ball = new Ball(50, 50,3,2,40,'blue');
smallBall = new Ball(100, 400,3,2,15,'red');
mediumBAll= new Ball(100, 200,3,2,20,'purple');
pointer= new Ball(undefined, undefined,3,2,10,'black');

	// for (var i = 0; i < 4; i++) {
	// 	ballArray.push(new Ball(50, 50,3,2,30,'blue'));
		// objects.push();
	// }
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);

	ball.update();
	smallBall.update();
	mediumBAll.update();
	pointer.x= mouse.x;
	pointer.y= mouse.y;
	pointer.shoot();
	if(distance(ball.x,ball.y,pointer.x,pointer.y)< ball.radius + pointer.radius)
	{
		ball.color= 'black';
	}
		// console.log(distance(ball.x,ball.y,pointer.x,pointer.y));

	// ballArray.forEach(function(bubble){
	// 	bubble.update();
	// });
}

init();
animate();
