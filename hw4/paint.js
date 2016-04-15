var canvas;
var ctx;

var drawMode;	//true, false
var tool;			//pencil, brush, circle, square, eraser, word 
var fgcolor, bgcolor;
var thickness, eraSize;
var mx, my, oriX, oriY;
var oriImg;

window.onload = function (){
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	drawMode = false;
	tool = 'pencil';
	fgcolor = '#000000';
	bgcolor = '#FFFFFF';
	thickness = 3;
	eraSize = 10;
	$('#myCanvas').css('cursor','url(./img/pencil.gif),auto');
}

function mouseDown(){
	drawMode = true;
	ctx.beginPath();
	curPos();
	ctx.moveTo(mx, my);
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	switch(tool){
		case 'pencil':
			ctx.strokeStyle = fgcolor;
			ctx.lineWidth = thickness;
		break;
		case 'eraser':
			ctx.strokeStyle = bgcolor;
			ctx.lineWidth = eraSize;
		break;
		case 'word':
			
		break;
		case 'line':
			ctx.strokeStyle = fgcolor;
			ctx.lineWidth = thickness;
			oriX = mx;
			oriY = my;
			oriImg = ctx.getImageData(0,0,canvas.width,canvas.height);
		break;
		case 'circle':
			ctx.strokeStyle = fgcolor;
			ctx.lineWidth = thickness;
			oriX = mx;
			oriY = my;
			oriImg = ctx.getImageData(0,0,canvas.width,canvas.height);
		break;
		case 'square':
			ctx.strokeStyle = fgcolor;
			ctx.lineWidth = thickness;
			oriX = mx;
			oriY = my;
			oriImg = ctx.getImageData(0,0,canvas.width,canvas.height);
		break;
		case 'fillsqr':
			ctx.fillStyle = fgcolor;
			oriX = mx;
			oriY = my;
			oriImg = ctx.getImageData(0,0,canvas.width,canvas.height);
		break;
		case 'fillcir':
			ctx.fillStyle = fgcolor;
			oriX = mx;
			oriY = my;
			oriImg = ctx.getImageData(0,0,canvas.width,canvas.height);
		break;
		case 'spray':
			ctx.fillStyle = fgcolor;
			sprayTime = setInterval(drawSpray,1);	//spray every 1 milliseconds
		break;
		case 'pen':
			ctx.strokeStyle = fgcolor;
			ctx.lineWidth = getRandomInt(2, 5);
		break;
		case 'marker':
			oriX = mx;
			oriY = my;
			ctx.strokeStyle = fgcolor;
			ctx.lineWidth = thickness;
		break;
		case 'star':
			var randNum = Math.floor(Math.random()*9);
			var img = document.createElement('img');
			img.src = './img/star'+randNum+'.png';
			img.onload = function(){
				ctx.drawImage(img, mx-img.width/2, my-img.height/2);
			}
		break;
	}
	
	console.log('down: ' + mx + ' ' + my);
}
 
function mouseMove(){
	curPos();
	if(drawMode){
		switch(tool){
			case 'pencil':
				ctx.lineTo(mx, my);
				ctx.stroke();
			break;
			case 'eraser':
				ctx.lineTo(mx, my);
				ctx.stroke();
			break;
			case 'word':
			
			break;
			case 'line':
				ctx.clearRect(0,0,canvas.width,canvas.height);
				ctx.putImageData(oriImg,0,0);
				drawLine(oriX, oriY, mx, my);
			break;
			case 'circle':
				ctx.clearRect(0,0,canvas.width,canvas.height);
				ctx.putImageData(oriImg,0,0);
				drawCircle(oriX, oriY, dist(oriX,oriY,mx,my));
			break;
			case 'square':
				ctx.clearRect(0,0,canvas.width,canvas.height);
				ctx.putImageData(oriImg,0,0);
				drawSquare(oriX, oriY, mx, my);
			break;
			case 'fillsqr':
				ctx.clearRect(0,0,canvas.width,canvas.height);
				ctx.putImageData(oriImg,0,0);
				drawFillSquare(oriX, oriY, mx, my);
			break;
			case 'fillcir':
				ctx.clearRect(0,0,canvas.width,canvas.height);
				ctx.putImageData(oriImg,0,0);
				drawFillCircle(oriX, oriY, dist(oriX,oriY,mx,my));
			break;
			case 'spray':

			break;
			case 'pen':
				ctx.lineWidth = getRandomInt(thickness-3, thickness+3);
				ctx.lineTo(mx, my);
				ctx.stroke();
			break;
			case 'marker':
				for (var i = parseInt(-(thickness/2)); i <= parseInt(thickness/2);i=i+2){
					ctx.moveTo(oriX + i, oriY + i);
					ctx.lineTo(mx + i, my + i);
					ctx.stroke();
				}
				oriX = mx;
				oriY = my;
			break;
			case 'star':
				var randNum = Math.floor(Math.random()*9);
				var img = document.createElement('img');
				img.src = './img/star'+randNum+'.png';
				img.onload = function(){
				ctx.drawImage(img, mx-img.width/2, my-img.height/2);
			}
			break;
		}
	}
	//console.log('move: ' + mx + ' ' + my);
}

