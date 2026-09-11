export default function Hero() {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        boxSizing: 'border-box',
        padding: '0 clamp(28px,6vw,110px) clamp(110px,16vh,200px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 'clamp(32px,6vw,90px)',
          flexWrap: 'wrap',
          animation: 'rise .9s cubic-bezier(.2,.7,.2,1) both',
        }}
      >
        <div style={{ maxWidth: 780 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 12,
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              color: '#778da9',
              marginBottom: 22,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#f4e2c4',
                boxShadow: '0 0 10px 2px rgba(244,226,196,.6)',
              }}
            />
            <span>Callsign Aurora</span>
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(58px,11.5vw,168px)',
              lineHeight: 0.88,
              letterSpacing: '-.02em',
              color: '#e0e1dd',
              textWrap: 'balance',
            }}
          >
            Annie
            <br />
            <em style={{ fontStyle: 'italic', color: '#778da9' }}>Bhalla</em>
          </h1>
        </div>

        <div style={{ maxWidth: 420, minWidth: 280, flex: 1 }}>
          <p
            style={{
              margin: '0 0 30px',
              fontSize: 'clamp(16px,1.25vw,19px)',
              lineHeight: 1.65,
              color: 'rgba(224,225,221,.78)',
              textWrap: 'pretty',
            }}
          >
            Robotics software, autonomous navigation, and the pull of
            unexplored terrain. I keep a log of the work — state estimators,
            telemetry pipelines, mission ops, and the odd EVA.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <a
              href="/trajectory"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 18px',
                borderRadius: 999,
                background: '#e0e1dd',
                color: '#0d1b2a',
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: '.01em',
              }}
            >
              <span>See work</span>
              <span style={{ fontSize: 13, opacity: 0.6 }}>→</span>
            </a>
            <a
              href="/contact"
              style={{
                fontSize: 14,
                color: '#778da9',
                borderBottom: '1px solid rgba(232,228,217,.2)',
                paddingBottom: 2,
              }}
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
