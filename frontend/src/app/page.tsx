'use client';
import { extractDataFromResponse, formatDate } from '@/lib/utils';
import { fetchTurbineData } from '@/lib/fetchTurbineData';
import { chartOptions, emptyData } from '@/lib/chartData';
import Sidebar from '@/components/sidebar';
import LineGraph from '@/components/line';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

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
	const { toast } = useToast();

	const handleTurbineID = (value: string) => {
		setSelectedTurbineID(parseInt(value));
	};
	const handleToast = () => {
		if (!selectedTurbineID) {
			toast({
				variant: 'destructive',
				title: 'Please select a turbine ID.',
				description: 'You must select a turbine ID to proceed.',
				action: <ToastAction altText='Try again'>Try again</ToastAction>,
			});
			return;
		}
		if (selectedStartDate >= selectedEndDate) {
			toast({
				variant: 'destructive',
				title: 'Please select a valid date range.',
				description: 'The end date should be greater than the start date.',
				action: <ToastAction altText='Try again'>Try again</ToastAction>,
			});
			return;
		}
	};

	const handleOnClick = async () => {
		handleToast();
		const res = await fetchTurbineData({
			turbineID: selectedTurbineID,
			startDate: selectedStartDate,
			endDate: selectedEndDate,
		});
		if (res) {
			const { label, data } = extractDataFromResponse(res);
			const formattedStartDate = formatDate(selectedStartDate);
			const formattedEndDate = formatDate(selectedEndDate);

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
