import { Player } from "./player.js";
import { Result } from "./result.js";
import { Croupier } from "./croupier.js";
import { Blackjack, BLACK_JACK_SCORE, GAME_RESULT_PLAYER_BLACKJACK, GAME_RESULT_PLAYER_WINS, GAME_RESULT_DRAW, GAME_RESULT_CROUPIER_WINS, GAME_RESULT_CROUPIER_BLACKJACK } from "./blackjack.js";

const DEFAULT_PLAYER1_STOPLIMIT = 16;
const DEFAULT_PLAYER2_STOPLIMIT = 17;
const DEFAULT_PLAYER3_STOPLIMIT = 18;
const DEFAULT_PLAYER4_STOPLIMIT = 19;
const DEFAULT_GAMES_NUMBER = 100;

let colors = {
	wons: "#289424",
	ties: "#E1DD8F",
	losses: "#FF5A5F",
};

function PlayRounds(roundsNumber, playersLimits, printFunction) {
	let results = CreateResults(playersLimits);

	for (var i = 0; i < roundsNumber; i = i + 1) {
		console.log("Round " + (i + 1));

		let croupier = new Croupier();
		let players = CreatePlayers(playersLimits);

		let blackjack = new Blackjack(croupier, players);
		let round = blackjack.Play();

		for (var player = 0; player < players.length; player = player + 1) {
			let roundGameScore = round.scores[player];

			results[player].croupierWins += roundGameScore == GAME_RESULT_CROUPIER_WINS || roundGameScore == GAME_RESULT_CROUPIER_BLACKJACK ? 1 : 0;
			results[player].playerWins += roundGameScore == GAME_RESULT_PLAYER_BLACKJACK || roundGameScore == GAME_RESULT_PLAYER_WINS ? 1 : 0;
			results[player].playerBlackJack += roundGameScore == GAME_RESULT_PLAYER_BLACKJACK ? 1 : 0;
			results[player].draw += roundGameScore == GAME_RESULT_DRAW ? 1 : 0;
		}

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
	for (let i = 0; i < 4; i++) {
		let won = document.getElementById("won" + (i + 1));
		let ties = document.getElementById("ties" + (i + 1));
		let losses = document.getElementById("losses" + (i + 1));

		won.innerHTML = results[i].playerWins + " (" + results[i].playerBlackJack + " Blackjack)";
		ties.innerHTML = results[i].draw;
		losses.innerHTML = results[i].croupierWins;

		DrawPieChart("pieChart" + (i + 1), [results[i].playerWins, results[i].draw, results[i].croupierWins]);
	}
}

function GetControlSelectedElement(id) {
	var selectControl = document.getElementById(id);
	return selectControl.options[selectControl.selectedIndex].value;
}

function SetControlSelectElement(id, valueToSelect) {
	let element = document.getElementById(id);
	element.value = valueToSelect;
}

function GetControlIntegerElement(id) {
	var control = document.getElementById(id);
	return control.value;
}

function SetControlIntegerValue(id, value) {
	var control = document.getElementById(id);
	control.value = value;
}

function DrawPieChart(chartId, data) {
	var ctx = document.getElementById(chartId).getContext("2d");

	var config = {
		type: "pie",
		data: {
			datasets: [
				{
					data: [data[0], data[1], data[2]],
					backgroundColor: [colors.wons, colors.ties, colors.losses],
					label: "Dataset 1",
				},
			],
			labels: ["Wons", "Ties", "Losses"],
		},
		options: {
			legend: {
				display: false,
			},
			responsive: true,
			animation: false,
		},
	};

	let pieChart = new Chart(ctx, config);
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

	test();
}

function test() {
	let blackjack = new Blackjack(null, []);
	blackjack.test();
}

document.addEventListener("DOMContentLoaded", main);
