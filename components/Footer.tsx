const heading: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '.22em',
  textTransform: 'uppercase',
  color: 'rgba(232,228,217,.4)',
  marginBottom: 20,
}

const column: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  fontSize: 15,
}

const directory = [
  { label: 'Work', href: '/work' },
  { label: 'Studies', href: '/studies' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const connect = [
  { label: 'GitHub', href: 'https://github.com/Anniebhalla16' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/anniebhalla' },
  { label: 'Scholar', href: '#scholar' },
  { label: 'Email', href: 'mailto:annie.bhalla@sereact.ai' },
]

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        padding: 'clamp(48px,7vh,88px) clamp(28px,6vw,110px) 34px',
        background: 'linear-gradient(#07080b, #0a0b11)',
        borderTop: '1px solid rgba(232,228,217,.12)',
        color: '#e8e4d9',
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
              color: '#f3efe4',
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
              color: 'rgba(232,228,217,.6)',
              textWrap: 'pretty',
            }}
          >
            Astrophysics, data, and the long habit of looking up. An
            observation log kept in Munich.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 13,
              color: 'rgba(232,228,217,.55)',
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
            <span>Log open · replying within a day</span>
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
            style={{ ...column, fontSize: 14, color: 'rgba(232,228,217,.55)' }}
          >
            <span>Lat 48.14° N · Lon 11.58° E</span>
            <span>Seeing 2.1″ · Clear</span>
            <span>Last entry · 24 Aug 2026</span>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 'clamp(40px,6vh,72px)',
          paddingTop: 22,
          borderTop: '1px solid rgba(232,228,217,.1)',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
          fontSize: 12,
          letterSpacing: '.14em',
          textTransform: 'uppercase',
          color: 'rgba(232,228,217,.4)',
        }}
      >
        <span>© 2026 Annie Bhalla</span>
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          <a href="#colophon" style={{ color: 'rgba(232,228,217,.4)' }}>
            Colophon
          </a>
          <a href="#rss" style={{ color: 'rgba(232,228,217,.4)' }}>
            RSS
          </a>
          <span>Built in Munich</span>
        </div>
      </div>
    </footer>
  )
}
