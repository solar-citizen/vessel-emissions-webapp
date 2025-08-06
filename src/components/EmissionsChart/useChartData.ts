'use client';
import useSWR from 'swr';

import { ChartResponse } from './types';

const fetcher = (url: string) => fetch(url).then(res => res.json());

/**
 * Custom hook to fetch chart data for vessel emissions.
 *
 * @param {number[]} [selectedVesselIds] - Optional array of vessel IMO numbers to filter data.
 *
 * @property {ChartResponse | undefined} data - The fetched chart data, or undefined if loading.
 * @property {Error | undefined} error - Error object if the fetch failed.
 * @property {boolean} isLoading - Indicates whether the data is currently being loaded.
 * @property {() => Promise<ChartResponse>} refresh
 * Function to manually revalidate and refetch the data.
 *
 * @returns Chart data state and utilities.
 */
export function useChartData(selectedVesselIds?: number[]) {
  const vesselQuery = selectedVesselIds?.length ? `?vesselIds=${selectedVesselIds.join(',')}` : '';

  const { data, error, mutate } = useSWR<ChartResponse, Error>(
    `/api/emissions/chart-data${vesselQuery}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000,
    },
  );

  return {
    data,
    error,
    isLoading: !error && !data,
    refresh: mutate,
  };
}
