'use client';

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

	const handleTurbineID = (value: string) => {
		setSelectedTurbineID(parseInt(value));
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
						<div className='flex flex-col '>
							<label className='text-input'>Start Date</label>
							{/* this should be between 01.01.2016 00:00 and 01.04.2016 00:00 */}
							<DatePicker
								className='appearance-none boarder rounded py-3 px-2'
								showTimeSelect
								minDate={new Date('2016-01-01')}
								maxDate={new Date('2016-04-01')}
								selected={selectedStartDate}
								onChange={date => setSelectedStartDate(date as Date)}
								dateFormat='dd/MM/yyyy HH:mm'
							/>
						</div>
					</li>
					<li>
						<div className='flex flex-col '>
							<label className='text-input'>End Date</label>
							{/* this should be between 01.01.2016 00:00 and 01.04.2016 00:00 */}
							<DatePicker
								className='appearance-none boarder rounded py-3 px-2'
								showTimeSelect
								minDate={new Date('2016-01-01')}
								maxDate={new Date('2016-04-01')}
								selected={selectedEndDate}
								onChange={date => setSelectedEndDate(date as Date)}
								dateFormat='dd/MM/yyyy HH:mm'
							/>
						</div>
					</li>
				</ul>
			</div>
			<div className='flex-1 bg-background pt-4 pl-4 pr-4'>
				{/*Main content*/}
				<h1 className='text-4xl font-bold mb-4'>Main Content: Graph Here</h1>
			</div>
		</div>
	);
}
