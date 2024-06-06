'use client';

import { DateTimePicker } from '@/components/ui/date-time-picker/date-time-picker';
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

export default function Home() {
	const [selectedTurbineID, setSelectedTurbineID] = useState<number | null>(
		null
	);

	const handleTurbineID = (value: string) => {
		setSelectedTurbineID(parseInt(value));
	};
	console.log(selectedTurbineID);

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
						<span className='text-input'>Start Date</span>
						<DateTimePicker granularity={'minute'} />
					</li>
					<li>
						<span className='text-input'>End Date</span>
						<DateTimePicker granularity={'minute'} />
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
