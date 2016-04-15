var backimg = "./img/grey.png";
var image = ["./img/bear.jpg", "./img/deer.jpg", "./img/eagle.jpg", "./img/fox.jpg", 
			 "./img/hedgehog.jpg", "./img/pig.jpg", "./img/squirrel.jpg", "./img/wolf.jpg"];

var order = [2, 3, 6, 5, 0, 1, 4, 7, 2, 3, 5, 1, 6, 4, 7, 0];	/*card suits*/
var done = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];	/*matched or not*/
		 
var avalible = true;	/*cards can be flipped or not*/
var pairs = 0; 			/*count how many pairs already matched*/
var time = 0;			/*game time*/

var gameState = "new";	/*new; gameon; pause; end*/ 
var nowcard; 			/*the card flipped now*/
var lastcard; 			/*remember the latest card flipped*/
var match = 0; 			/*0:no card flipped; 1: one card flipped--matching time;*/

var peek = 3;			/*time for peeking*/

window.onload = function(){
	avalible = true;	
	pairs = 0; 			
	time = 0;			

	gameState = "new";	
	match = 0; 	
	peek = 3;
	
	document.getElementById('startBtn').disabled=false;
	document.getElementById('hintBtn').disabled=true;
	document.getElementById('timeCost').innerHTML = time;
	document.getElementById('startBtn').value="Start";
	document.getElementById('message').innerHTML = 'Press "Start" to begin !';
	shuffle();
}


function flip(id){
	
	if(gameState == "gameon" && avalible == true && done[parseInt(id)] == 0 && id!=lastcard){
		nowcard = id;	
		document.getElementById(id).src = image[order[parseInt(id)]];

		switch(match){
			case 0:
				lastcard = id;
				match = 1;
			break;
			case 1:
				avalible = false;
				
				if(order[parseInt(id)] == order[parseInt(lastcard)]){/*same card*/
					pairs ++;
					done[parseInt(id)] = 1; 
					done[parseInt(lastcard)] = 1;
					avalible = true;
					/*game finished*/
					if(pairs == 8){	
						gameState = "end";
						document.getElementById('startBtn').disabled=true;
						document.getElementById('hintBtn').disabled=true;
						document.getElementById('message').innerHTML = "You Won in " + time +" secs!!";
						clearTimeout(timer);
					}
				}else{ /*different card*/
					document.getElementById('hintBtn').disabled=true;
					setTimeout('closecard()', 1000);
				}
				match = 0;
			break;
		}
		console.log("id="+id + "; last="+lastcard+ "; "+ done);
	}
}

function closecard(){
	document.getElementById(nowcard).src = backimg; 
	document.getElementById(lastcard).src = backimg;
	document.getElementById('hintBtn').disabled=false;
	lastcard = -1;
	avalible = true;
}

function game(){
	switch(gameState){
		case "new":
			document.getElementById('startBtn').value="Pause";
			document.getElementById('message').innerHTML = "";
			document.getElementById('hintBtn').disabled=false;
			clock();
			gameState = "gameon";
		break;
		case "gameon":
			document.getElementById('startBtn').value="Continue";
			document.getElementById('message').innerHTML = 'Press "Continue" to continue !';
			document.getElementById('hintBtn').disabled=true;
			clearTimeout(timer);
			gameState = "pause";
		break;
		case "pause":
			document.getElementById('startBtn').value="Pause";
			document.getElementById('message').innerHTML = "";
			document.getElementById('hintBtn').disabled=false;
			clock();
			gameState = "gameon";
		break;
		case "end":
		break;
	}
}


function init(){
	
	avalible = true;	
	pairs = 0; 			
	time = 0;			

	gameState = "new";	
	match = 0; 	
	peek = 3;
	lastcard = -1;
	document.getElementById('startBtn').disabled=false;
	document.getElementById('hintBtn').disabled=true;
	document.getElementById('timeCost').innerHTML = time;
	document.getElementById('startBtn').value="Start";
	document.getElementById('message').innerHTML = 'Press "Start" to begin !';
	
	var place = 0;
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			place = j*4+i;
			document.getElementById(place).src = backimg; 
			done[place] = 0;
		}
	}
	
	shuffle();
	clearTimeout(timer);
}

function clock(){
    time++;
	document.getElementById("timeCost").innerHTML = time;
    timer = setTimeout("clock()", 1000);
}

/*shuffle by exchange elements*/
function shuffle(){

	for(var i=0; i<16; i++){
		var j = parseInt(Math.random() * 16);
		var temp = order[i];
		order[i] = order[j];
		order[j] = temp;
	}
	
}

function hint(){
	
	match = 0;
	lastcard = -1;
	document.getElementById('startBtn').disabled=true;
	document.getElementById('newBtn').disabled=true;
	avalible = false;
	
	var place;
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			place = j*4+i;
			if(done[place] == 0){
				document.getElementById(place).src = image[order[place]]; 
			}
		}
	}
	countdown();

} 

function countdown(){
    
	if(peek == 0){
		clearTimeout(peektime);
		peek = 3;
		document.getElementById("message").innerHTML = "";
		document.getElementById('startBtn').disabled=false;
		document.getElementById('newBtn').disabled=false;
		
		var place;
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				place = j*4+i;
				if(done[place] == 0){
					document.getElementById(place).src = backimg; 
				}
			}
		}
		avalible = true;
	}else{
		document.getElementById("message").innerHTML = 'You have ' + peek + ' secs to peek!';
		peektime = setTimeout("countdown()", 1000);
		peek--;
	}
}