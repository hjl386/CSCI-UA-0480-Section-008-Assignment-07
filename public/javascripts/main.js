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

function clickHandler(evt){
	evt.preventDefault();
	const startClass = document.querySelector('.start');
	startClass.classList.toggle('hideForm');
	const values = document.querySelector('#startValues').value;
	const inputVal = values.split(",");
	const suits = ['spade', 'club', 'heart', 'diamond'];
	const faces = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
	const deck = [];
	if(inputVal.length !== 0){
		while(deck.length !== inputVal.length){
			const ran = randomizer(suits);
			const tempObject = {'suits' : ran, 'face' : inputVal[deck.length]};
			const tempArr = deck.filter(ele => {
				return (ele['suits'] === tempObject['suits'] && ele['face'] === tempObject['face']);
			});
			if(tempArr.length === 0){
				deck.push(tempObject);
			}
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
	const compHandDisplay = elt('ul', elt('li', compHand[0].suits), elt('li', compHand[0].face.toString()), elt('li', compHand[1].suits), elt('li', compHand[1].face.toString()));
	const myHandDisplay = elt('ul', elt('li', myHand[0].suits), elt('li', myHand[0].face.toString()), elt('li', myHand[1].suits), elt('li', myHand[1].face.toString()));
	document.querySelector('.game').appendChild(compHandDisplay);
	document.querySelector('.game').appendChild(myHandDisplay);	
}

function main(){
	const btn = document.querySelector('.playBtn');
	btn.addEventListener('click', clickHandler);
}	
document.addEventListener('DOMContentLoaded', main);

