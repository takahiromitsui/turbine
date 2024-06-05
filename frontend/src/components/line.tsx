'use client';
import { lineChartData } from '@/FAKE_DATA';
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

export default function LineGraph() {
	const options = {};
	// const data = {};
	return <Line options={options} data={lineChartData} />;
}
