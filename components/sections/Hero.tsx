'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { LuArrowDown, LuDownload, LuMail } from 'react-icons/lu'

type Star = { id: number; x: number; y: number; size: number; dur: number; delay: number }

function StarField() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    setStars(
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        dur: Math.random() * 3 + 2,
        delay: Math.random() * 4,
      }))
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

const STATS = [
  { value: 'MSc', label: 'Autonomous Systems' },
  { value: '2+', label: 'Years Robotics SW Eng' },
  { value: 'OeWF', label: 'Analog Mission Trained' },
  { value: 'IAC 2026', label: 'Accepted Publication' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-grid overflow-hidden">
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-space-700 via-space-900 to-space-900" />

      {/* Top radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl bg-cyan-glow/5 pointer-events-none" />

      <StarField />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-cyan-glow/30 bg-cyan-muted"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse" />
          <span className="font-mono text-xs text-cyan-glow tracking-widest uppercase">
            Open to Aerospace &amp; Space Roles · From Nov 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-mono text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6"
        >
          Engineering Autonomy
          <br />
          <span className="text-cyan-glow text-glow-cyan">for the Next Frontier.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10 leading-relaxed"
        >
          Software Engineer &amp; Autonomous Systems Master&apos;s Graduate specializing in
          planetary robotics, real-time diagnostics, and space mission operations. Actively
          seeking roles in flight software, planetary SLAM, and autonomous space systems.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-cyan-glow text-space-900 font-mono font-bold text-sm tracking-wider uppercase hover:opacity-90 transition-opacity glow-cyan"
          >
            <LuDownload size={17} />
            Download CV
          </a>
          <button
            onClick={() =>
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-orange-ignite text-orange-ignite font-mono font-bold text-sm tracking-wider uppercase hover:bg-orange-muted transition-all"
          >
            <LuMail size={17} />
            Get In Touch
          </button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {STATS.map((s) => (
            <div key={s.label} className="border-l-2 border-cyan-glow/30 pl-4">
              <div className="font-mono text-2xl font-bold text-cyan-glow">{s.value}</div>
              <div className="font-sans text-xs text-slate-500 mt-1 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600"
      >
        <LuArrowDown size={20} />
      </motion.div>
    </section>
  )
}
