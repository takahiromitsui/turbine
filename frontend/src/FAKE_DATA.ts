//graph of power output against wind speed for a wind turbine, the x-axis would be wind speed and the y-axis would be power output.

//it seems like the "wind" key corresponds to wind speed (in m/s) and the "leistung" key corresponds to power output (in kW). So, you would use "wind" for the x-axis and "leistung" for the y-axis.

export const lineChartData = {
	// x-axis
	labels: [5.8, 5.8, 5.8, 6.4, 6.9],
	datasets: [
		{
			label: 'power(Leistung)',
			data: [268.5, 268.5, 272.1, 320.1, 457.4],
			borderColor: 'rgb(75,192,192)',
		},
	],
};
