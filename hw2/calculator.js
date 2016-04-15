/*TODO: delete的state切換影響小數點cnt*/


var pntCnt = 0;			/*確保每個數字只有一個小數點*/
var state = 'isNum';	/*0~9: isNum;	+-×÷:isSym;		(:isLeft;	):isRight;*/
var leftCnt = 0;		/*左括號數量*/
var rightCnt = 0;		/*右括號數量*/

function showText(ch){
	
	if(document.getElementById("output").value.length == 1 && document.getElementById("output").value == "0"){
		/*第一位不可以是符號or零*/
		if(ch == '+' || ch == '-' || ch== '*' || ch=='/' || ch==')' || ch=='.'){
			alert("Woops! You can't do that!");
		}else if (ch == '('){
			document.getElementById("output").value = ch;
			state = 'isLeft';
			leftCnt ++;
		}else if ('0' <= ch && ch <='9'){
			document.getElementById("output").value = ch;
			state = 'isNum';
		}
	}else{
		switch(state){
			case 'isNum':	/*上一個是數字*/
				if(ch == '+' || ch == '-' || ch== '*' || ch=='/'){
					document.getElementById("output").value += ch;
					state = 'isSym';
					pntCnt = 0;
				}else if(ch == '('){
					document.getElementById("output").value += ch;
					state = 'isLeft';
					leftCnt ++;
					pntCnt = 0;
				}else if(ch == ')'){
					if(leftCnt <= rightCnt){
						alert("Woops! You can't do that!");
					}else{
						document.getElementById("output").value += ch;
						state = 'isRight';
						rightCnt++;
						pntCnt = 0;
					}
				}else if('0' <= ch && ch <= '9'){
					document.getElementById("output").value += ch;
					state = 'isNum';
				}else if(ch == '.'){
					if(pntCnt == 1){
						alert("Woops! You can't do that!");
					}else{
						document.getElementById("output").value += ch;
						pntCnt = 1;
						state = 'isNum';
					}
				}
				break;
			case 'isSym':	/*上一個是加減乘除*/
				if(ch == '+' || ch == '-' || ch== '*' || ch=='/'){
					alert("Woops! You can't do that!");
				}else if(ch == '('){
					document.getElementById("output").value += ch;
					state = 'isLeft';
					leftCnt ++;
					pntCnt = 0;
				}else if(ch == ')'){
					alert("Woops! You can't do that!");
				}else if('0' <= ch && ch <= '9'){
					document.getElementById("output").value += ch;
					state = 'isNum';
					pntCnt = 0;
				}else if(ch == '.'){
					alert("Woops! You can't do that!");
				}
				
				break;
			case 'isLeft':	/*上一個是左括號*/
				if(ch == '+' || ch == '-' || ch== '*' || ch=='/'){
					alert("Woops! You can't do that!");
				}else if(ch == '('){
					document.getElementById("output").value += ch;
					state = 'isLeft';
					leftCnt++;
					pntCnt = 0;
				}else if(ch == ')'){
					alert("Woops! You can't do that!");
				}else if('0' <= ch && ch <= '9'){
					document.getElementById("output").value += ch;
					state = 'isNum';
					pntCnt = 0;
				}else if(ch == '.'){
					alert("Woops! You can't do that!");
				}
				break;
			case 'isRight':	/*上一個是右括號*/
				if(ch == '+' || ch == '-' || ch== '*' || ch=='/'){
					document.getElementById("output").value += ch;
					state = 'isSym';
					pntCnt = 0;
				}else if(ch == '('){
					alert("Woops! You can't do that!");
				}else if(ch == ')'){
					if(leftCnt <= rightCnt){
						alert("Woops! You can't do that!");
					}else{
						document.getElementById("output").value += ch;
						state = 'isRight';
						rightCnt++;
						pntCnt = 0;
					}
				}else if('0' <= ch && ch <= '9'){
					alert("Woops! You can't do that!");
				}else if(ch == '.'){
					alert("Woops! You can't do that!");
				}
				break;
			default:
				alert("!!!!!!Something Wrong!!!!!!");
		
		}
	}
	console.log(state + pntCnt);
}

function clearAll(){
	document.getElementById("output").value = "0";
	state = 'isNum';
	pntCnt = 0;
	leftCnt = 0;
	rightCnt = 0;
}

function deleteChar(){
	var length;
	var last;	/*看最後一個char是甚麼來切換state*/
	var deleted; /*看被刪掉的是不是括號*/
	var length = document.getElementById("output").value.length;
	if(length != 0){
	
		/*delete到最後一位數了*/
		if( (length-1) == 0){
			document.getElementById("output").value = "0";
			state = 'isNum';
		}else{ /*切換state*/
			last = document.getElementById("output").value.charAt(length-2);
			deleted = document.getElementById("output").value.charAt(length-1);
			document.getElementById("output").value = document.getElementById("output").value.substring(0,length-1);	
			if( last == '+' || last == '-' || last == '*' || last == '/' ){
				state = 'isSym';
			}else if (last == '(') {
				state = 'isLeft';
			}else if (last == ')' ){
				state = 'isRight';
			}else if (('0'<= last && last <= '9')  ||  last == '.' ){
				state = 'isNum';
			}
			
			if(deleted == '('){
				leftCnt --;
			}else if(deleted == ')'){
				rightCnt --;
			}
		}
	}
	console.log(state + "  " + length);
}

function calculate(){
	var ans;
	var str;
	try{
		str = document.getElementById("output").value;
		ans = eval(str);
		document.getElementById("output").value = ans.toString().substring(0,12);
	}catch(err){
		alert("Woops! Something Wrong!\n" + err);
	}
}

function mathematics(fx){
	var str;
	var ans;
	
	try{
		str = document.getElementById("output").value;
		ans = eval(str);
		if(fx == 'sin'){
			ans = Math.sin(ans);
		}else if(fx == 'cos'){
			ans = Math.cos(ans);
		}else if(fx == 'tan'){
			ans = Math.tan(ans);
		}else if(fx == 'sqrt'){
			ans = Math.sqrt(ans);
		}else if(fx == 'exp'){
			ans = Math.exp(ans);
		}else if(fx == 'log'){
			ans = Math.log(ans);
		}
		
		document.getElementById("output").value = ans.toString().substring(0,12);
	}catch(err){
		alert("Woops! Something Wrong!\n" + err);
	}
}