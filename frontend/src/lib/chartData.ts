export const chartOptions = {
	scales: {
		x: {
			title: {
				display: true,
				text: 'Wind (m/s)',
			},
		},
		y: {
			title: {
				display: true,
				text: 'Power/Leistung (kw)',
			},
		},
	},
};

export const emptyData = {
	// x-axis
	data: {
		labels: [],
		datasets: [
			{
				label: 'Power(Leistung): Turbine ID: , start - end',
				data: [],
				borderColor: 'rgb(75,192,192)',
			},
		],
	},
	options: chartOptions,
};