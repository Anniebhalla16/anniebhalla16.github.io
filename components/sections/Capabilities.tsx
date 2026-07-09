'use client'

import { motion } from 'framer-motion'
import { LuBrain, LuCpu, LuRadar } from 'react-icons/lu'

const CAPABILITIES = [
  {
    Icon: LuRadar,
    title: 'Robotics & SLAM',
    items: [
      '3D Gaussian Splatting (3DGS) scene reconstruction',
      'Hyperspectral-assisted loop closure detection',
      'Computer vision for autonomous planetary rovers',
      'Localization in visually repetitive environments',
    ],
  },
  {
    Icon: LuCpu,
    title: 'Software Engineering',
    items: [
      'Real-time robotics diagnostic systems',
      'Robust software architecture & edge case handling',
      'C++ and Python system development',
      'Reliable embedded and systems engineering',
    ],
  },
  {
    Icon: LuBrain,
    title: 'Mission Operations',
    items: [
      'Mission Control operations & protocols',
      'Remote Science Support (RSS) task management',
      'Multidisciplinary international team coordination',
      'Rigorous frameworks under mission-critical constraints',
    ],
  },
]

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-28 bg-space-900 section-divider">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-cyan-glow tracking-widest uppercase mb-3">
            {'// 01. Core Capabilities'}
          </div>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-white">
            Technical Mastery
          </h2>
          <div className="mt-4 w-16 h-px bg-cyan-glow" />
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {CAPABILITIES.map(({ Icon, title, items }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-7 bg-space-800 border border-white/5 hover:border-cyan-glow/30 transition-all duration-300"
            >
              {/* Top shimmer on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-glow to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon box */}
              <div className="w-12 h-12 border border-cyan-glow/25 flex items-center justify-center mb-6 group-hover:border-cyan-glow group-hover:glow-cyan transition-all duration-300">
                <Icon size={22} className="text-cyan-glow" />
              </div>

              <h3 className="font-mono text-lg font-bold text-white mb-5">{title}</h3>

              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
                    <span className="text-cyan-glow mt-0.5 flex-shrink-0 text-xs">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
