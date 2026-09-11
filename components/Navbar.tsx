'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

const items = [
  { label: 'Home', href: '/' },
  { label: 'Trajectory', href: '/trajectory' },
  { label: 'Entries', href: '/entries' },
  // { label: 'Lab', href: '/lab' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const isInner = !!pathname && pathname !== '/'
  const [open, setOpen] = useState(false)

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      <nav
        style={{
          display: 'flex',
          gap: 28,
          padding: '11px 26px',
          borderRadius: '0 0 999px 999px',
          background: 'rgba(13,27,42,.88)',
          border: '1px solid rgba(119,141,169,.22)',
          borderTop: 'none',
          backdropFilter: 'blur(14px)',
          fontSize: 13.5,
          letterSpacing: '.01em',
          transform: isInner && !open ? 'translateY(calc(-100% + 14px))' : 'translateY(0)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {items.map((i) => (
          <a key={i.label} href={i.href}>
            {i.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
