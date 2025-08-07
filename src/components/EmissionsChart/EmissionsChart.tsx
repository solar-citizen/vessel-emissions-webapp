'use client';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState } from 'react';

import VesselSelector from '#src/components/VesselSelector';

import { getChartOptions, useChartData, useVesselSelection } from './lib';

/**
 * React component that renders a vessel selector and an emissions deviation chart.
 * @returns The EmissionsChart component.
 */
function EmissionsChart() {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  const { selectedVessels, updateSelection } = useVesselSelection();
  const { data, error, isLoading } = useChartData(selectedVessels);

  if (error) return <div>Error loading emissions data</div>;
  if (isLoading) return <div>Loading chart data...</div>;
  if (!data) return <div>No data available</div>;

  const options = getChartOptions(data);

  const handleVesselSelection = (vesselIds: number[]) => {
    updateSelection(vesselIds);
  };

  return (
    <section className='space-y-4'>
      <VesselSelector
        availableVessels={data.availableVessels}
        selectedVessels={selectedVessels}
        onSelectionChange={handleVesselSelection}
        isOpen={isSelectorOpen}
        onToggleOpen={() => setIsSelectorOpen(open => !open)}
      />

      {data?.series?.length > 0 ? (
        <div className='bg-white p-4 rounded-lg shadow'>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      ) : (
        <p className='text-center py-8 text-gray-500'>No vessel emissions data</p>
      )}
    </section>
  );
}

export default EmissionsChart;
