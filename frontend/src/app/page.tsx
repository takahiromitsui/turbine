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
				<h2 className='text-white text-2xl font-bold pb-4'>Turbine</h2>
				<ul>
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
				</ul>
			</div>
			<div className='flex-1 bg-background pt-4 pl-4 pr-4'>
				{/*Main content*/}
				<h1 className='text-4xl font-bold mb-4'>Main Content: Graph Here</h1>
			</div>
		</div>
	);
}
