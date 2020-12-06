const CLUBS_SUIT = "Clubs";
const DIAMONDS_SUIT = "Diamonds";
const HEARTS_SUIT = "Hearts";
const SPADES_SUIT = "Spades";

export const ACE_CARD = "A";
export const J_CARD = "J";
export const Q_CARD = "Q";
export const K_CARD = "K";

export class Deck {
	constructor(){
		this.cards = [];

		var suits = [CLUBS_SUIT, DIAMONDS_SUIT, HEARTS_SUIT, SPADES_SUIT];
		var ranks = [ACE_CARD, 2, 3, 4, 5, 6, 7, 8, 9, 10, J_CARD, Q_CARD, K_CARD];
		for(var i in suits) {
			for(var j in ranks) {
				this.cards.push({ 
						"suit" : suits[i],	"rank"  : ranks[j]
					});
			}
		}
	}
}
