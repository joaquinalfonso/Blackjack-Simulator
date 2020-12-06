export class Player {
	constructor(id, stopLimit) {
		this.id = id;
		this.hand = [];
		this.stopLimit = stopLimit;
	}

	keepPlaying(blackjack){
		var handScore = blackjack.score(this.hand);		
		return handScore <= this.stopLimit;
	}
}
