import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vesselIds = searchParams.get('vesselIds');

    const backendQuery = vesselIds ? `?vesselIds=${vesselIds}` : '';

    const resp = await fetch(`http://localhost:3030/emissions/chart-data${backendQuery}`);

    if (!resp.ok) {
      const errorText = await resp.text();
      return NextResponse.json(
        { error: errorText || 'Backend request failed' },
        { status: resp.status },
      );
    }

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
