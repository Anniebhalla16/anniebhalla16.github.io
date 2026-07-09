'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { LuGithub, LuLinkedin, LuMail, LuSend } from 'react-icons/lu'

const LINKS = [
  {
    href: 'mailto:annie.bhalla@sereact.ai',
    Icon: LuMail,
    label: 'Email',
    display: 'annie.bhalla@sereact.ai',
  },
  {
    href: 'https://github.com/Anniebhalla16',
    Icon: LuGithub,
    label: 'GitHub',
    display: 'Anniebhalla16',
    external: true,
  },
  {
    href: 'https://linkedin.com/in/anniebhalla',
    Icon: LuLinkedin,
    label: 'LinkedIn',
    display: '/in/anniebhalla',
    external: true,
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Inquiry from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    window.open(`mailto:annie.bhalla@sereact.ai?subject=${subject}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="py-28 bg-space-900 section-divider">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-cyan-glow tracking-widest uppercase mb-3">
            {'// 05. Contact'}
          </div>
          <h2 className="font-mono text-3xl md:text-4xl font-bold text-white">
            Let&apos;s Build the Future
          </h2>
          <div className="mt-4 w-16 h-px bg-cyan-glow" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              I&apos;m actively looking for roles in flight software, autonomous planetary systems,
              and space mission operations. Whether you&apos;re a recruiter, a researcher, or just
              want to talk about space — I&apos;d love to hear from you.
            </p>

            <div className="space-y-4 mb-10">
              {LINKS.map(({ href, Icon, label, display, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 border border-cyan-glow/30 flex items-center justify-center flex-shrink-0 group-hover:border-cyan-glow group-hover:bg-cyan-muted transition-all">
                    <Icon size={15} className="text-cyan-glow" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-slate-500 uppercase tracking-wider">
                      {label}
                    </div>
                    <div className="text-sm text-slate-300 group-hover:text-cyan-glow transition-colors">
                      {display}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability banner */}
            <div className="p-5 border border-cyan-glow/20 bg-cyan-muted">
              <div className="font-mono text-xs text-cyan-glow mb-1 tracking-wider uppercase">
                Availability Status
              </div>
              <p className="font-sans text-sm text-slate-300">
                Available for full-time roles from{' '}
                <span className="text-white font-semibold">November 2026</span>. Currently open to
                conversations with space agencies, aerospace companies, and research labs.
              </p>
            </div>
          </motion.div>

          {/* Right column — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              ].map(({ id, label, type, placeholder }) => (
                <div key={id}>
                  <label
                    htmlFor={id}
                    className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2 block"
                  >
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    required
                    value={form[id as 'name' | 'email']}
                    onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 bg-space-800 border border-white/10 text-slate-200 font-sans text-sm focus:border-cyan-glow focus:outline-none transition-colors placeholder-slate-600"
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2 block"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the role or project..."
                  className="w-full px-4 py-3 bg-space-800 border border-white/10 text-slate-200 font-sans text-sm focus:border-cyan-glow focus:outline-none transition-colors placeholder-slate-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-cyan-glow text-space-900 font-mono font-bold text-sm tracking-wider uppercase hover:opacity-90 transition-opacity glow-cyan"
              >
                <LuSend size={15} />
                {sent ? 'Opening Email Client...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
