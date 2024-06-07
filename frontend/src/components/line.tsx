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
	labels: [],
	datasets: [
		{
			label: 'power(Leistung)',
			data: [],
			borderColor: 'rgb(75,192,192)',
		},
	],
};

export default function LineGraph({ data }: { data: any }) {
	const options = {};
	if (data) {
		return <Line options={options} data={data} />;
	} else {
		return <Line options={options} data={emptyData} />;
	}
}
