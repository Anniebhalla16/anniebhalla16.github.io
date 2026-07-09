'use client'

import { motion } from 'framer-motion'
import { LuBookOpen, LuFlaskConical, LuGlobe, LuMic, LuStar } from 'react-icons/lu'

export default function Research() {
  return (
    <section id="research" className="py-28 bg-space-900 section-divider">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-cyan-glow tracking-widest uppercase mb-3">
            {'// 03. Academic & Research'}
          </div>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-white">
            Pushing the Research Frontier
          </h2>
          <div className="mt-4 w-16 h-px bg-cyan-glow" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* IAC 2026 milestone card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 relative p-7 border border-orange-ignite/40 bg-orange-muted overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-ignite/8 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-ignite text-space-900 font-mono text-xs font-bold tracking-wider mb-5">
                <LuStar size={10} fill="currentColor" />
                MILESTONE · UPCOMING
              </div>

              <div className="font-mono text-xs text-orange-ignite tracking-wider mb-2 uppercase">
                October 2026
              </div>
              <h3 className="font-mono text-xl font-bold text-white mb-4 leading-snug">
                International Astronautical Congress
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                Accepted oral presentation at{' '}
                <span className="text-orange-ignite font-semibold">IAC 2026</span> — the world&apos;s
                largest space congress. Presenting cutting-edge research on hyperspectral-assisted 3DGS
                SLAM for planetary exploration rovers.
              </p>
              <div className="flex items-center gap-2 font-mono text-xs text-orange-ignite">
                <LuMic size={12} />
                Oral Presentation · Sydney, Australia
              </div>
            </div>
          </motion.div>

          {/* Thesis card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 p-8 bg-space-800 border border-white/5 hover:border-cyan-glow/20 transition-all"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 border border-cyan-glow/30 flex items-center justify-center flex-shrink-0">
                <LuFlaskConical size={22} className="text-cyan-glow" />
              </div>
              <div>
                <div className="font-mono text-xs text-cyan-glow tracking-wider mb-1 uppercase">
                  Master&apos;s Thesis · University of Stuttgart
                </div>
                <h3 className="font-mono text-lg font-bold text-white leading-snug">
                  3D Gaussian Splatting SLAM with Hyperspectral-Assisted Loop Closure Detection
                  for Planetary Rovers
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Designed, implemented, and evaluated a novel SLAM pipeline for planetary rovers that
              fuses 3D Gaussian Splatting scene representation with hyperspectral imaging for robust
              loop closure detection. Research specifically targets accurate localization in
              data-scarce, visually repetitive extraterrestrial environments — one of the hardest
              open problems in planetary autonomy.
            </p>

            <div className="grid grid-cols-3 gap-4 p-5 bg-space-900 border border-white/5">
              {[
                { label: 'Method', value: '3DGS + HSI' },
                { label: 'Focus', value: 'Loop Closure' },
                { label: 'Domain', value: 'Planetary SLAM' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="font-mono text-sm font-bold text-cyan-glow">{item.value}</div>
                  <div className="font-sans text-xs text-slate-500 mt-1 uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* MSc degree card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 p-7 bg-space-800 border border-white/5 hover:border-cyan-glow/20 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 border border-cyan-glow/30 flex items-center justify-center flex-shrink-0">
                <LuBookOpen size={22} className="text-cyan-glow" />
              </div>
              <div className="flex-1">
                <div className="font-mono text-xs text-cyan-glow tracking-wider mb-1 uppercase">
                  2022 – 2024
                </div>
                <h3 className="font-mono text-xl font-bold text-white mb-1">
                  MSc · Autonomous Systems
                </h3>
                <div className="font-sans text-sm text-slate-400 mb-4">
                  University of Stuttgart, Germany
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Advanced graduate program covering autonomous robotic systems, machine learning for
                  perception, state estimation, motion planning, and embedded systems. Final thesis
                  pushed the state-of-the-art in planetary SLAM through novel sensor fusion.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['SLAM', 'Computer Vision', 'Motion Planning', 'Sensor Fusion', 'ROS2', 'Deep Learning'].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 font-mono text-xs text-slate-400 border border-white/10 bg-white/5"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Research focus card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 p-7 bg-space-800 border border-white/5 hover:border-cyan-glow/20 transition-all"
          >
            <div className="w-12 h-12 border border-cyan-glow/30 flex items-center justify-center mb-5">
              <LuGlobe size={22} className="text-cyan-glow" />
            </div>
            <h3 className="font-mono text-lg font-bold text-white mb-5">Research Focus</h3>
            <ul className="space-y-3">
              {[
                'Planetary rover localization & mapping',
                'Novel SLAM scene representations',
                'Hyperspectral sensor fusion',
                'Data-scarce navigation challenges',
                'Autonomous planetary exploration',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
