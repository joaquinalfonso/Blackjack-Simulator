import { ACE_CARD, J_CARD, Q_CARD, K_CARD } from "./deck.js"
import { Blackjack, BLACK_JACK_SCORE, ACE_SCORE, JQK_SCORE, GAME_RESULT_PLAYER_BLACKJACK, GAME_RESULT_PLAYER_WINS, GAME_RESULT_DRAW, GAME_RESULT_CROUPIER_WINS, GAME_RESULT_CROUPIER_BLACKJACK } from "./blackjack.js";

let aceCard = {"suit" : "Test",	"rank"  : ACE_CARD} ;
let jCard = {"suit" : "Test",	"rank"  : J_CARD} ;
let sevenCard = {"suit" : "Test",	"rank"  : 7} ;

export function TestScore(){
   
    console.log("Testing score...");

    let blackjack = new Blackjack(null, []);

    let hand = [];

    hand.length=0;
    hand.push(aceCard);
    console.log(blackjack.score(hand)===(ACE_SCORE) ? "OK" : "ERROR");

    hand.length=0;
    hand.push(aceCard);        
    hand.push(aceCard);
    console.log(blackjack.score(hand)===(ACE_SCORE+1) ? "OK" : "ERROR");

    hand.length=0;
    hand.push(aceCard);        
    hand.push(jCard);
    console.log(blackjack.score(hand)===BLACK_JACK_SCORE ? "OK" : "ERROR");

    hand.length=0;
    hand.push(aceCard);
    hand.push(aceCard);
    hand.push(jCard);
    console.log(blackjack.score(hand)===(1+1+JQK_SCORE) ? "OK" : "ERROR");

    hand.length=0;
    hand.push(aceCard);
    hand.push(aceCard);
    hand.push(jCard);
    hand.push(aceCard);
    console.log(blackjack.score(hand)===(1+1+JQK_SCORE+1) ? "OK" : "ERROR");

    hand.length=0;
    hand.push(aceCard);
    hand.push(aceCard);
    hand.push(jCard);
    hand.push(aceCard);
    hand.push(sevenCard);
    console.log(blackjack.score(hand)===(1+1+JQK_SCORE+1+7) ? "OK" : "ERROR");

}