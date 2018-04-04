var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

var leftAngleDelta = 15;
var rightAngleDelta = 15;
var segmentsPerLine = 5;
var rotationsPerLine = 1;
var lineSpacing = -1;
var minBranchLength = 12;


var start = null;

var ctx = canvas.getContext('2d');

// ctx.lineWidth = 10;
// ctx.beginPath();
// ctx.moveTo(0, 0);
// ctx.lineTo(20, 20);
// ctx.stroke();

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        draw(600, 1000, 120, 10, 0); 
        

    //     var yStart = 100;
    //     var thicknessStart = 20;
    //     var thicknessEnd = 10;
    //     var length = 200;
    //     for(var i = 0; i < 100; i++) {
    //     	ctx.beginPath();
    //     	ctx.lineWidth = thicknessStart - ((thicknessStart - thicknessEnd) / 100) * i;

    //     	ctx.moveTo(100, 100 - length*(i/100));
				// 	ctx.lineTo(100, 100 - length*((i + 1)/100))
				// 	ctx.stroke();

				// } 
        
}
resizeCanvas();


function loop(time) {
	if(!start) start = time;

	var progress = ((time - start)/400)


	ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw(600, 1000, 120, 10, 0);
  
	console.log(Math.floor(Math.abs(Math.sin(progress) * 10)));

	minBranchLength = rotationsPerLine * 12;



	window.requestAnimationFrame(loop);
}

// window.requestAnimationFrame(loop);




function draw(xStart, yStart, length, thickness, angle) {
	ctx.save(); 
	ctx.translate(xStart, yStart - lineSpacing);
	ctx.rotate(angle * Math.PI / 180);

	for(var i = 0; i < segmentsPerLine; i++) {
		ctx.beginPath();

		var _thickness = thickness - ((thickness - (thickness*0.8))/segmentsPerLine) * i;
		_thickness = _thickness >= 1 ? _thickness : 1;


		// ctx.strokeStyle = "#351d0b";
		ctx.lineWidth = _thickness;

		ctx.moveTo(0, 0);
		ctx.lineTo(0, -length/segmentsPerLine);
		ctx.stroke();

		ctx.translate(0, -(length/segmentsPerLine));
	}


	// ctx.beginPath();
	// ctx.strokeStyle = "#351d0b";
	// ctx.fillStyle = "darkgreen";
	// ctx.lineWidth = thickness;
	// ctx.translate(xStart, yStart);
	// ctx.rotate(angle * Math.PI / 180);

	// ctx.moveTo(0, 0);
	// ctx.lineTo(0, -length);
	// ctx.stroke();


	if(length < minBranchLength) {
		// end of branch
		ctx.restore();
		return;
	}

	draw(0, 0, length*0.8, thickness * 0.8, leftAngleDelta);
	draw(0, 0, length*0.8, thickness * 0.8, -rightAngleDelta);

	ctx.restore();
}
