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

async function getWeather(): Promise<string> {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=48.7758&longitude=9.1829&current=temperature_2m,weather_code',
      { next: { revalidate: 3600 } }
    )
    const data = await res.json()
    const temp = Math.round(data.current.temperature_2m)
    const condition = weatherLabel(data.current.weather_code)
    return `${temp}°C · ${condition}`
  } catch {
    return '—'
  }
}

const heading: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '.22em',
  textTransform: 'uppercase',
  color: 'rgba(224,225,221,.4)',
  marginBottom: 20,
}

const column: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  fontSize: 15,
}

const directory = [
  { label: 'Trajectory', href: '/trajectory' },
  { label: 'Entries', href: '/entries' },
  // { label: 'Lab', href: '/lab' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const connect = [
  { label: 'GitHub', href: 'https://github.com/Anniebhalla16' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/anniebhalla' },
  { label: 'Instagram', href: 'https://www.instagram.com/callsign.aurora/' },
  { label: 'Email', href: 'mailto:anniebhalla16@gmail.com' },
]

export default async function Footer() {
  const weather = await getWeather()
  return (
    <footer
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'clamp(48px,7vh,88px) clamp(28px,6vw,110px) 34px',
        background: 'linear-gradient(#020608, #060e1a)',
        borderTop: '1px solid rgba(224,225,221,.12)',
        color: '#e0e1dd',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))',
          gap: 'clamp(32px,4vw,64px)',
          alignItems: 'start',
        }}
      >
        <div style={{ maxWidth: 340 }}>
          <div
            style={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontSize: 26,
              letterSpacing: '-.01em',
              color: '#e0e1dd',
              marginBottom: 14,
            }}
          >
            Annie Bhalla
          </div>
          <p
            style={{
              margin: '0 0 22px',
              fontSize: 15,
              lineHeight: 1.6,
              color: 'rgba(224,225,221,.6)',
              textWrap: 'pretty',
            }}
          >
            Robotics software, autonomous navigation, and the pull of
            unexplored terrain. Based in Stuttgart.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 13,
              color: 'rgba(224,225,221,.55)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#9fe870',
                boxShadow: '0 0 8px 2px rgba(159,232,112,.5)',
              }}
            />
            <span>Status nominal · comms open</span>
          </div>
        </div>

        <div>
          <div style={heading}>Directory</div>
          <div style={column}>
            {directory.map((i) => (
              <a key={i.label} href={i.href}>
                {i.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div style={heading}>Connect</div>
          <div style={column}>
            {connect.map((i) => (
              <a key={i.label} href={i.href}>
                {i.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div style={heading}>Station</div>
          <div
            style={{ ...column, fontSize: 14, color: 'rgba(224,225,221,.55)' }}
          >
            <span>Lat 48.78° N · Lon 9.18° E</span>
            <span>{weather}</span>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 'clamp(40px,6vh,72px)',
          paddingTop: 22,
          borderTop: '1px solid rgba(224,225,221,.1)',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
          fontSize: 12,
          letterSpacing: '.14em',
          textTransform: 'uppercase',
          color: 'rgba(224,225,221,.4)',
        }}
      >
        <span>© 2026 Annie Bhalla</span>
      </div>
    </footer>
  )
}
