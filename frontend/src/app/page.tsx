import LineGraph from "@/components/line";

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<h1 className='text-6xl'>Welcome to my website</h1>
      <LineGraph />
		</main>
	);
}