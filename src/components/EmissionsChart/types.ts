import type { Options } from 'highcharts';

export type PointOptions = Options & {
  quarter: string;
};

type ChartDataPoint = {
  x: number;
  y: number;
  quarter: string;
};

type ChartSeries = {
  name: string;
  id: string;
  data: ChartDataPoint[];
};

export type ChartResponse = {
  series: ChartSeries[];
  availableVessels: Array<{ imo: number; name: string }>;
};
