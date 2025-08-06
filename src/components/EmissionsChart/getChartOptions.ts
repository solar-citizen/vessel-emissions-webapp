import type { Options } from 'highcharts';

import type { ChartResponse, PointOptions } from './types';

/**
 * Builds Highcharts options for rendering vessel emissions deviation over time.
 * @param {ChartResponse} data - Chart data including series points and metadata.
 * @returns {Options} Configuration object for Highcharts.
 */
export function getChartOptions(data: ChartResponse): Options {
  return {
    title: {
      text: 'Vessel Emissions Deviation from Poseidon Principles Baseline',
    },
    xAxis: {
      type: 'datetime',
      title: { text: 'Quarter' },
    },
    yAxis: {
      title: { text: 'Deviation (%)' },
      plotLines: [
        {
          value: 0,
          color: '#FF0000',
          dashStyle: 'Dash',
          width: 2,
          label: { text: 'PP Baseline' },
        },
      ],
    },
    tooltip: {
      shared: true,
      formatter: function () {
        const pts = this.points || [];
        if (pts.length === 0) return '';
        const header = `<b>${(pts[0].options as PointOptions).quarter}</b><br/>`;
        const body = pts
          .map(
            p =>
              `<span style=\"color:${p.color}\">${p.series.name}</span>: ` +
              `<b>${p.y?.toFixed(2)}%</b>`,
          )
          .join('<br/>');
        return header + body;
      },
    },
    series: data.series.map(series => ({
      ...series,
      type: 'line',
    })),
    plotOptions: {
      line: {
        marker: { enabled: true, radius: 4 },
      },
    },
    legend: {
      enabled: data.series.length > 1,
    },
  };
}
