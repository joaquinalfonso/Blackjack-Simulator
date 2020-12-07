
let colors = {
	wons: "#289424",
	ties: "#E1DD8F",
	losses: "#FF5A5F",
};

export function DrawPieChart(chartId, data) {
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


export function DrawSeriesChart(chartId, data) {
	var ctx = document.getElementById(chartId).getContext("2d");

	var max_of_array = Math.max.apply(Math, data.roundSerie);

	let seriesChart = new Chart(ctx, {
		type: "line",

		data: {
			labels: data.roundSerie,
			datasets: [
				{
					label: "Wons",
					fill: false,
					lineTension: 0,
					backgroundColor: colors.wons, 
					borderColor: colors.wons, 
					data: data.playerSerie,
					pointRadius: 1
				},
				{
					label: "Ties",
					fill: false,
					lineTension: 0,
					backgroundColor: colors.ties, 
					borderColor: colors.ties, 
					data: data.drawSerie,
					pointRadius: 1
				},
				{
					label: "Losses",
					fill: false,
					lineTension: 0,
					backgroundColor: colors.losses,
					borderColor: colors.losses,
					data: data.croupierSerie,
					pointRadius: 1
				}
			],
		},
		options: {
			legend: {
				display: false,
			},
			responsive: true,
			title: {
				display: false,
			},
			hover: {
				mode: "nearest",
				intersect: true
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Game'
					}
				}],
				yAxes: [{
					display: true,					
					scaleLabel: {						
						display: false,
						stacked: true,
						labelString: 'Value'
					},
					ticks: {
						beginAtZero: true,
						max: max_of_array
					}
				}]
			},			
		}
	});
}
