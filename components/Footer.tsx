import { LuGithub, LuLinkedin, LuMail } from 'react-icons/lu'

export default function Footer() {
  return (
    <footer className="bg-space-950 border-t border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-sm text-slate-600">
          Designed for the Next Frontier.{' '}
          <span className="text-cyan-glow">©</span> 2026 Annie Bhalla.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Anniebhalla16"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-cyan-glow transition-colors"
            aria-label="GitHub"
          >
            <LuGithub size={19} />
          </a>
          <a
            href="https://linkedin.com/in/anniebhalla"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-cyan-glow transition-colors"
            aria-label="LinkedIn"
          >
            <LuLinkedin size={19} />
          </a>
          <a
            href="mailto:annie.bhalla@sereact.ai"
            className="text-slate-600 hover:text-cyan-glow transition-colors"
            aria-label="Email"
          >
            <LuMail size={19} />
          </a>
        </div>
      </div>
    </footer>
  )
}
