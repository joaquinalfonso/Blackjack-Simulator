import { Deck } from "./deck.js"
import { Round } from "./round.js"

import { ACE_CARD, J_CARD, Q_CARD, K_CARD } from "./deck.js"

export const BLACK_JACK_SCORE = 21;
export const ACE_SCORE = 11;
export const JQK_SCORE = 10;

export const GAME_RESULT_PLAYER_BLACKJACK = 2;
export const GAME_RESULT_PLAYER_WINS = 1;
export const GAME_RESULT_TIE = 0;
export const GAME_RESULT_DEALER_WINS = -1;
export const GAME_RESULT_DEALER_BLACKJACK = -2;

export const DEALER_STOP_LIMIT = 16;

export class Blackjack {

    constructor(dealer, players){
        this.dealer = dealer;
        this.players = players;        
    }
    
    Play(){

        let deck = new Deck();
        this.dealer.shuffle(deck);

        //console.log("Start");

        // Initial cards deal 
        this.players.map(player => {
            this.dealer.dealCard(deck, player);
            this.dealer.dealCard(deck, player);
        })

        this.dealer.dealCard(deck, this.dealer);
        
        //Ask for cards
        this.players.map(player => {
            while(player.keepPlaying(this)){ 		
                this.dealer.dealCard(deck, player);		
            }
        });
       
        while(this.dealer.keepPlaying(this)){ 		
            this.dealer.dealCard(deck, this.dealer);		
        }
        
        // Get results
        let gameResults = this.GetGameResults(this.players);

        let round = new Round(this.dealer, this.players, gameResults);
        return round;
    }

    GetGameResults(players) {
        let gameResults = [];

        this.players.map(player => {
            let gameResult = this.evaluateHands(player.hand, this.dealer.hand);
            console.log("Game result : " + (gameResult));
            gameResults.push(gameResult);           
        });

        return gameResults;
    }

	
	evaluateHands(playerHand, dealerHand) {
			
		var playerScore = this.score(playerHand);
		var coupierScore = this.score(dealerHand);
        
        console.log("Player hand: " + this.readCards(playerHand));
        console.log("dealer hand: " + this.readCards(dealerHand));

        /* Si el valor de la mano del jugador excede los 21 puntos, éste pierde de manera automática. 
           Si no se ha pasado y su puntuación supera a la del crupier, gana en una proporción 1 a 1. 
           Si empata a puntos con el crupier, recupera su apuesta inicial. 
           Si el jugador gana al crupier con un blackjack, recibe un pago de 3 a 2. */

        if (playerScore > BLACK_JACK_SCORE) {
            return GAME_RESULT_DEALER_WINS;
        }
        
        if (playerScore === coupierScore) {
            return GAME_RESULT_TIE;
        }
        
        if (playerScore === BLACK_JACK_SCORE) {
            return GAME_RESULT_PLAYER_BLACKJACK;
        }
        
        if (playerScore > coupierScore) {
            return GAME_RESULT_PLAYER_WINS;
        }

        if (coupierScore > BLACK_JACK_SCORE) {
            return GAME_RESULT_PLAYER_WINS;
        }    

        return GAME_RESULT_DEALER_WINS;

    }
    
    score(hand){
		var total = 0;		
		var acesNumber = 0;
		
        /* Sum all cards but Aces cards */
        hand.map(card => {
            if(card.rank === ACE_CARD){
				acesNumber += 1;
            }
			else if(card.rank === J_CARD || card.rank === Q_CARD || card.rank === K_CARD ){
				total = total + JQK_SCORE;
			}
			else{
				total = total + card.rank;
			}
        });
        
        /* Sum only Aces cards */
        hand.filter(card => card.rank === ACE_CARD).map(() => {
            acesNumber = acesNumber - 1;				
            if((total + ACE_SCORE <= BLACK_JACK_SCORE) && (acesNumber === 0))	{
                total = total + ACE_SCORE;
            }
            else {
                total = total + 1;
            }
        })
	
		return total;
	}

	readCards(hand) {
		var cards = "";
		var score = this.score(hand);
        
        cards = hand.map(card => card.rank + ' ' + card.suit).join(",");
		cards = "["+cards+"]" + " Score: " + score;
		
		return cards;
	}    

    


}