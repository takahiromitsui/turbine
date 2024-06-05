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

export default function TurbineDateRangePicker() {
	const [selectedTurbineID, setSelectedTurbineID] = useState<number | null>(
		null
	);
	const handleStringToInt = (value: string) => {
		setSelectedTurbineID(parseInt(value));
	};
	return (
		<div className='flex flex-col space-y-12'>
			<Select onValueChange={handleStringToInt}>
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
			<div>
				<h3>Start Date</h3>
				<DateTimePicker granularity={'minute'} />
			</div>
			<div>
				<h3>End Date</h3>
				<DateTimePicker granularity={'minute'} />
			</div>
		</div>
	);
}
