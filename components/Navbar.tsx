'use client'

import { useEffect, useState } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'

const NAV_ITEMS = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Experience', href: '#experience' },
  { label: 'Research', href: '#research' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Contact', href: '#contact' },
]

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-space-900/95 backdrop-blur-md border-b border-cyan-glow/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-xl font-bold text-cyan-glow tracking-widest hover:opacity-80 transition-opacity"
        >
          AB<span className="text-orange-ignite">.</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="font-mono text-xs text-slate-400 hover:text-cyan-glow transition-colors tracking-widest uppercase"
            >
              {item.label}
            </button>
          ))}
          <a
            href="/cv.pdf"
            download
            className="ml-2 px-4 py-2 border border-cyan-glow/60 text-cyan-glow font-mono text-xs tracking-widest uppercase hover:bg-cyan-muted transition-all"
          >
            Resume ↓
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <LuX size={22} /> : <LuMenu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-space-800 border-t border-cyan-glow/10 px-6 py-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => { scrollTo(item.href); setOpen(false) }}
              className="block w-full text-left py-3 font-mono text-xs text-slate-300 hover:text-cyan-glow transition-colors tracking-widest uppercase border-b border-white/5 last:border-0"
            >
              {item.label}
            </button>
          ))}
          <a
            href="/cv.pdf"
            download
            className="block mt-4 text-center py-3 border border-cyan-glow/50 text-cyan-glow font-mono text-xs tracking-widest uppercase"
          >
            Download Resume
          </a>
        </div>
      )}
    </header>
  )
}
