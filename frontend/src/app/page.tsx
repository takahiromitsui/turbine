'use client';
import { fetchTurbineData } from '@/lib/fetchTurbineData';
import Sidebar from '@/components/sidebar';
import LineGraph from '@/components/line';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

const chartOptions = {
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
	options: chartOptions,
};

export default function Home() {
	const [selectedTurbineID, setSelectedTurbineID] = useState<number | null>(
		null
	);
	const [selectedStartDate, setSelectedStartDate] = useState<Date>(
		new Date('2016-01-01 00:00')
	);
	const [selectedEndDate, setSelectedEndDate] = useState<Date>(
		new Date('2016-01-01 00:00')
	);

	const [turbineData, setTurbineData] = useState<any>(emptyData);

	const handleTurbineID = (value: string) => {
		setSelectedTurbineID(parseInt(value));
	};

	const handleOnClick = async () => {
		const res = await fetchTurbineData({
			turbineID: selectedTurbineID,
			startDate: selectedStartDate,
			endDate: selectedEndDate,
		});
		const label: number[] = [];
		const data: number[] = [];
		if (res) {
			res.forEach((item: any) => {
				label.push(item.wind);
				data.push(item.leistung);
			});
			//'dd/MM/yyyy HH:mm'
			const formattedStartDate = selectedStartDate.toLocaleString('de-DE', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			});
			const formattedEndDate = selectedEndDate.toLocaleString('de-DE', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
			});

			setTurbineData({
				data: {
					labels: label,
					datasets: [
						{
							// time range and power
							// should be like this: Power(Leistung): 01.01.2016 00:00 - 01.04.2016 00:00
							label: ` Power(Leistung): Turbine ID: ${selectedTurbineID}, ${formattedStartDate} - ${formattedEndDate}`,
							data: data,
							borderColor: 'rgb(75,192,192)',
						},
					],
				},
				options: chartOptions,
			});
		}
	};

	return (
		<div className='flex h-screen'>
			<div className='w-1/4 bg-primary pt-4 pl-4 pr-4'>
				<Sidebar
					handleTurbineID={handleTurbineID}
					handleOnClick={handleOnClick}
					selectedStartDate={selectedStartDate}
					selectedEndDate={selectedEndDate}
					setSelectedStartDate={setSelectedStartDate}
					setSelectedEndDate={setSelectedEndDate}
				/>
			</div>
			<div className='flex-1 bg-background pt-4 pl-4 pr-4'>
				{/*Main content*/}
				<h1 className='pl-4 text-4xl font-bold mb-4'>Graph</h1>
				{turbineData ? (
					<LineGraph data={turbineData.data} options={turbineData.options} />
				) : (
					<LineGraph data={emptyData.data} options={emptyData.options} />
				)}
			</div>
		</div>
	);
}
