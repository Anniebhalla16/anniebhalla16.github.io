// Parchment palette — warm editorial light theme for inner pages
const P = {
  bg: '#F5EEE6',
  card: '#FBF7F2',
  navy: '#1B2640',
  cognac: '#A0714F',
  blue: '#4A7FA5',
  muted: '#9B8B7A',
  hairline: 'rgba(160,113,79,.15)',
}

const openTo = [
  'Research collaborations & thesis projects',
  'Robotics & autonomous navigation roles',
  'Analog mission ops & space industry',
  'GNC, SLAM & state estimation problems',
  'Coffee somewhere in Stuttgart',
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/Anniebhalla16' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/anniebhalla' },
  { label: 'Instagram', href: 'https://www.instagram.com/callsign.aurora/' },
]

const resumes = [
  {
    label: 'General Resume',
    sub: 'AI · Robotics · Software',
    href: '/AnnieBhalla-Resume.pdf',
    accent: P.cognac,
    bg: 'rgba(160,113,79,.07)',
    border: 'rgba(160,113,79,.25)',
  },
  {
    label: 'GNC Resume',
    sub: 'Navigation · Mission Ops',
    href: '/GNC_AnnieBhalla.pdf',
    accent: P.blue,
    bg: 'rgba(74,127,165,.07)',
    border: 'rgba(74,127,165,.25)',
  },
]

export default function ContactPage() {
  return (
    <div
      className="page-inner"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: 'clamp(76px,11vh,110px)',
        paddingBottom: 'clamp(80px,10vh,120px)',
        paddingLeft: 'clamp(28px,6vw,110px)',
        paddingRight: 'clamp(28px,6vw,110px)',
        boxSizing: 'border-box',
        color: P.navy,
      }}
    >
      {/* Ghosted AURORA watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: -20,
          right: 0,
          fontFamily: 'var(--font-serif), Georgia, serif',
          fontSize: 'clamp(100px,18vw,260px)',
          fontStyle: 'normal',
          color: 'transparent',
          WebkitTextStroke: `1px rgba(160,113,79,.12)`,
          letterSpacing: '-.02em',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        AURORA
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Two columns — headline+list left, card right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(40px,6vw,80px)',
            alignItems: 'start',
          }}
        >
          {/* Left: Headline + subhead + open to */}
          <div>
            <h1
              style={{
                margin: '0 0 clamp(16px,2.5vh,24px)',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontWeight: 400,
                fontSize: 'clamp(52px,9vw,120px)',
                lineHeight: 0.9,
                letterSpacing: '-.02em',
                color: P.navy,
              }}
            >
              Open
              <br />
              <em style={{ fontStyle: 'italic', color: P.cognac }}>channel.</em>
            </h1>

            <p
              style={{
                margin: '0 0 clamp(32px,5vh,52px)',
                fontSize: 'clamp(15px,1.2vw,18px)',
                lineHeight: 1.75,
                color: P.muted,
              }}
            >
              Analog astronaut. Robotics engineer. Always open to the right
              signal — whether it&apos;s a hard problem, a collaboration, or a
              mission worth joining.
            </p>
            <div
              style={{
                fontSize: 10.5,
                letterSpacing: '.24em',
                textTransform: 'uppercase',
                color: P.muted,
                marginBottom: 28,
                fontFamily: 'var(--font-sans), system-ui, sans-serif',
              }}
            >
              Currently open to
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {openTo.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    fontSize: 'clamp(14px,1.1vw,16px)',
                    lineHeight: 1.6,
                    color: P.navy,
                    padding: '16px 0',
                    borderBottom: `1px solid ${P.hairline}`,
                  }}
                >
                  <span style={{ color: P.cognac, flexShrink: 0, fontSize: 13, marginTop: 2 }}>→</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mission card */}
          <div
            style={{
              background: P.card,
              border: `1px solid rgba(160,113,79,.2)`,
              borderRadius: 14,
              padding: 'clamp(24px,3vw,36px)',
              boxShadow: '0 4px 40px rgba(27,38,64,.07)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingBottom: 22,
                marginBottom: 22,
                borderBottom: `1px solid ${P.hairline}`,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: '.22em',
                    textTransform: 'uppercase',
                    color: P.blue,
                    marginBottom: 8,
                    fontFamily: 'var(--font-sans), system-ui, sans-serif',
                  }}
                >
                  Callsign
                </div>
                <div
                  style={{
                    fontSize: 20,
                    color: P.navy,
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    marginBottom: 6,
                  }}
                >
                  Aurora
                </div>
                <div style={{ fontSize: 12, color: P.muted, letterSpacing: '.04em' }}>
                  Stuttgart · 48.78° N · 9.18° E
                </div>
              </div>

              {/* AB stamp */}
              <div
                style={{
                  width: 54,
                  height: 54,
                  background: P.cognac,
                  borderRadius: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    color: '#FBF7F2',
                    fontFamily: 'var(--font-serif), Georgia, serif',
                    lineHeight: 1,
                  }}
                >
                  AB
                </span>
                <span
                  style={{
                    fontSize: 7.5,
                    color: 'rgba(251,247,242,.65)',
                    letterSpacing: '.12em',
                    marginTop: 3,
                    textTransform: 'uppercase',
                  }}
                >
                  2026
                </span>
              </div>
            </div>

            {/* Status */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                paddingBottom: 22,
                marginBottom: 22,
                borderBottom: `1px solid ${P.hairline}`,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: P.blue,
                  boxShadow: `0 0 10px 2px rgba(74,127,165,.35)`,
                  flexShrink: 0,
                  animation: 'twinkle 3s ease-in-out infinite',
                }}
              />
              <span style={{ fontSize: 12, color: P.blue, letterSpacing: '.08em' }}>
                Status nominal · comms open
              </span>
            </div>

            {/* Email */}
            <a
              href="mailto:anniebhalla16@gmail.com"
              style={{
                display: 'block',
                fontSize: 'clamp(15px,1.4vw,18px)',
                fontWeight: 500,
                color: P.navy,
                letterSpacing: '-.01em',
                paddingBottom: 22,
                marginBottom: 22,
                borderBottom: `1px solid ${P.hairline}`,
                textDecoration: 'none',
              }}
            >
              anniebhalla16@gmail.com ↗
            </a>

            {/* Socials */}
            <div
              style={{
                display: 'flex',
                gap: 24,
                flexWrap: 'wrap',
                paddingBottom: 22,
                marginBottom: 22,
                borderBottom: `1px solid ${P.hairline}`,
              }}
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, color: P.muted, letterSpacing: '.06em' }}
                >
                  {s.label} ↗
                </a>
              ))}
            </div>

            {/* Resume downloads */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: P.muted,
                  marginBottom: 6,
                  fontFamily: 'var(--font-sans), system-ui, sans-serif',
                }}
              >
                Download CV
              </div>
              {resumes.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  download
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: r.bg,
                    border: `1px solid ${r.border}`,
                    borderRadius: 8,
                    textDecoration: 'none',
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, color: r.accent, fontWeight: 500 }}>
                      {r.label}
                    </div>
                    <div style={{ fontSize: 11, color: P.muted, marginTop: 2 }}>
                      {r.sub}
                    </div>
                  </div>
                  <span style={{ fontSize: 16, color: r.accent, opacity: 0.7 }}>↓</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
