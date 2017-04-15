//Main.js 
function randomizer(array){
	const ran = Math.floor(Math.random() * array.length);	
	const val = array[ran];	
	return val;
}

function createLeftOverDeck(arrSuit, arrFace, deck){
	const deckFull = [...deck];
	while(deckFull.length !== 52){
		const ranSuit = randomizer(arrSuit);
		const ranFace = randomizer(arrFace);
		const tempObject = {'suits' : ranSuit, 'face' : ranFace};		
		const tempArr = deckFull.filter(ele => {
			return (ele['suits'] === tempObject['suits'] && ele['face'] === tempObject['face']);
		});
		if(tempArr.length === 0){
			deckFull.push(tempObject);
		}
	}
	console.log(deckFull);
	return deckFull;
}
	
function elt(type){
	var ele = document.createElement(type);
	for (var i = 1; i < arguments.length; i++){
		var child = arguments[i];
		if(typeof child === 'string'){
			child = document.createTextNode(child);
		}
		ele.appendChild(child);
	}
	return ele;
}
  
function createAndAppendCPHand(classType, largeType, mainType, arrHand){
	const firstDisplay = elt(largeType, elt(mainType, 'BACKSIDE OF CARD'));
	const secondDisplay = elt(largeType, elt(mainType, arrHand[1].suits, ' ', arrHand[1].face.toString()));
	firstDisplay.className = 'cpcard';
	secondDisplay.className = 'cpcard';
	const handCompCard = document.createElement('div');
	handCompCard.className = 'compCardContainer'; 
	handCompCard.appendChild(firstDisplay);
	handCompCard.appendChild(secondDisplay);
	document.querySelector('.game').appendChild(handCompCard);
	//document.querySelector(classType).appendChild(firstDisplay);
	//document.querySelector(classType).appendChild(secondDisplay);
}

function createAndAppendHand(classType, largeType, mainType, arrHand){
	const firstDisplay = elt(largeType, elt(mainType, arrHand[0].suits, ' ', arrHand[0].face.toString()));
	const secondDisplay = elt(largeType, elt(mainType, arrHand[1].suits, ' ', arrHand[1].face.toString()));
	firstDisplay.className = 'card';
	secondDisplay.className = 'card';
	const handCard = document.createElement('div'); 
	handCard.className = 'myCardContainer';
	handCard.appendChild(firstDisplay);
	handCard.appendChild(secondDisplay);
	document.querySelector('.game').appendChild(handCard);
	//document.querySelector(classType).appendChild(firstDisplay);
	//document.querySelector(classType).appendChild(secondDisplay);
}

function calculateScore(hand){
	const score = hand.reduce((acc, cur) => {
		console.log("ACC", acc, " CUR", cur);		//Test Log
		if(cur.face === 'A' && acc < 11){
			return acc += 11;
		} else if(cur.face === 'A' && acc > 10){ 
			return acc += 1;
		} else if(cur.face === 'J' || cur.face === 'Q' || cur.face === 'K'){
			return acc += 10;
		} else{
			return acc += parseInt(cur.face);
		}
	},0);
	console.log("MY SCORE I NEED", score);			//Test Log
	return score;
}

function createButton(phrase){
	const btn = document.createElement("BUTTON");
	const text = document.createTextNode(phrase);
	btn.appendChild(text);
	return btn;
}

