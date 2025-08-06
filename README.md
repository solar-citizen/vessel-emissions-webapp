# Vessel Emissions Web Application (NextJS + Highcharts)

## Overview

The web application fetches deviation data from the server and renders interactive charts.

## Tech Stack

- NextJS
- Highcharts
- SWR for data fetching
- TailwindCSS for styling

## Prerequisites

- Node.js v18+ and npm

## Setup

If you didn't create main folder:

```bash
mkdir vessel-emissions
cd vessel-emissions
```

Else:

```bash
cd vessel-emissions
git clone https://github.com/solar-citizen/vessel-emissions-webapp.git
cd vessel-emissions-webapp
npm i
```

## Development Server

```bash
npm run dev
# Default port 3000
```

## Usage

- **Chart Page**: Open `http://localhost:3000` to view deviations chart.

## Key Files

```
src/components/EmissionsChart/EmissionsChart.tsx    # Chart component
src/components/EmissionsChart/useChartData.ts       # SWR hook
```

## Troubleshooting

- Enable `esModuleInterop` in `tsconfig.json` for SWR imports
- Add `'use client';` directive in client components when using hooks and client components

---
