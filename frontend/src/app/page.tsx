'use client';

import LineGraph from '@/components/line';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BASE_URL = 'http://localhost:8000';

type TurbineData = {
	turbineID: number | null;
	startDate: Date;
	endDate: Date;
};

async function fetchTurbineData(data: TurbineData) {
	const { turbineID, startDate, endDate } = data;
	// Create new Date objects adjusted to UTC
	const utcStartDate = new Date(
		Date.UTC(
			startDate.getFullYear(),
			startDate.getMonth(),
			startDate.getDate(),
			startDate.getHours(),
			startDate.getMinutes(),
			startDate.getSeconds()
		)
	);
	const utcEndDate = new Date(
		Date.UTC(
			endDate.getFullYear(),
			endDate.getMonth(),
			endDate.getDate(),
			endDate.getHours(),
			endDate.getMinutes(),
			endDate.getSeconds()
		)
	);

	const formattedStartDate = utcStartDate.toISOString();
	const formattedEndDate = utcEndDate.toISOString();
	if (!turbineID) {
		return;
	}
	const url = `${BASE_URL}/task2/turbines/${turbineID}/?start_time=${formattedStartDate}&end_time=${formattedEndDate}`;
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.json();
}

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

	const [turbineData, setTurbineData] = useState<any>({
		data: {
			// x-axis
			labels: [],
			datasets: [
				{
					label: 'power(Leistung)',
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
	});

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
			setTurbineData({
				data: {
					labels: label,
					datasets: [
						{
							label: 'power(Leistung)',
							data: data,
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
			});
		}
	};

	return (
		<div className='flex h-screen'>
			<div className='w-1/4 bg-primary pt-4 pl-4 pr-4'>
				{/*Sidebar content*/}
				<h2 className='text-input text-2xl font-bold pb-8'>Turbine</h2>
				<ul>
					<li className='pb-24'>
						<span className='text-input'>Turbine ID</span>
						<Select onValueChange={handleTurbineID}>
							<SelectTrigger>
								<SelectValue placeholder='Select a Turbine' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Turbine ID</SelectLabel>
									<SelectItem value='1'>1</SelectItem>
									<SelectItem value='2'>2</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</li>
					<li className='pb-4'>
						<div className='flex flex-col'>
							<label className='text-input'>Start Date</label>
							{/* this should be between 01.01.2016 00:00 and 01.04.2016 00:00 */}
							<DatePicker
								className='appearance-none boarder rounded py-3 px-2 w-full'
								showTimeSelect
								minDate={new Date('2016-01-01')}
								maxDate={new Date('2016-04-01')}
								selected={selectedStartDate}
								onChange={date => setSelectedStartDate(date as Date)}
								dateFormat='dd/MM/yyyy HH:mm'
							/>
						</div>
					</li>
					<li className='pb-8'>
						<div className='flex flex-col '>
							<label className='text-input'>End Date</label>
							{/* this should be between 01.01.2016 00:00 and 01.04.2016 00:00 */}
							<DatePicker
								className='appearance-none boarder rounded py-3 px-2 w-full'
								showTimeSelect
								minDate={new Date('2016-01-01')}
								maxDate={new Date('2016-04-01')}
								selected={selectedEndDate}
								onChange={date => setSelectedEndDate(date as Date)}
								dateFormat='dd/MM/yyyy HH:mm'
							/>
						</div>
					</li>
					<li>
						<Button onClick={handleOnClick} variant={'secondary'}>
							Generate Graph
						</Button>
					</li>
				</ul>
			</div>
			<div className='flex-1 bg-background pt-4 pl-4 pr-4'>
				{/*Main content*/}
				<h1 className='text-4xl font-bold mb-4'>Graph</h1>
				<div className='px-4'>
					<LineGraph data={turbineData.data} options={turbineData.options}/>
				</div>
			</div>
		</div>
	);
}
