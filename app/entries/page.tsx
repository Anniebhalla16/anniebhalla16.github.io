'use client'

import { useState, useMemo } from 'react'
import { P } from '../../lib/palette'
import PageShell from '../../components/ui/PageShell'
import Watermark from '../../components/ui/Watermark'
import SectionLabel from '../../components/ui/SectionLabel'
import CategoryChip from '../../components/ui/CategoryChip'
import { CATS, entries } from '../../lib/entriesData'

export default function EntriesPage() {
  const [activeCat, setActiveCat] = useState<string>('all')
  const [hovered, setHovered] = useState<string | null>(null)
  const catsWithEntries = useMemo(() => new Set(entries.map(e => e.cat)), [])
  const [expandedCats, setExpandedCats] = useState<Set<string>>(catsWithEntries)

  const toggleExpand = (key: string) => {
    setExpandedCats(prev => {
      const next = new Set(prev)
      if (next.has(key)) { next.delete(key) } else { next.add(key) }
      return next
    })
  }

  const filtered = useMemo(() =>
    activeCat === 'all' ? entries : entries.filter(e => e.cat === activeCat),
  [activeCat])

  const featured = filtered.find(e => e.featured)
  const listEntries = activeCat === 'all' ? filtered.filter(e => !e.featured) : filtered

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: entries.length }
    entries.forEach(e => { c[e.cat] = (c[e.cat] ?? 0) + 1 })
    return c
  }, [])

  return (
    <PageShell padX={false}>
      {/* Watermarks */}
      <Watermark text="ENTRIES" position="top-center" size="clamp(140px,22vw,340px)" strokeOpacity={0.1} />
      <Watermark text="The Log." position="bottom-right" size="clamp(80px,12vw,180px)" italic strokeOpacity={0.07} />

      {/* Layout: sidebar + main */}
      <div className="entries-layout">

        {/* ── Sidebar ── */}
        <aside className="entries-sidebar">
          <div className="entries-section-label"><SectionLabel index="03" label="Entries" /></div>
          <h1 style={{ margin: '0 0 clamp(20px,2.5vh,32px)', fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: 400, fontSize: 'clamp(40px,5vw,68px)', lineHeight: 0.92, letterSpacing: '-.02em' }}>
            <span style={{ color: P.navy }}>The</span>
            <br />
            <em style={{ fontStyle: 'italic', color: P.cognac }}>Log.</em>
          </h1>

          <div className="entries-sidebar-divider" style={{ height: 1, background: P.hairline, marginBottom: 24 }} />

          {/* Category nav */}
          <nav className="entries-cat-nav">
            {Object.entries(CATS).map(([key, val]) => {
              const active = activeCat === key
              const catEntries = entries.filter(e => e.cat === key)

              // "All Entries" — plain filter button, no expand
              if (key === 'all') {
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCat('all')}
                    className="entries-cat-btn"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', borderRadius: 8, border: 'none', background: active ? `${val.color}14` : 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s', width: '100%' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: active ? val.color : P.hairline, flexShrink: 0, transition: 'background 0.2s' }} />
                      <span style={{ fontSize: 13, color: active ? val.color : P.muted, fontWeight: active ? 600 : 400, transition: 'color 0.2s' }}>{val.label}</span>
                    </div>
                    <span className="entries-cat-count" style={{ fontSize: 11, color: active ? val.color : P.hairline, transition: 'color 0.2s', opacity: active ? 1 : 0.6 }}>
                      {counts[key]}
                    </span>
                  </button>
                )
              }

              // Other categories — file-explorer style: chevron toggles open/close
              const isOpen = expandedCats.has(key)
              return (
                <div key={key}>
                  <button
                    onClick={() => { setActiveCat(active ? 'all' : key); toggleExpand(key) }}
                    className="entries-cat-btn"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', borderRadius: 8, border: 'none', background: active ? `${val.color}14` : 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s', width: '100%' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {/* Chevron as directory arrow */}
                      <span style={{ fontSize: 9, color: isOpen ? val.color : P.muted, opacity: isOpen ? 0.8 : 0.4, transition: 'transform 0.18s, color 0.18s', display: 'inline-block', transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', flexShrink: 0, lineHeight: 1 }}>▶</span>
                      <span style={{ fontSize: 13, color: active ? val.color : P.muted, fontWeight: active ? 600 : 400, transition: 'color 0.2s' }}>{val.label}</span>
                    </div>
                    {counts[key] && (
                      <span className="entries-cat-count" style={{ fontSize: 11, color: active ? val.color : P.hairline, opacity: active ? 1 : 0.5 }}>
                        {counts[key]}
                      </span>
                    )}
                  </button>

                  {/* Collapsible entry list */}
                  {isOpen && catEntries.length > 0 && (
                    <div style={{ paddingLeft: 26, marginTop: 2, marginBottom: 4, display: 'flex', flexDirection: 'column', gap: 1, borderLeft: `1px solid ${P.hairline}`, marginLeft: 15 }}>
                      {catEntries.map(e => (
                        <a
                          key={e.slug}
                          href={`/entries/${e.slug}`}
                          style={{ fontSize: 12, color: P.muted, textDecoration: 'none', padding: '4px 8px', borderRadius: 6, lineHeight: 1.4, display: 'block', transition: 'color 0.15s, background 0.15s' }}
                          onMouseEnter={ev => { (ev.currentTarget as HTMLElement).style.color = val.color; (ev.currentTarget as HTMLElement).style.background = `${val.color}0C` }}
                          onMouseLeave={ev => { (ev.currentTarget as HTMLElement).style.color = P.muted; (ev.currentTarget as HTMLElement).style.background = 'transparent' }}
                        >
                          {e.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="entries-sidebar-divider" style={{ height: 1, background: P.hairline, margin: '24px 0' }} />

          <p className="entries-sidebar-desc" style={{ margin: 0, fontSize: 12, lineHeight: 1.7, color: P.muted, paddingLeft: 12 }}>
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
                <CategoryChip label={CATS[featured.cat].label} color={CATS[featured.cat].color} size="sm" />
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
                    <CategoryChip label={cat.label} color={cat.color} size="sm" />
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
    </PageShell>
  )
}
