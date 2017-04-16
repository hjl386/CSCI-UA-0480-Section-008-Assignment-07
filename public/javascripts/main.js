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
	const ele = document.createElement(type);
	for (let i = 1; i < arguments.length; i++){
		let child = arguments[i];
		if(typeof child === 'string'){
			child = document.createTextNode(child);
		}
		ele.appendChild(child);
	}
	return ele;
}
  
function createAndAppendCPHand(classType, largeType, mainType, arrHand){
	const firstDisplay = elt(largeType, elt(mainType, arrHand[0].suits, ' ', arrHand[0].face.toString()));
	const secondDisplay = elt(largeType, elt(mainType, arrHand[1].suits, ' ', arrHand[1].face.toString()));
	//const card = document.querySelectorAll('.compCardContainer')[0].querySelectorAll('.cpcard')[1];
//	const cardZ = document.querySelectorAll('.cpcard')[1];
//	cardZ.classList.toggle('revealCard');
	firstDisplay.className = 'cpcard';
	secondDisplay.className = 'cpcard';
	const handCompCard = document.createElement('div');
	handCompCard.className = 'compCardContainer'; 
	handCompCard.appendChild(firstDisplay);
	handCompCard.appendChild(secondDisplay);
	document.querySelector('.game').appendChild(handCompCard);
	//document.querySelector(classType).appendChild(firstDisplay);
	//document.querySelector(classType).appendChild(secondDisplay);
//	return secondDisplay;
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
//	let ace = 0;
	let score = hand.reduce((acc, cur) => {
//		console.log("ACC", acc, " CUR", cur);		//Test Log
		if(cur.face === 'A' && acc < 11){
//			ace++;
			return acc += 11;
		} else if(cur.face === 'A' && acc > 10){ 
//			ace++;
			return acc += 1;
		} else if(cur.face === 'J' || cur.face === 'Q' || cur.face === 'K'){
			return acc += 10;
		} else{
			return acc += parseInt(cur.face);
		}
	},0);
	const fil = hand.filter(ele => {
		return(ele.face === 'A');
	});
//	console.log("LEMNNFGHBWE", fil.length);
	fil.forEach(cur => {
		if(score > 21){
			score -= 10;
		}
	});
	return score;
}
/*
function calculateScore(hand){
	const score = hand.reduce((acc, cur) => {
		if(cur.face ==='J' || cur.face === 'Q' || cur.face === 'K'){
			return acc += 10;
		} else if(cur.face === 'A' && acc < 11){
			return acc += 11;			
		} else if(cur.face === 'A' && acc > 10){
 			return acc += 1;
		} else{
			return acc += parseInt(cur.face);
		}
	});
}
*/
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
			const message = 'Computer Hand - Total: ' + compScore;
			document.querySelectorAll('.scoreKeeper')[0].textContent = message;
			const cardZ = document.querySelectorAll('.cpcard')[1];
			cardZ.classList.toggle('revealCard');
		} else if(score < 21){
			const newDisplay = elt('div', elt('p', deck[dealt].suits, ' ', deck[dealt].face.toString()));
			newDisplay.className = 'card';
			document.querySelector('.game').appendChild(newDisplay);	
			const bPlace = document.querySelector('.myCardContainer');
			bPlace.insertBefore(newDisplay, bPlace.childNodes[0]);
			hand.push(deck[dealt]);
			score = calculateScore(hand);					
			const message = 'Player Hand - Total: ' + score;
			document.querySelectorAll('.scoreKeeper')[1].textContent = message;
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
				const message = 'Computer Hand - Total: ' + compScore;
				document.querySelectorAll('.scoreKeeper')[0].textContent = message;
				const cardZ = document.querySelectorAll('.cpcard')[1];
				cardZ.classList.toggle('revealCard');
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
				const message = 'Computer Hand - Total: ' + compScore;
				document.querySelectorAll('.scoreKeeper')[0].textContent = message;
				const cardZ = document.querySelectorAll('.cpcard')[1];
				cardZ.classList.toggle('revealCard');
			}
		}
	});
	let cpScore = compScore; 
	const btnStand = document.querySelectorAll('.hitStand')[1];
	btnStand.addEventListener('click', evt => {
		evt.preventDefault();
		if(cpScore === 21 && score !== 21){
			const gameButtonHit = document.querySelectorAll('.hitStand')[0];
			gameButtonHit.classList.toggle('hideForm');		
			const gameButtonStand = document.querySelectorAll('.hitStand')[1];
			gameButtonStand.classList.toggle('hideForm');		
			const winMessage = document.createElement('div');
			const text = document.createTextNode('Computer won');
			winMessage.appendChild(text);
			winMessage.className = 'scoreKeeper';
			document.querySelector('.game').appendChild(winMessage);				
			const message = 'Computer Hand - Total: ' + cpScore;
			document.querySelectorAll('.scoreKeeper')[0].textContent = message;
			const cardZ = document.querySelectorAll('.cpcard')[1];
			cardZ.classList.toggle('revealCard');
		} else if(cpScore < 17){
			const displayCP = [];
			while(cpScore < 17){
				const newDisplay = elt('div', elt('p', deck[dealt].suits, ' ', deck[dealt].face.toString()));
				newDisplay.className = 'cpcard';
				compHand.push(deck[dealt]);
				displayCP.push(newDisplay);
				cpScore = calculateScore(compHand);
				dealt++;
				if(cpScore === 21){
					for (let i = 0; i < displayCP.length; i++){
				//		const bPlace = document.querySelector('.compCardContainer');
				//		bPlace.insertBefore(document.querySelector('.game').appendChild(displayCP[i]), bPlace.childNodes[0]);
						const bPlace = document.querySelectorAll('.scoreKeeper')[1];
						const ga = document.querySelector('.game');
						ga.insertBefore(displayCP[i], bPlace);
						const message = 'Computer Hand - Total: ' + cpScore;
						document.querySelectorAll('.scoreKeeper')[0].textContent = message;
					}	
					const gameButtonHit = document.querySelectorAll('.hitStand')[0];
					gameButtonHit.classList.toggle('hideForm');		
					const gameButtonStand = document.querySelectorAll('.hitStand')[1];
					gameButtonStand.classList.toggle('hideForm');		
					const winMessage = document.createElement('div');
					const text = document.createTextNode('Computer won');
					winMessage.appendChild(text);
					winMessage.className = 'scoreKeeper';
					document.querySelector('.game').appendChild(winMessage);				
					const message = 'Computer Hand - Total: ' + cpScore;
					document.querySelectorAll('.scoreKeeper')[0].textContent = message;
					const cardZ = document.querySelectorAll('.cpcard')[1];
					cardZ.classList.toggle('revealCard');

		/*			for(let i = 1; i < compHand.length; i++){
						const cardZ = document.querySelectorAll('.cpcard')[i];
						cardZ.classList.toggle('revealCard');
					}*/
				} else if(cpScore > 21){
					for (let i = 0; i < displayCP.length; i++){
						const bPlace = document.querySelectorAll('.scoreKeeper')[1];
						const ga = document.querySelector('.game');
						ga.insertBefore(displayCP[i], bPlace);
						//const bPlace = document.querySelector('.compCardContainer');
						//bPlace.insertBefore(document.querySelector('.game').appendChild(displayCP[i]), bPlace.childNodes[0]);
						const message = 'Computer Hand - Total: ' + cpScore;
						document.querySelectorAll('.scoreKeeper')[0].textContent = message;
					}	
					const gameButtonHit = document.querySelectorAll('.hitStand')[0];
					gameButtonHit.classList.toggle('hideForm');		
					const gameButtonStand = document.querySelectorAll('.hitStand')[1];
					gameButtonStand.classList.toggle('hideForm');		
					const loseMessage = document.createElement('div');
					const text = document.createTextNode('Computer, lost (BUST)');
					loseMessage.appendChild(text);
					loseMessage.className = 'scoreKeeper';
					document.querySelector('.game').appendChild(loseMessage);	
					const message = 'Computer Hand - Total: ' + cpScore;
					document.querySelectorAll('.scoreKeeper')[0].textContent = message;
					const cardZ = document.querySelectorAll('.cpcard')[1];
					cardZ.classList.toggle('revealCard');
	/*	for(let i = 1; i < compHand.length; i++){
						const cardZ = document.querySelectorAll('.cpcard')[i];
						cardZ.classList.toggle('revealCard');
					}*/
				}
			}
			for (let i = 0; i < displayCP.length; i++){
				const bPlace = document.querySelectorAll('.scoreKeeper')[1];
				const ga = document.querySelector('.game');
				ga.insertBefore(displayCP[i], bPlace);
				const message = 'Computer Hand - Total: ' + cpScore;
				document.querySelectorAll('.scoreKeeper')[0].textContent = message;
			}
		} 
		if(cpScore > score && cpScore <= 21){
			const gameButtonHit = document.querySelectorAll('.hitStand')[0];
			gameButtonHit.classList.toggle('hideForm');		
			const gameButtonStand = document.querySelectorAll('.hitStand')[1];
			gameButtonStand.classList.toggle('hideForm');		
			const winMessage = document.createElement('div');
			const text = document.createTextNode('Computer won');
			winMessage.appendChild(text);
			winMessage.className = 'scoreKeeper';
			document.querySelector('.game').appendChild(winMessage);	
			const message = 'Computer Hand - Total: ' + cpScore;
			document.querySelectorAll('.scoreKeeper')[0].textContent = message;
			const cardZ = document.querySelectorAll('.cpcard')[1];
			cardZ.classList.toggle('revealCard');
		} else if(score > cpScore && score <= 21){
			const gameButtonHit = document.querySelectorAll('.hitStand')[0];
			gameButtonHit.classList.toggle('hideForm');		
			const gameButtonStand = document.querySelectorAll('.hitStand')[1];
			gameButtonStand.classList.toggle('hideForm');		
			const winMessage = document.createElement('div');
			const text = document.createTextNode('Player won');
			winMessage.appendChild(text);
			winMessage.className = 'scoreKeeper';
			document.querySelector('.game').appendChild(winMessage);	
			const message = 'Computer Hand - Total: ' + cpScore;
			document.querySelectorAll('.scoreKeeper')[0].textContent = message;
			const cardZ = document.querySelectorAll('.cpcard')[1];
			cardZ.classList.toggle('revealCard');
		} else if(score === cpScore){
			const gameButtonHit = document.querySelectorAll('.hitStand')[0];
			gameButtonHit.classList.toggle('hideForm');		
			const gameButtonStand = document.querySelectorAll('.hitStand')[1];
			gameButtonStand.classList.toggle('hideForm');		
			const tieMessage = document.createElement('div');
			const text = document.createTextNode('The Game Is A Tie');
			tieMessage.appendChild(text);
			tieMessage.className = 'scoreKeeper';
			document.querySelector('.game').appendChild(tieMessage);	
			const message = 'Computer Hand - Total: ' + cpScore;
			document.querySelectorAll('.scoreKeeper')[0].textContent = message;
			const cardZ = document.querySelectorAll('.cpcard')[1];
			cardZ.classList.toggle('revealCard');
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
//	const cpTotal = elt('div', elt('p', 'Computer Hand - Total: ', cpScore.toString()));
	const cpTotal = elt('div', elt('p', 'Computer Hand - Total: ?'));
	cpTotal.className = 'scoreKeeper';
	document.querySelector('.game').appendChild(cpTotal); 	

	createAndAppendCPHand('.game', 'div', 'p', compHand);
	const cardZ = document.querySelectorAll('.cpcard')[1];
	cardZ.classList.toggle('revealCard');

	const myTotal = elt('div', elt('p', 'Player Hand - Total: ', myScore.toString()));
	myTotal.className = 'scoreKeeper';
	document.querySelector('.game').appendChild(myTotal); 	

	createAndAppendHand('.game', 'div', 'p', myHand);

//	const game = document.querySelector('.game');
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