function mouseUp(){
	drawMode = false;
	clearInterval(sprayTime);
}

function curPos(){
	mx = event.clientX-canvas.offsetLeft+window.pageXOffset;
    my = event.clientY-canvas.offsetTop+window.pageYOffset;
}

function changeFgColor(C){
	fgcolor = C;
}

function changeBgColor(C){
	bgcolor = C;
}

function changeThickness(T){
	thickness = T;
	$('#thickVal').text(T);
}

function changeEraSize(T){
	eraSize = T;
	$('#eraVal').text(T);
}

function changeTool(newTool){
	tool = newTool;
	switch(tool){
		case 'pencil':
			$('#myCanvas').css('cursor','url(./img/pencil.gif),auto');
		break;
		case 'eraser':
			$('#myCanvas').css('cursor','url(./img/eraser.png),auto');
		break;
		case 'word':
			$('#myCanvas').css('cursor','auto');
		break;
		case 'line':
			$('#myCanvas').css('cursor','crosshair');
		break;
		case 'circle':
			$('#myCanvas').css('cursor','crosshair');
		break;
		case 'square':
			$('#myCanvas').css('cursor','crosshair');
		break;
		case 'fillsqr':
			$('#myCanvas').css('cursor','crosshair');
		break;
		case 'fillcir':
			$('#myCanvas').css('cursor','crosshair');
		break;
		case 'spray':
			$('#myCanvas').css('cursor','url(./img/spray.png),auto');
		break;
		case 'pen':
			$('#myCanvas').css('cursor','url(./img/pen.png),auto');
		break;
		case 'marker':
			$('#myCanvas').css('cursor','url(./img/marker.png),auto');
		break;
		case 'star':
			$('#myCanvas').css('cursor','url(./img/star0.png),auto');
		break;
	}
}

function drawLine(x, y, curX, curY){
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(curX, curY);
	ctx.stroke();
}

function drawCircle(x, y, r){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.stroke();
}

function drawFillCircle(x, y, r){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.fill();
}

function drawSquare(x, y, curX, curY){
    ctx.beginPath();
	var stX = (x<curX)?x:curX;
	var stY = (y<curY)?y:curY;
	var wid = Math.abs(x-curX);
	var hei = Math.abs(y-curY);
    ctx.strokeRect(stX, stY, wid, hei);
}

function drawFillSquare(x, y, curX, curY){
    ctx.beginPath();
	var stX = (x<curX)?x:curX;
	var stY = (y<curY)?y:curY;
	var wid = Math.abs(x-curX);
	var hei = Math.abs(y-curY);
    ctx.fillRect(stX, stY, wid, hei);
}

function drawSpray(){
	var i;
 
    for (i = 0; i < 15; i++) {
        var offset = getRandomOffset(thickness);
        var dotX = mx + offset.x;
		var dotY = my + offset.y;
        ctx.fillRect(dotX, dotY, 1, 1);
    }

}

function getRandomOffset(radius) {
    var randomAngle = Math.random() * 360;
    var randomRadius = Math.random() * radius;
 
    return {
        x: Math.cos(randomAngle) * randomRadius,
        y: Math.sin(randomAngle) * randomRadius
    };
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clickFile(){	
	$('#files').click();
}

function loadFile() { 
	var imgfile = document.getElementById('files');
    var imageType = /image.*/;
	if (imgfile.files[0].type.match(imageType)) {
		var reader = new FileReader();
		reader.onload = function ( event ) { 
			var img = new Image();
            img.src = reader.result;
			var hei = img.height;
			var wid = img.width;
			ctx.drawImage(img, 0, 0, wid, hei);
			
			//todo:image oversize 
		}
		reader.readAsDataURL(imgfile.files[0]);
	}else {
		alert("Woops! It's not an image file!");
	}
}

function clearAll(){
	$('#myCanvas').css('background',bgcolor);
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

function dist(x1,y1,x2,y2){
    return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
}