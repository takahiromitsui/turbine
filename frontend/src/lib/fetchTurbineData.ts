const BASE_URL = 'http://localhost:8000';

type TurbineData = {
	turbineID: number | null;
	startDate: Date;
	endDate: Date;
};

function formatToGermanISO(date: Date): string {
	const [year, month, day, hours, minutes, seconds, milliseconds] = [
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
		date.getMilliseconds(),
	];

	// Pad with zeros
	const paddedMonth = month.toString().padStart(2, '0');
	const paddedDay = day.toString().padStart(2, '0');
	const paddedHours = hours.toString().padStart(2, '0');
	const paddedMinutes = minutes.toString().padStart(2, '0');
	const paddedSeconds = seconds.toString().padStart(2, '0');
	const paddedMilliseconds = milliseconds.toString().padStart(3, '0');

	return `${year}-${paddedMonth}-${paddedDay}T${paddedHours}:${paddedMinutes}:${paddedSeconds}.${paddedMilliseconds}`;
}

export async function fetchTurbineData(data: TurbineData) {
	const { turbineID, startDate, endDate } = data;

	const formattedStartDate = formatToGermanISO(startDate);
	const formattedEndDate = formatToGermanISO(endDate);

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
