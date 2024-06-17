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
	const [selectedTurbineID, setSelectedTurbineID] = useState<number | null>(1);
	const [selectedStartDate, setSelectedStartDate] = useState<Date>(
		new Date('2016-01-01 00:00')
	);
	const [selectedEndDate, setSelectedEndDate] = useState<Date>(
		new Date('2016-01-01 00:10')
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
				title: 'Please select a valid turbine ID.',
				description: 'The turbine ID should be a number.',
				action: <ToastAction altText='Try again'>Try again</ToastAction>,
			});
			return false;
		}
		if (selectedStartDate >= selectedEndDate) {
			toast({
				variant: 'destructive',
				title: 'Please select a valid date range.',
				description: 'The end date should be greater than the start date.',
				action: <ToastAction altText='Try again'>Try again</ToastAction>,
			});
			return false;
		}
		toast({
			title: 'Data is being fetched.',
			description: 'Please wait a moment.',
		})
		return true;
	};

	const handleFetchData = async () => {
		try {
			const res = await fetchTurbineData({
				turbineID: selectedTurbineID,
				startDate: selectedStartDate,
				endDate: selectedEndDate,
			});
			return res;
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'An error occurred while fetching data.',
				description: 'Please check your internet connection and try again.',
				action: <ToastAction altText='Try again'>Try again</ToastAction>,
			});
			return null;
		}
	};

	const handleSetTurbineData = (res: any) => {
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

	const handleOnClick = async () => {
		const isInputValid = handleToast();
    if (!isInputValid) {
        return;
    }
		const res = await handleFetchData();
		if (res) {
			handleSetTurbineData(res);
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
