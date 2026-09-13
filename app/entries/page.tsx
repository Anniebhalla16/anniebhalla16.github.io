'use client'

import { useState, useMemo } from 'react'
import { P } from '../../lib/palette'
import PageShell from '../../components/ui/PageShell'
import Watermark from '../../components/ui/Watermark'
import CategoryChip from '../../components/ui/CategoryChip'
import EntriesNav from '../../components/ui/EntriesNav'
import { CATS, entries } from '../../lib/entriesData'

export default function EntriesPage() {
  const [activeCat, setActiveCat] = useState<string>('all')
  const [hovered, setHovered] = useState<string | null>(null)

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
        <EntriesNav
          activeCat={activeCat}
          counts={counts}
          onSelectAll={() => setActiveCat('all')}
          onCatChange={(key) => setActiveCat(activeCat === key ? 'all' : key)}
        />

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
            {listEntries.map((entry) => {
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
