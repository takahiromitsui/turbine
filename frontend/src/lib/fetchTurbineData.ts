const BASE_URL = 'http://localhost:8000';

type TurbineData = {
	turbineID: number | null;
	startDate: Date;
	endDate: Date;
};

function formatDateToUTC(date: Date) {
	const [year, month, day, hours, minutes, seconds] = [
		date.getUTCFullYear(),
		date.getUTCMonth(),
		date.getUTCDate(),
		date.getUTCHours(),
		date.getUTCMinutes(),
		date.getUTCSeconds(),
	];
	return new Date(
		Date.UTC(year, month, day, hours, minutes, seconds)
	).toISOString();
}

export async function fetchTurbineData(data: TurbineData) {
	const { turbineID, startDate, endDate } = data;

	const formattedStartDate = formatDateToUTC(startDate);
	const formattedEndDate = formatDateToUTC(endDate);

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
