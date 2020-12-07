import { Player } from "./player.js";
import { Result } from "./result.js";
import { Dealer } from "./dealer.js";
import { Blackjack, BLACK_JACK_SCORE, GAME_RESULT_PLAYER_BLACKJACK, GAME_RESULT_PLAYER_WINS, GAME_RESULT_DRAW, GAME_RESULT_DEALER_WINS, GAME_RESULT_DEALER_BLACKJACK } from "./blackjack.js";
import { GetControlSelectedElement, SetControlSelectElement, GetControlIntegerElement, SetControlIntegerValue} from "./ui.js"
import { DrawPieChart, DrawSeriesChart} from "./chart.js";
import { TestScore } from "./blackjack.test.js";

const PLAYERS_NUMBER = 4;

const DEFAULT_PLAYER1_STOPLIMIT = 16;
const DEFAULT_PLAYER2_STOPLIMIT = 17;
const DEFAULT_PLAYER3_STOPLIMIT = 18;
const DEFAULT_PLAYER4_STOPLIMIT = 19;
const DEFAULT_GAMES_NUMBER = 100;

function PlayRounds(roundsNumber, playersLimits, printFunction) {
	let results = CreateResults(playersLimits);

	for (var i = 0; i < roundsNumber; i = i + 1) {
		console.log("Round " + (i + 1));

		let dealer = new Dealer();
		let players = CreatePlayers(playersLimits);

		let blackjack = new Blackjack(dealer, players);
		let round = blackjack.Play();

		for (var player = 0; player < players.length; player = player + 1) {

			let roundGameScore = round.scores[player];

			let playerRound = roundGameScore == GAME_RESULT_PLAYER_BLACKJACK || roundGameScore == GAME_RESULT_PLAYER_WINS ? 1 : 0;
			let playerBJRound = roundGameScore == GAME_RESULT_PLAYER_BLACKJACK ? 1 : 0;
			let drawRound = roundGameScore == GAME_RESULT_DRAW ? 1 : 0;
			let dealerRound = roundGameScore == GAME_RESULT_DEALER_WINS || roundGameScore == GAME_RESULT_DEALER_BLACKJACK ? 1 : 0;

			results[player].playerWins += playerRound;
			results[player].playerBlackJack += playerBJRound;
			results[player].draw += drawRound;
			results[player].dealerWins += dealerRound;

			
			results[player].roundSerie.push(i + 1);
			results[player].playerSerie.push(results[player].playerWins);
			results[player].playerBlackJackSerie.push(results[player].playerBlackJack);
        	results[player].drawSerie.push(results[player].draw);
        	results[player].dealerSerie.push(results[player].dealerWins);

		}

		console.log(results);

		console.log("End Round " + (i + 1));
	}

	console.table(results);

	printFunction(results);
}

function CreatePlayers(playerLimits) {
	let players = [];
	for (var i = 0; i < playerLimits.length; i = i + 1) {
		players.push(new Player(i + 1, playerLimits[i]));
	}
	return players;
}

function CreateResults(players) {
	let results = [];

	players.map(() => results.push(new Result()));

	return results;
}

function GetPlayersLimits() {
	let playerLimit1 = GetControlSelectedElement("playerLimit1");
	let playerLimit2 = GetControlSelectedElement("playerLimit2");
	let playerLimit3 = GetControlSelectedElement("playerLimit3");
	let playerLimit4 = GetControlSelectedElement("playerLimit4");

	let playersLimits = [];
	playersLimits.push(playerLimit1);
	playersLimits.push(playerLimit2);
	playersLimits.push(playerLimit3);
	playersLimits.push(playerLimit4);

	return playersLimits;
}

function PopulateSelectControls() {
	var selectPlayerLimit1 = document.getElementById("playerLimit1");
	var selectPlayerLimit2 = document.getElementById("playerLimit2");
	var selectPlayerLimit3 = document.getElementById("playerLimit3");
	var selectPlayerLimit4 = document.getElementById("playerLimit4");
	
	for (let i = 1; i <= BLACK_JACK_SCORE; i++) {
		var optionTo = document.createElement("option");
		optionTo.text = i;
		selectPlayerLimit1.add(optionTo);

		var optionTo2 = document.createElement("option");
		optionTo2.text = i;
		selectPlayerLimit2.add(optionTo2);

		var optionTo3 = document.createElement("option");
		optionTo3.text = i;
		selectPlayerLimit3.add(optionTo3);

		var optionTo4 = document.createElement("option");
		optionTo4.text = i;
		selectPlayerLimit4.add(optionTo4);
	}
}

function SetDefaultValues() {
	SetControlSelectElement("playerLimit1", DEFAULT_PLAYER1_STOPLIMIT);
	SetControlSelectElement("playerLimit2", DEFAULT_PLAYER2_STOPLIMIT);
	SetControlSelectElement("playerLimit3", DEFAULT_PLAYER3_STOPLIMIT);
	SetControlSelectElement("playerLimit4", DEFAULT_PLAYER4_STOPLIMIT);
	SetControlIntegerValue("gamesNumber", DEFAULT_GAMES_NUMBER);
}

function PrintResults(results) {
	for (let i = 0; i < PLAYERS_NUMBER; i++) {
		let won = document.getElementById("won" + (i + 1));
		let ties = document.getElementById("ties" + (i + 1));
		let losses = document.getElementById("losses" + (i + 1));

		won.innerHTML = results[i].playerWins + "<br />" + "(" + results[i].playerBlackJack + " Blackjack)";
		ties.innerHTML = results[i].draw;
		losses.innerHTML = results[i].dealerWins;

		DrawPieChart("pieChart" + (i + 1), [results[i].playerWins, results[i].draw, results[i].dealerWins]);
		DrawSeriesChart("seriesChart" + (i + 1), results[i]);
	}
}

function RunButtonClick() {
	let gamesNumber = GetControlIntegerElement("gamesNumber");
	let playersLimits = GetPlayersLimits();

	PlayRounds(gamesNumber, playersLimits, PrintResults);
}

function main() {
	PopulateSelectControls();
	SetDefaultValues();

	let runButton = document.querySelector("#RunButton");
	runButton.addEventListener("click", RunButtonClick);

	TestScore();
}



document.addEventListener("DOMContentLoaded", main);
