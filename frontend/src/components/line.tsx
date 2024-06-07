'use client';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	LinearScale,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	LinearScale
);

const emptyData = {
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
	options: {
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
	},
};

export default function LineGraph({
	data,
	options,
}: {
	data: any;
	options: any;
}) {
	if (data) {
		return <Line options={options} data={data} />;
	} else {
		return <Line options={emptyData.options} data={emptyData.data} />;
	}
}
