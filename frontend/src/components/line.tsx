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

export default function LineGraph({
	data,
	options,
}: {
	data: any;
	options: any;
}) {
	return <Line data={data} options={options} />;
}
