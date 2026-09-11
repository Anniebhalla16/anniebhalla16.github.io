'use client'

import { useState, useMemo } from 'react'

const P = {
  navy: '#1B2640',
  cognac: '#A0714F',
  blue: '#4A7FA5',
  muted: '#9B8B7A',
  hairline: 'rgba(160,113,79,.15)',
  card: '#FBF7F2',
}

const CATS: Record<string, { label: string; color: string; desc: string }> = {
  all:        { label: 'All Entries',      color: P.navy,    desc: '' },
  space:      { label: 'Space & Missions', color: '#C07B45', desc: 'Analog missions, EVAs, flight ops' },
  research:   { label: 'Research',         color: '#4A7FA5', desc: 'SLAM, navigation, sensor fusion' },
  hackathons: { label: 'Hackathons',       color: '#9B7EC8', desc: 'Competitions & sprints' },
  projects:   { label: 'Projects',         color: '#6BBFA3', desc: 'Things I built' },
  general:    { label: 'General',          color: '#9B8B7A', desc: 'Everything else' },
}

interface Entry {
  slug: string
  title: string
  cat: keyof typeof CATS
  date: string
  excerpt: string
  readTime: number
  featured?: boolean
}

const entries: Entry[] = [
  {
    slug: 'eva-analog-lunar-mission',
    title: 'What it actually feels like to do an EVA',
    cat: 'space',
    date: 'Aug 2026',
    excerpt: 'Eight days at Dholavira. Three EVAs. A suit that weighs more than you expect and terrain designed to feel like the Moon. Here\'s what nobody tells you about analog astronaut training.',
    readTime: 7,
    featured: true,
  },
  {
    slug: 'amadee-27-mars-simulation',
    title: 'AMADEE-27: my first Mars simulation',
    cat: 'space',
    date: 'Sep 2026',
    excerpt: 'Flying data comms for an analog Mars crew from the Mission Support Center. The ICD definitions, the latency delays, and the strange calm of mission control.',
    readTime: 9,
  },
  {
    slug: '3dgs-slam-planetary-navigation',
    title: 'Building 3DGS SLAM for planetary surface navigation',
    cat: 'research',
    date: 'Nov 2025',
    excerpt: 'Two years at DLR building a visual navigation system that fuses hyperspectral and RGB-D data. How 3D Gaussian Splatting changed our approach — and where it still fails.',
    readTime: 12,
    featured: true,
  },
  {
    slug: 'telemetry-sereact-robots',
    title: 'Telemetry infrastructure for 100+ robot stations',
    cat: 'projects',
    date: 'Mar 2026',
    excerpt: 'KPI reliability at 50% when I joined. Getting it to 95% meant rethinking the entire event pipeline. RabbitMQ, WebSockets, and the lesson I keep re-learning about observability.',
    readTime: 8,
  },
  {
    slug: 'visual-odometry-why-its-hard',
    title: 'On visual odometry and why it\'s still hard',
    cat: 'research',
    date: 'Jul 2025',
    excerpt: 'State estimation sounds clean on paper. In practice, dust on lenses, lighting changes, and feature sparsity mean you\'re constantly fighting the environment. A field report.',
    readTime: 10,
  },
  {
    slug: 'hackathon-hyperloop',
    title: 'How we built a Hyperloop pod in 36 hours',
    cat: 'hackathons',
    date: 'Apr 2025',
    excerpt: 'Sleep-deprived, over-caffeinated, and somehow we had a working prototype by Sunday morning. Notes on rapid hardware-software co-design and what actually matters under pressure.',
    readTime: 6,
  },
  {
    slug: 'decisions-under-uncertainty',
    title: 'Decisions under uncertainty',
    cat: 'general',
    date: 'Jan 2026',
    excerpt: 'Whether it\'s a Kalman filter or a career move, the structure of the problem is the same: you have a prior, incoming signal, and you update. Some thoughts on reasoning in fog.',
    readTime: 5,
  },
]

