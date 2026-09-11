import { NextResponse } from 'next/server'

const STUTTGART_LAT = 48.7758
const STUTTGART_LON = 9.1829

function weatherLabel(code: number): string {
  if (code === 0) return 'Clear'
  if (code <= 3) return 'Partly cloudy'
  if (code <= 48) return 'Foggy'
  if (code <= 55) return 'Drizzle'
  if (code <= 65) return 'Rain'
  if (code <= 77) return 'Snow'
  if (code <= 82) return 'Showers'
  return 'Stormy'
}

export async function GET() {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${STUTTGART_LAT}&longitude=${STUTTGART_LON}&current=temperature_2m,weather_code`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    return NextResponse.json({ error: 'upstream fetch failed' }, { status: 502 })
  }

  const data = await res.json()
  const temp = Math.round(data.current.temperature_2m)
  const condition = weatherLabel(data.current.weather_code)

  return NextResponse.json(
    { temp, condition, label: `${temp}°C · ${condition}` },
    { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=300' } }
  )
}
