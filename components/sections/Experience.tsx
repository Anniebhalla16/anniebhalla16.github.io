'use client'

import { motion } from 'framer-motion'
import { LuBuilding2, LuCalendar, LuMapPin } from 'react-icons/lu'

const EXPERIENCES = [
  {
    period: '2024 – Present',
    role: 'Software Engineer · AI Robotics',
    company: 'Sereact',
    location: 'Stuttgart, Germany',
    type: 'Full-Time',
    accent: 'cyan' as const,
    highlights: [
      'Designed and built real-time diagnostics systems for production robotics platforms, enabling rapid fault detection and continuous system health monitoring.',
      'Architected robust software modules with rigorous edge-case handling, improving reliability across high-throughput warehouse automation pipelines.',
      'Contributed to systems-level software integration across perception, planning, and control stacks — applying aerospace-grade reliability thinking to commercial robotics.',
    ],
    tags: ['C++', 'Python', 'ROS2', 'Real-time Systems', 'Diagnostics', 'Systems Architecture'],
  },
  {
    period: '2023 – 2024',
    role: 'Analog Astronaut · Remote Science Support Task Manager',
    company: 'Austrian Space Forum (OeWF)',
    location: 'International Missions',
    type: 'Analog Mission',
    accent: 'orange' as const,
    highlights: [
      'Completed Analog Mission Basic Training (AMBT) with the Austrian Space Forum — one of the world\'s premier analog astronaut programs, training engineers under simulated planetary mission conditions.',
      'Appointed Task Manager in the Remote Science Support (RSS) team during major international analog space simulation missions, coordinating multidisciplinary science objectives under real-time constraints.',
      'Operated within operational frameworks that mirror actual Mars and Moon mission workflows — handling comms delays, go/no-go decisions, and real-time data triage in multidisciplinary international teams.',
    ],
    tags: ['Mission Operations', 'RSS', 'AMBT', 'OeWF', 'Science Coordination', 'Field Operations'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-28 bg-space-800 section-divider">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-cyan-glow tracking-widest uppercase mb-3">
            {'// 02. Professional Experience'}
          </div>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-white">
            Mission-Proven Track Record
          </h2>
          <div className="mt-4 w-16 h-px bg-cyan-glow" />
        </motion.div>

        <div className="space-y-6">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative p-8 bg-space-900 border border-white/5 hover:border-cyan-glow/20 transition-all overflow-hidden"
            >
              {/* Left accent bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${
                  exp.accent === 'cyan' ? 'bg-cyan-glow' : 'bg-orange-ignite'
                }`}
              />

              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Meta column */}
                <div className="lg:w-60 flex-shrink-0">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 mb-3 font-mono text-xs tracking-wider border ${
                      exp.accent === 'cyan'
                        ? 'text-cyan-glow bg-cyan-muted border-cyan-glow/20'
                        : 'text-orange-ignite bg-orange-muted border-orange-ignite/20'
                    }`}
                  >
                    <LuCalendar size={10} />
                    {exp.period}
                  </div>
                  <div className="flex items-center gap-1.5 font-sans text-xs text-slate-500 mt-1">
                    <LuMapPin size={10} />
                    {exp.location}
                  </div>
                  <div className="font-mono text-xs text-slate-600 mt-1 uppercase tracking-wider">
                    {exp.type}
                  </div>
                </div>

                {/* Content column */}
                <div className="flex-1">
                  <h3 className="font-mono text-xl font-bold text-white mb-1">{exp.role}</h3>
                  <div className="flex items-center gap-2 mb-5">
                    <LuBuilding2 size={12} className="text-slate-500" />
                    <span className="font-sans text-sm text-slate-400">{exp.company}</span>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-slate-400 leading-relaxed">
                        <span
                          className={`mt-1 flex-shrink-0 text-xs ${
                            exp.accent === 'cyan' ? 'text-cyan-glow' : 'text-orange-ignite'
                          }`}
                        >
                          ▸
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 font-mono text-xs text-slate-400 border border-white/10 bg-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