function play(myScore, compScore, hand, compHand, deck){
	let score = myScore;
	const btnHit = document.querySelectorAll('.hitStand')[0];
	let dealt = 4;
	btnHit.addEventListener('click', evt => {	
		evt.preventDefault();
		if(score === 21){
			const gameButtonHit = document.querySelectorAll('.hitStand')[0];
			gameButtonHit.classList.toggle('hideForm');		
			const gameButtonStand = document.querySelectorAll('.hitStand')[1];
			gameButtonStand.classList.toggle('hideForm');		
			const winMessage = document.createElement('div');
			const text = document.createTextNode('Player won');
			winMessage.appendChild(text);
			winMessage.className = 'scoreKeeper';
			document.querySelector('.game').appendChild(winMessage);	
		} else if(score < 21){
			const newDisplay = elt('div', elt('p', deck[dealt].suits, ' ', deck[dealt].face.toString()));
			newDisplay.className = 'card';
			document.querySelector('.game').appendChild(newDisplay);	
			const bPlace = document.querySelector('.myCardContainer');
			bPlace.insertBefore(newDisplay, bPlace.childNodes[0]);
			hand.push(deck[dealt]);
			score = calculateScore(hand);					
			const message = 'Player Hand - Total: ' + score;
			const myScoreKeeper = document.querySelectorAll('.scoreKeeper')[1].textContent = message;
			dealt++;
			if(score > 21){
				const gameButtonHit = document.querySelectorAll('.hitStand')[0];
				gameButtonHit.classList.toggle('hideForm');		
				const gameButtonStand = document.querySelectorAll('.hitStand')[1];
				gameButtonStand.classList.toggle('hideForm');		
				const loseMessage = document.createElement('div');
				const text = document.createTextNode('Player, lost (BUST)');
				loseMessage.appendChild(text);
				loseMessage.className = 'scoreKeeper';
				document.querySelector('.game').appendChild(loseMessage);	
			} else if(score === 21){
				const gameButtonHit = document.querySelectorAll('.hitStand')[0];
				gameButtonHit.classList.toggle('hideForm');		
				const gameButtonStand = document.querySelectorAll('.hitStand')[1];
				gameButtonStand.classList.toggle('hideForm');		
				const winMessage = document.createElement('div');
				const text = document.createTextNode('Player won');
				winMessage.appendChild(text);
				winMessage.className = 'scoreKeeper';
				document.querySelector('.game').appendChild(winMessage);	
			}
		}
	});
	let cpScore = compScore; 
	const btnStand = document.querySelectorAll('.hitStand')[1];
	btnStand.addEventListener('click', evt => {
		evt.preventDefault();
		if(cpScore === 21){
			const gameButtonHit = document.querySelectorAll('.hitStand')[0];
			gameButtonHit.classList.toggle('hideForm');		
			const gameButtonStand = document.querySelectorAll('.hitStand')[1];
			gameButtonStand.classList.toggle('hideForm');		
			const winMessage = document.createElement('div');
			const text = document.createTextNode('Computer won');
			winMessage.appendChild(text);
			winMessage.className = 'scoreKeeper';
			document.querySelector('.game').appendChild(winMessage);				
		} else if(cpScore < 21){
			const newDisplay = elt('div', elt('p', deck[dealt].suits, ' ', deck[dealt].face.toString()));
			newDisplay.className = 'card';
			document.querySelector('.game').appendChild(newDisplay);	
			const bPlace = document.querySelector('.compCardContainer');
			bPlace.insertBefore(newDisplay, bPlace.childNodes[0]);
			compHand.push(deck[dealt]);
			cpScore = calculateScore(compHand);					
			const message = 'Computer Hand - Total: ' + cpScore;
			const myScoreKeeper = document.querySelectorAll('.scoreKeeper')[0].textContent = message;
			dealt++;
			if(cpScore > 21){
				const gameButtonHit = document.querySelectorAll('.hitStand')[0];
				gameButtonHit.classList.toggle('hideForm');		
				const gameButtonStand = document.querySelectorAll('.hitStand')[1];
				gameButtonStand.classList.toggle('hideForm');		
				const loseMessage = document.createElement('div');
				const text = document.createTextNode('Computer, lost (BUST)');
				loseMessage.appendChild(text);
				loseMessage.className = 'scoreKeeper';
				document.querySelector('.game').appendChild(loseMessage);	
			} else if(cpScore === 21){
				const gameButtonHit = document.querySelectorAll('.hitStand')[0];
				gameButtonHit.classList.toggle('hideForm');		
				const gameButtonStand = document.querySelectorAll('.hitStand')[1];
				gameButtonStand.classList.toggle('hideForm');		
				const winMessage = document.createElement('div');
				const text = document.createTextNode('Computer won');
				winMessage.appendChild(text);
				winMessage.className = 'scoreKeeper';
				document.querySelector('.game').appendChild(winMessage);	
			}
		}
	});	
}

function clickHandler(evt){
	evt.preventDefault();
	const startClass = document.querySelector('.start');
	startClass.classList.toggle('hideForm');
	const values = document.querySelector('#startValues').value;
	let inputVal = values.split(",");
	const suits = ['spade', 'club', 'heart', 'diamond'];
	const faces = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
	const deck = [];
	if(inputVal[0] === ''){
		inputVal = [];
	}	while(deck.length !== inputVal.length){
		const ran = randomizer(suits);
		let val;
		if(inputVal[deck.length] === 'A' || inputVal[deck.length] === 'K' || inputVal[deck.length] === 'Q' || inputVal[deck.length] === 'J'){
			val = inputVal[deck.length];
		}else if(inputVal[deck.length] !== 'A' || inputVal[deck.length] !== 'K' || inputVal[deck.length] !== 'Q' || inputVal[deck.length] !== 'J'){
			val = parseInt(inputVal[deck.length]);
		} 
		const tempObj = {'suits': ran, 'face':val};
		const tempArr = deck.filter(ele => {
			return (ele.suits === tempObj.suits && ele.face === tempObj.face);
		});
		if(tempArr.length === 0){
			deck.push(tempObj);
		}
	}
	const deckFull = createLeftOverDeck(suits, faces, deck);
	const compHand = [];
	const myHand = [];
	for(let i = 0; i < 4; i++){
		if(i % 2 === 0){
			compHand.push(deckFull[i]);
		} else if(i % 2 === 1){
			myHand.push(deckFull[i]);
		} 
	}
	const cpScore = calculateScore(compHand);
	const myScore = calculateScore(myHand);
	const cpTotal = elt('div', elt('p', 'Computer Hand - Total: ', cpScore.toString()));
	//const cpTotal = elt('div', elt('p', 'Computer Hand - Total: ?'));
	cpTotal.className = 'scoreKeeper';
	document.querySelector('.game').appendChild(cpTotal); 	

	createAndAppendCPHand('.game', 'div', 'p', compHand);

	const myTotal = elt('div', elt('p', 'Player Hand - Total: ', myScore.toString()));
	myTotal.className = 'scoreKeeper';
	document.querySelector('.game').appendChild(myTotal); 	

	createAndAppendHand('.game', 'div', 'p', myHand);

	const game = document.querySelector('.game');
	const hit = createButton('Hit');
	const stand = createButton('Stand'); 		
	hit.className = 'hitStand';
	stand.className = 'hitStand';
	const buttonContainer = document.createElement('div'); 
	buttonContainer.className = 'buttonContainer';
	buttonContainer.appendChild(hit);
	buttonContainer.appendChild(stand);
	document.querySelector('.game').appendChild(buttonContainer);
	play(myScore, cpScore, myHand, compHand, deckFull);
}

function main(){
	const btn = document.querySelector('.playBtn');
	btn.addEventListener('click', clickHandler);
}	
document.addEventListener('DOMContentLoaded', main);

