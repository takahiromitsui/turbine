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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
	handleTurbineID: (value: string) => void;
	handleOnClick: () => void;
	selectedStartDate: Date;
	selectedEndDate: Date;
	setSelectedStartDate: (value: Date) => void;
	setSelectedEndDate: (value: Date) => void;
};

export default function Sidebar({
	handleTurbineID,
	handleOnClick,
	selectedStartDate,
	selectedEndDate,
	setSelectedStartDate,
	setSelectedEndDate,
}: Props) {
	return (
		<>
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
		</>
	);
}
