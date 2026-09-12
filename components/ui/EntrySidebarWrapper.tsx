'use client'

import React from 'react'
import { P } from '../../lib/palette'
import SectionLabel from './SectionLabel'

const CATS = [
  { key: 'space',      label: 'Space & Missions', color: '#C07B45' },
  { key: 'research',   label: 'Research',         color: '#4A7FA5' },
  { key: 'hackathons', label: 'Hackathons',        color: '#9B7EC8' },
  { key: 'projects',   label: 'Projects',          color: '#6BBFA3' },
  { key: 'general',    label: 'General',           color: '#9B8B7A' },
]

interface Props {
  children: React.ReactNode
  activeCat?: string
}

export default function EntrySidebarWrapper({ children, activeCat }: Props) {
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
      }}
    >
      <div className="entries-layout">

        {/* ── Sidebar ── */}
        <aside className="entries-sidebar">
          <div className="entries-section-label">
            <SectionLabel index="03" label="Entries" />
          </div>
          <h1 style={{ margin: '0 0 clamp(20px,2.5vh,32px)', fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: 400, fontSize: 'clamp(40px,5vw,68px)', lineHeight: 0.92, letterSpacing: '-.02em' }}>
            <span style={{ color: P.navy }}>The</span>
            <br />
            <em style={{ fontStyle: 'italic', color: P.cognac }}>Log.</em>
          </h1>

          <div className="entries-sidebar-divider" style={{ height: 1, background: P.hairline, marginBottom: 24 }} />

          <nav className="entries-cat-nav">
            <a
              href="/entries"
              className="entries-cat-btn"
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, textDecoration: 'none', background: 'transparent' }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: P.hairline, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: P.muted, fontWeight: 400 }}>All Entries</span>
            </a>
            {CATS.map(({ key, label, color }) => {
              const isActive = activeCat === key
              return (
                <a
                  key={key}
                  href="/entries"
                  className="entries-cat-btn"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', borderRadius: 8, textDecoration: 'none', background: isActive ? `${color}14` : 'transparent' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: isActive ? color : P.hairline, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: isActive ? color : P.muted, fontWeight: isActive ? 600 : 400 }}>
                      {label}
                    </span>
                  </div>
                </a>
              )
            })}
          </nav>

          <div className="entries-sidebar-divider" style={{ height: 1, background: P.hairline, margin: '24px 0' }} />

          <p className="entries-sidebar-desc" style={{ margin: 0, fontSize: 12, lineHeight: 1.7, color: P.muted, paddingLeft: 12 }}>
            Writing on space, robotics, research, and whatever else is on my mind. Updated irregularly.
          </p>
        </aside>

        {/* ── Main content ── */}
        <main style={{ minWidth: 0 }}>
          {children}
        </main>

      </div>
    </div>
  )
}
