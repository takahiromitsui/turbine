"use client";

import { DateTimePicker } from "@/components/ui/date-time-picker/date-time-picker";
import LineGraph from "@/components/line";

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<DateTimePicker granularity={"minute"} />
      <LineGraph />
		</main>
	);
}
