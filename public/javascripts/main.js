//Main.js 

function main(){
	const btn = document.querySelector('.playBtn');
	btn.addEventListener('click', clickHandler);
}	

function randomizer(array){
	const ran = Math.floor(Math.random() * array.length);	
	const val = array[ran];
	return val;
}


function createLeftOverDeck(arrSuit, arrFace, deck){
	let deckFull = [...deck];
	while(deckFull.length !== 52){
		let ranSuit = randomizer(arrSuit);
		let ranFace = randomizer(arrFace);
		let tempObject = {'suits' : ranSuit, 'face' : ranFace};		
		const tempArr = deckFull.filter((ele, index) => {
			return (ele['suits'] === tempObject['suits'] && ele['face'] === tempObject['face']);
		});
		if(tempArr.length === 0){
			deckFull.push(tempObject);
		}
	}
	return deckFull;
}
	
function clickHandler(evt){
	evt.preventDefault();
/*	this.classList.toggle('hideForm');
	const startValue = document.querySelector('#startValues');
	startValue.classList.toggle('hideForm');
	const labelStartValue = document.querySelector('label[for="startValues"]');
	labelStartValue.classList.toggle('hideForm');
*/
	const startClass = document.querySelector('.start');
	startClass.classList.toggle('hideForm');
	const values = document.querySelector('#startValues').value;
	const inputVal = values.split(",");
	const suits = ['spade', 'club', 'heart', 'diamond'];
	const faces = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
	const deck = [];
	while(deck.length !== inputVal.length){
		let ran = randomizer(suits);
		let tempObject = {'suits' : ran, 'face' : inputVal[deck.length]};
		const tempArr = deck.filter((ele, index) => {
			return (ele['suits'] === tempObject['suits'] && ele['face'] === tempObject['face']);
		});
		if(tempArr.length === 0){
			deck.push(tempObject);
		}
	}
	const deckFull = createLeftOverDeck(suits, faces, deck);
}

document.addEventListener('DOMContentLoaded', main);

