'use client'

import { motion } from 'framer-motion'
import { LuCompass, LuHeart, LuMountain, LuRocket } from 'react-icons/lu'

const PILLARS = [
  {
    Icon: LuRocket,
    title: 'Technical Drive',
    text: 'Drawn to the engineering challenges at the edge of what\'s possible — whether mapping a planetary surface from a rover or building diagnostics that work without fail in the field. The harder the problem, the more compelling.',
  },
  {
    Icon: LuMountain,
    title: 'Explorer\'s Mindset',
    text: 'A lifelong passion for exploration — from trekking high-altitude mountain terrain to building systems for extreme environments. The problems that matter most are the ones that push beyond the known horizon.',
  },
  {
    Icon: LuHeart,
    title: 'Human Spaceflight',
    text: 'Human spaceflight isn\'t just a career direction — it\'s the defining pursuit of our curiosity as a species. Every line of software written for autonomous systems is a small contribution to getting humans further into the solar system.',
  },
  {
    Icon: LuCompass,
    title: 'Operational Excellence',
    text: 'Forged in the rigorous frameworks of analog space missions, I bring the discipline and precision of mission-critical operations to every project. Some systems don\'t get a second chance — and that sharpens everything.',
  },
]

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="py-28 bg-space-800 section-divider relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-glow/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-cyan-glow tracking-widest uppercase mb-3">
            {'// 04. The Fit'}
          </div>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-white">
            The Intellectual Explorer
          </h2>
          <div className="mt-4 w-16 h-px bg-cyan-glow" />
        </motion.div>

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 pl-6 border-l-2 border-cyan-glow"
        >
          <p className="font-mono text-xl md:text-2xl text-slate-200 leading-relaxed">
            &ldquo;The most interesting engineering problems are the ones where failure isn&apos;t an
            option and the environment gives no mercy — that&apos;s where I do my best work.&rdquo;
          </p>
        </motion.blockquote>

        {/* Pillars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-space-900 border border-white/5 hover:border-cyan-glow/20 transition-all group"
            >
              <Icon size={24} className="text-cyan-glow mb-5" />
              <h3 className="font-mono text-sm font-bold text-white mb-3 tracking-wide">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
