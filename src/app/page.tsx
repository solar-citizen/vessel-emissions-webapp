import EmissionsChart from '#src/components/EmissionsChart/EmissionsChart';

export default function Home() {
  return (
    <main className='p-4 mt-8'>
      <h1 className='text-xl mb-4'>Vessel Emissions Deviations</h1>
      <EmissionsChart />
    </main>
  );
}
