//Main.js 
function randomizer(array){
	const ran = Math.floor(Math.random() * array.length);	
	const val = array[ran];	
//	console.log("RAN", val);
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
	return deckFull;
}
	
function elt(type){
	var ele = document.createElement(type);
	//ele.className = 'card';
	for (var i = 1; i < arguments.length; i++){
		var child = arguments[i];
		if(typeof child === 'string'){
			child = document.createTextNode(child);
		}
		ele.appendChild(child);
	}
	return ele;
}
 
function createAndAppendHand(classType, largeType, mainType, arrHand){
	const handDisplay = elt(largeType, elt(mainType, arrHand[0].suits, ' ', arrHand[0].face.toString(), '     ', arrHand[1].suits, ' ', arrHand[1].face.toString()));
	document.querySelector(classType).appendChild(handDisplay);	
}

function calculateScore(hand){
	const score = hand.reduce((acc, cur) => {
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
	return score;
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
	} /*
	inputVal.forEach(val => {
		let check = true;
		while(check){
			const ran = randomizer(suits);
			const tempObj = {'suits': ran, 'face': val};
			const tempArr = deck.filter(ele => {
				return (ele.suits === ran && ele.face === val);
			});
			if(tempArr.length === 0){
				deck.push(tempObj);
				check = false;
			} else{
				check = true;
			}
		}	
	}); */
	while(deck.length !== inputVal.length){
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
	deckFull.forEach(ele => {
		console.log(ele);
	});
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
	document.querySelector('.game').appendChild(cpTotal); 	
	createAndAppendHand('.game', 'div', 'p', compHand);
	const myTotal = elt('div', elt('p', 'Player Hand - Total: ', myScore.toString()));
	document.querySelector('.game').appendChild(myTotal); 	
	createAndAppendHand('.game', 'div', 'p', myHand);
	const game = document.querySelector('.game');
//	game.classList.toggle('card');
}

function main(){
	const btn = document.querySelector('.playBtn');
	btn.addEventListener('click', clickHandler);
}	
document.addEventListener('DOMContentLoaded', main);