export default function EntriesPage() {
  const [activeCat, setActiveCat] = useState<string>('all')
  const [hovered, setHovered] = useState<string | null>(null)

  const filtered = useMemo(() =>
    activeCat === 'all' ? entries : entries.filter(e => e.cat === activeCat),
  [activeCat])

  const featured = filtered.find(e => e.featured)
  const rest = filtered.filter(e => !e.featured || activeCat !== 'all')
  const listEntries = activeCat === 'all' ? filtered.filter(e => !e.featured) : filtered

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: entries.length }
    entries.forEach(e => { c[e.cat] = (c[e.cat] ?? 0) + 1 })
    return c
  }, [])

  return (
    <div
      className="page-inner"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: 'clamp(76px,11vh,110px)',
        paddingBottom: 'clamp(80px,10vh,120px)',
        boxSizing: 'border-box',
        color: P.navy,
        overflow: 'hidden',
      }}
    >
      {/* Watermarks */}
      <div aria-hidden style={{ position: 'absolute', top: 'clamp(40px,6vh,80px)', left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(140px,22vw,340px)', color: 'transparent', WebkitTextStroke: '1px rgba(160,113,79,.1)', letterSpacing: '-.01em', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
        ENTRIES
      </div>
      <div aria-hidden style={{ position: 'absolute', bottom: '12%', right: -20, fontFamily: 'var(--font-serif), Georgia, serif', fontSize: 'clamp(80px,12vw,180px)', fontStyle: 'italic', color: 'transparent', WebkitTextStroke: '1px rgba(160,113,79,.07)', letterSpacing: '-.02em', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
        The Log.
      </div>

      {/* Layout: sidebar + main */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'clamp(32px,5vw,72px)', alignItems: 'start', paddingLeft: 'clamp(28px,6vw,110px)', paddingRight: 'clamp(28px,6vw,110px)', position: 'relative', zIndex: 1 }}>

        {/* ── Sidebar ── */}
        <aside style={{ position: 'sticky', top: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: '.26em', textTransform: 'uppercase', color: P.muted, marginBottom: 16, fontFamily: 'var(--font-sans), system-ui, sans-serif' }}>
            03 · Entries
          </div>
          <h1 style={{ margin: '0 0 28px', fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: 400, fontSize: 'clamp(28px,3vw,40px)', lineHeight: 1.05, letterSpacing: '-.02em' }}>
            <span style={{ color: P.navy }}>The</span>{' '}
            <em style={{ fontStyle: 'italic', color: P.cognac }}>Log.</em>
          </h1>

          <div style={{ height: 1, background: P.hairline, marginBottom: 24 }} />

          {/* Category nav */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {Object.entries(CATS).map(([key, val]) => {
              const active = activeCat === key
              return (
                <button
                  key={key}
                  onClick={() => setActiveCat(key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 12px',
                    borderRadius: 8,
                    border: 'none',
                    background: active ? `${val.color}14` : 'transparent',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: active ? val.color : P.hairline, flexShrink: 0, transition: 'background 0.2s' }} />
                    <span style={{ fontSize: 13, color: active ? val.color : P.muted, fontWeight: active ? 600 : 400, transition: 'color 0.2s' }}>
                      {val.label}
                    </span>
                  </div>
                  {counts[key] && (
                    <span style={{ fontSize: 11, color: active ? val.color : P.hairline, transition: 'color 0.2s', opacity: active ? 1 : 0.6 }}>
                      {counts[key]}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          <div style={{ height: 1, background: P.hairline, margin: '24px 0' }} />

          <p style={{ margin: 0, fontSize: 12, lineHeight: 1.7, color: P.muted, paddingLeft: 12 }}>
            Writing on space, robotics, research, and whatever else is on my mind. Updated irregularly.
          </p>
        </aside>

        {/* ── Main content ── */}
        <main>
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'clamp(24px,4vh,40px)', paddingBottom: 16, borderBottom: `1px solid ${P.hairline}` }}>
            <span style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: P.muted }}>
              {activeCat === 'all' ? 'All entries' : CATS[activeCat].label}
            </span>
            <span style={{ fontSize: 11, color: P.muted, opacity: 0.6 }}>
              {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
            </span>
          </div>

          {/* Featured entry (all view only) */}
          {activeCat === 'all' && featured && (
            <a
              href={`/entries/${featured.slug}`}
              onMouseEnter={() => setHovered(featured.slug)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'block',
                textDecoration: 'none',
                marginBottom: 'clamp(24px,4vh,40px)',
                padding: 'clamp(24px,3vw,36px)',
                background: P.card,
                borderRadius: 14,
                border: `1px solid ${P.hairline}`,
                boxShadow: hovered === featured.slug ? '0 12px 48px rgba(27,38,64,.1)' : '0 4px 24px rgba(27,38,64,.06)',
                transition: 'box-shadow 0.25s, transform 0.25s',
                transform: hovered === featured.slug ? 'translateY(-2px)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: CATS[featured.cat].color, padding: '3px 9px', border: `1px solid ${CATS[featured.cat].color}40`, borderRadius: 4 }}>
                  {CATS[featured.cat].label}
                </span>
                <span style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: P.cognac, opacity: 0.7 }}>
                  Featured
                </span>
                <span style={{ fontSize: 11, color: P.muted, marginLeft: 'auto' }}>{featured.date} · {featured.readTime} min</span>
              </div>
              <h2 style={{ margin: '0 0 12px', fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: 400, fontSize: 'clamp(22px,2.5vw,32px)', lineHeight: 1.2, letterSpacing: '-.01em', color: P.navy }}>
                {featured.title}
              </h2>
              <p style={{ margin: '0 0 20px', fontSize: 15, lineHeight: 1.75, color: P.muted, maxWidth: 600 }}>
                {featured.excerpt}
              </p>
              <span style={{ fontSize: 13, color: P.cognac, letterSpacing: '.04em' }}>
                Read entry →
              </span>
            </a>
          )}

          {/* Entry list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {listEntries.map((entry, i) => {
              const cat = CATS[entry.cat]
              const isHov = hovered === entry.slug
              return (
                <a
                  key={entry.slug}
                  href={`/entries/${entry.slug}`}
                  onMouseEnter={() => setHovered(entry.slug)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    padding: 'clamp(18px,2.5vh,26px) 0',
                    borderBottom: `1px solid ${P.hairline}`,
                    transition: 'background 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: cat.color, padding: '2px 8px', border: `1px solid ${cat.color}38`, borderRadius: 4 }}>
                      {cat.label}
                    </span>
                    <span style={{ fontSize: 11, color: P.muted }}>{entry.date} · {entry.readTime} min read</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: 400, fontSize: 'clamp(17px,1.6vw,21px)', lineHeight: 1.25, letterSpacing: '-.01em', color: isHov ? P.cognac : P.navy, transition: 'color 0.2s' }}>
                        {entry.title}
                      </h3>
                      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: P.muted }}>
                        {entry.excerpt}
                      </p>
                    </div>
                    <span style={{ fontSize: 18, color: isHov ? P.cognac : P.muted, flexShrink: 0, marginTop: 2, transition: 'color 0.2s, transform 0.2s', transform: isHov ? 'translateX(4px)' : 'none' }}>
                      →
                    </span>
                  </div>
                </a>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: P.muted }}>
              <div style={{ fontSize: 32, marginBottom: 12, opacity: 0.3 }}>○</div>
              <div style={{ fontSize: 14 }}>No entries in this category yet.</div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
