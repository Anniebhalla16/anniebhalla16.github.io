'use client'

import { useState, useRef, useEffect } from 'react'
import { P } from '../../lib/palette'
import SectionLabel from './SectionLabel'
import type { Entry, Category } from '../../lib/db'

function MobileDropdown({
  selected, onChange, activeSlug: _activeSlug, categories = [],
}: {
  selected: string
  onChange: (key: string) => void
  activeSlug?: string
  categories?: Category[]
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectedCat = categories.find(c => c.key === selected)
  const selectedLabel = selectedCat?.label ?? 'All Entries'

  return (
    <div ref={ref} style={{ position: 'relative', marginBottom: 4 }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 12px',
          background: 'transparent',
          border: `1px solid ${P.hairline}`,
          borderRadius: 8,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 500, color: P.navy }}>{selectedLabel}</span>
        <span style={{
          fontSize: 9, color: P.muted, opacity: 0.6,
          transition: 'transform 0.18s',
          display: 'inline-block',
          transform: open ? 'rotate(180deg)' : 'none',
        }}>▼</span>
      </button>

      {/* Options list */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          background: P.bg,
          border: `1px solid ${P.hairline}`,
          borderRadius: 8,
          overflow: 'hidden',
          zIndex: 50,
          boxShadow: '0 8px 32px rgba(27,38,64,.1)',
        }}>
          {categories.map(val => {
            const key = val.key
            const isSelected = key === selected
            return (
              <button
                key={key}
                onClick={() => { onChange(key); setOpen(false) }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px',
                  border: 'none', background: isSelected ? `${val.color}12` : 'transparent',
                  cursor: 'pointer', textAlign: 'left',
                  borderBottom: `1px solid ${P.hairline}`,
                  fontFamily: 'inherit',
                }}
              >
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                  background: isSelected ? val.color : P.hairline,
                }} />
                <span style={{
                  fontSize: 13,
                  color: isSelected ? val.color : P.muted,
                  fontWeight: isSelected ? 600 : 400,
                }}>
                  {val.label}
                </span>
                {isSelected && (
                  <span style={{ marginLeft: 'auto', fontSize: 10, color: val.color }}>✓</span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

interface Props {
  activeSlug?: string
  activeCat?: string
  onCatChange?: (key: string) => void
  onSelectAll?: () => void
  counts?: Record<string, number>
  entries?: Entry[]
  categories?: Category[]
}

export default function EntriesNav({ activeSlug, activeCat, onCatChange, onSelectAll, counts, entries = [], categories = [] }: Props) {
  const filterMode = !!onCatChange

  // Only show categories that have at least one entry
  const catsWithEntries = categories.filter(c => c.key !== 'all' && entries.some(e => e.categories.key === c.key))

  const defaultExpanded = new Set(entries.map(e => e.categories.key))
  const [expandedCats, setExpandedCats] = useState<Set<string>>(() => defaultExpanded)

  const activeCatFromSlug = activeSlug ? entries.find(e => e.slug === activeSlug)?.categories.key : undefined
  const [mobileCat, setMobileCat] = useState<string>(activeCatFromSlug ?? activeCat ?? 'all')

  const toggleExpand = (key: string) => {
    setExpandedCats(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const activeCatKey = activeSlug ? activeCatFromSlug : activeCat

  const allCount = counts?.all ?? entries.length
  const isAllActive = filterMode && activeCat === 'all'

  // Mobile dropdown value — syncs with activeCat prop in filter mode
  const mobileSelected = filterMode ? (activeCat ?? 'all') : mobileCat

  const handleMobileChange = (key: string) => {
    if (filterMode) {
      if (key === 'all') onSelectAll?.()
      else onCatChange?.(key)
    } else {
      setMobileCat(key)
    }
  }

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
        <span style={{ color: P.navy }}>The </span><em style={{ fontStyle: 'italic', color: P.cognac }}>Log.</em>
      </h1>

      <div className="entries-sidebar-divider" style={{ height: 1, background: P.hairline, marginBottom: 24 }} />

      {/* ── Desktop nav (hidden on mobile) ── */}
      <nav className="entries-cat-nav entries-desktop-only">
        {filterMode ? (
          <button
            onClick={onSelectAll}
            className="entries-cat-btn"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '9px 12px', borderRadius: 8,
              border: 'none', background: isAllActive ? `${P.navy}14` : 'transparent',
              cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s', width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: isAllActive ? P.navy : P.hairline, flexShrink: 0, transition: 'background 0.2s' }} />
              <span style={{ fontSize: 13, color: isAllActive ? P.navy : P.muted, fontWeight: isAllActive ? 600 : 400, transition: 'color 0.2s' }}>All Entries</span>
            </div>
            <span className="entries-cat-count" style={{ fontSize: 11, color: isAllActive ? P.navy : P.hairline, opacity: isAllActive ? 1 : 0.6, transition: 'color 0.2s' }}>
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

        {catsWithEntries
          .map(c => { const key = c.key; const val = c; return { key, val } })
          .map(({ key, val }) => {
            const catEntries = entries.filter(e => e.categories.key === key)
            const catCount = counts?.[key] ?? catEntries.length
            const isOpen = expandedCats.has(key)
            const isCatActive = activeCatKey === key

            return (
              <div key={key}>
                <button
                  onClick={() => {
                    if (filterMode && onCatChange) {
                      onCatChange(key)
                      setExpandedCats(prev => { const n = new Set(prev); n.add(key); return n })
                    } else {
                      toggleExpand(key)
                    }
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

      {/* ── Mobile nav: custom dropdown + entry list (hidden on desktop) ── */}
      <div className="entries-mobile-only">
        <MobileDropdown
          selected={mobileSelected}
          onChange={handleMobileChange}
          activeSlug={activeSlug}
          categories={catsWithEntries}
        />

        {/* Inline entries list for mobile */}
        {(() => {
          const mobileEntries = mobileSelected === 'all'
            ? entries
            : entries.filter(e => e.categories.key === mobileSelected)
          if (mobileEntries.length === 0) return (
            <div style={{ textAlign: 'center', padding: '32px 0', color: P.muted }}>
              <div style={{ fontSize: 24, marginBottom: 8, opacity: 0.3 }}>○</div>
              <div style={{ fontSize: 13 }}>No entries in this category yet.</div>
            </div>
          )
          return (
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {mobileEntries.map(entry => {
                const catInfo = entry.categories
                const isActive = entry.slug === activeSlug
                return (
                  <a
                    key={entry.slug}
                    href={`/entries/${entry.slug}`}
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      padding: '16px 0',
                      borderBottom: `1px solid ${P.hairline}`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{
                        fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase',
                        color: catInfo.color, border: `1px solid ${catInfo.color}60`,
                        padding: '2px 6px', borderRadius: 4,
                      }}>
                        {catInfo.label}
                      </span>
                      <span style={{ fontSize: 11, color: P.muted }}>{entry.date} · {entry.read_time} min read</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <h3 style={{
                        margin: 0,
                        fontFamily: 'var(--font-serif), Georgia, serif',
                        fontWeight: 400, fontSize: 17, lineHeight: 1.25, letterSpacing: '-.01em',
                        color: isActive ? catInfo.color : P.navy,
                      }}>
                        {entry.title}
                      </h3>
                      <span style={{ fontSize: 16, color: P.muted, flexShrink: 0, marginTop: 2 }}>→</span>
                    </div>
                  </a>
                )
              })}
            </div>
          )
        })()}
      </div>

      <div className="entries-sidebar-divider" style={{ height: 1, background: P.hairline, margin: '24px 0' }} />

      <p className="entries-sidebar-desc" style={{ margin: 0, fontSize: 12, lineHeight: 1.7, color: P.muted, paddingLeft: 12 }}>
        Writing on space, robotics, research, and whatever else is on my mind. Updated irregularly.
      </p>
    </aside>
  )
}
