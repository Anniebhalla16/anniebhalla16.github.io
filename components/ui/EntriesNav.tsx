'use client'

import { useState } from 'react'
import { P } from '../../lib/palette'
import SectionLabel from './SectionLabel'
import { CATS, entries } from '../../lib/entriesData'

interface Props {
  /* sub-page mode */
  activeSlug?: string
  /* index filter mode */
  activeCat?: string
  onCatChange?: (key: string) => void
  onSelectAll?: () => void
  counts?: Record<string, number>
}

export default function EntriesNav({ activeSlug, activeCat, onCatChange, onSelectAll, counts }: Props) {
  const filterMode = !!onCatChange

  const defaultExpanded = new Set(entries.map(e => e.cat))
  const [expandedCats, setExpandedCats] = useState<Set<string>>(() => defaultExpanded)

  const toggleExpand = (key: string) => {
    setExpandedCats(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const activeCatKey = activeSlug ? entries.find(e => e.slug === activeSlug)?.cat : activeCat

  const allCount = counts?.all ?? entries.length
  const isAllActive = filterMode && activeCat === 'all'

  return (
    <aside className="entries-sidebar">
      <div className="entries-section-label">
        <SectionLabel index="03" label="Entries" />
      </div>
      <h1 style={{
        margin: '0 0 clamp(20px,2.5vh,32px)',
        fontFamily: 'var(--font-serif), Georgia, serif',
        fontWeight: 400,
        fontSize: 'clamp(40px,5vw,68px)',
        lineHeight: 0.92,
        letterSpacing: '-.02em',
      }}>
        <span style={{ color: P.navy }}>The</span>
        <br />
        <em style={{ fontStyle: 'italic', color: P.cognac }}>Log.</em>
      </h1>

      <div className="entries-sidebar-divider" style={{ height: 1, background: P.hairline, marginBottom: 24 }} />

      <nav className="entries-cat-nav">
        {/* All Entries */}
        {filterMode ? (
          <button
            onClick={onSelectAll}
            className="entries-cat-btn"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '9px 12px', borderRadius: 8,
              border: 'none', background: isAllActive ? `${CATS.all.color}14` : 'transparent',
              cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s', width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: isAllActive ? CATS.all.color : P.hairline, flexShrink: 0, transition: 'background 0.2s' }} />
              <span style={{ fontSize: 13, color: isAllActive ? CATS.all.color : P.muted, fontWeight: isAllActive ? 600 : 400, transition: 'color 0.2s' }}>All Entries</span>
            </div>
            <span className="entries-cat-count" style={{ fontSize: 11, color: isAllActive ? CATS.all.color : P.hairline, opacity: isAllActive ? 1 : 0.6, transition: 'color 0.2s' }}>
              {allCount}
            </span>
          </button>
        ) : (
          <a
            href="/entries"
            className="entries-cat-btn"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '9px 12px', borderRadius: 8, textDecoration: 'none',
              background: 'transparent',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: P.hairline, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: P.muted }}>All Entries</span>
            </div>
            <span className="entries-cat-count" style={{ fontSize: 11, color: P.hairline, opacity: 0.6 }}>
              {allCount}
            </span>
          </a>
        )}

        {/* Category sections */}
        {Object.entries(CATS)
          .filter(([k]) => k !== 'all')
          .map(([key, val]) => {
            const catEntries = entries.filter(e => e.cat === key)
            const catCount = counts?.[key] ?? catEntries.length
            const isOpen = expandedCats.has(key)
            const isCatActive = activeCatKey === key

            return (
              <div key={key}>
                <button
                  onClick={() => {
                    if (filterMode && onCatChange) onCatChange(isCatActive ? 'all' : key)
                    toggleExpand(key)
                  }}
                  className="entries-cat-btn"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '9px 12px', borderRadius: 8,
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    width: '100%', transition: 'background 0.2s',
                    background: isCatActive ? `${val.color}14` : 'transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      fontSize: 9, color: isOpen ? val.color : P.muted,
                      opacity: isOpen ? 0.8 : 0.4,
                      transition: 'transform 0.18s, color 0.18s',
                      display: 'inline-block',
                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      flexShrink: 0, lineHeight: 1,
                    }}>▶</span>
                    <span style={{ fontSize: 13, color: isCatActive ? val.color : P.muted, fontWeight: isCatActive ? 600 : 400, transition: 'color 0.2s' }}>
                      {val.label}
                    </span>
                  </div>
                  {catCount > 0 && (
                    <span className="entries-cat-count" style={{ fontSize: 11, color: isCatActive ? val.color : P.hairline, opacity: isCatActive ? 1 : 0.5 }}>
                      {catCount}
                    </span>
                  )}
                </button>

                {isOpen && catEntries.length > 0 && (
                  <div style={{
                    paddingLeft: 26, marginTop: 2, marginBottom: 4,
                    display: 'flex', flexDirection: 'column', gap: 1,
                    borderLeft: `1px solid ${P.hairline}`, marginLeft: 15,
                  }}>
                    {catEntries.map(e => {
                      const isActive = e.slug === activeSlug
                      return (
                        <a
                          key={e.slug}
                          href={`/entries/${e.slug}`}
                          style={{
                            fontSize: 12,
                            color: isActive ? val.color : P.muted,
                            fontWeight: isActive ? 600 : 400,
                            textDecoration: 'none',
                            padding: '4px 8px',
                            borderRadius: 6,
                            lineHeight: 1.4,
                            display: 'block',
                            background: isActive ? `${val.color}10` : 'transparent',
                            transition: 'color 0.15s, background 0.15s',
                          }}
                          onMouseEnter={ev => {
                            if (!isActive) {
                              const el = ev.currentTarget as HTMLElement
                              el.style.color = val.color
                              el.style.background = `${val.color}0C`
                            }
                          }}
                          onMouseLeave={ev => {
                            if (!isActive) {
                              const el = ev.currentTarget as HTMLElement
                              el.style.color = P.muted
                              el.style.background = 'transparent'
                            }
                          }}
                        >
                          {e.title}
                        </a>
                      )
                    })}
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
  )
}
