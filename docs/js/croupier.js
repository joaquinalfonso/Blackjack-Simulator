import { CROUPIER_STOP_LIMIT } from "./blackjack.js"

export class Croupier{

	constructor() {
		this.hand = [];
		this.stopLimit = CROUPIER_STOP_LIMIT;
	}

	shuffle(deck){
		deck.cards.sort(function(a, b){return 0.5 - Math.random()});
	}

	dealCard(deck, person) {	
		/* Insertar la primera carta de la baraja en la mano de la persona */
		person.hand.push(deck.cards[0]);		
		/* Elimina de la baraja la primera carta */
		deck.cards.shift();	
	}
	
	keepPlaying(blackjack){	
		/* El croupier debe pedir cartas hasta que llegue a 17 */	
		var score = blackjack.score(this.hand);	
		return score <= this.stopLimit;		
	}

}
