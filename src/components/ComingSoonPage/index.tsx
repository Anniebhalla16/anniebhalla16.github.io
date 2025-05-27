"use client"


import { useEffect, useState } from "react"
import { LuGithub, LuLinkedin, LuRocket, LuTwitter } from "react-icons/lu"

export default function ComingSoonPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])


  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Starfield */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0">
          <div
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400/20 to-violet-400/20 blur-xl animate-pulse"
            style={{
              left: `${20 + mousePosition.x * 0.02}%`,
              top: `${30 + mousePosition.y * 0.02}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-violet-400/15 to-cyan-400/15 blur-lg animate-pulse"
            style={{
              right: `${15 + mousePosition.x * -0.01}%`,
              bottom: `${25 + mousePosition.y * -0.01}%`,
              transform: "translate(50%, 50%)",
              animationDelay: "1s",
            }}
          />
        </div>

        {/* Nebula Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Floating Rocket Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <LuRocket
                className="w-12 h-12 md:w-16 md:h-16 text-cyan-400 animate-bounce"
                style={{ animationDuration: "3s" }}
              />
              <div className="absolute inset-0 w-12 h-12 md:w-16 md:h-16 bg-cyan-400/20 rounded-full blur-xl animate-pulse" />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-wider text-white mb-6 relative">
            <span
              className="inline-block"
              style={{
                fontFamily: 'ui-monospace, "Courier New", monospace',
                textShadow: "0 0 20px rgba(34, 211, 238, 0.5)",
                letterSpacing: "0.1em",
              }}
            >
              COMING
            </span>
            <br />
            <span
              className="inline-block bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"
              style={{
                fontFamily: 'ui-monospace, "Courier New", monospace',
                letterSpacing: "0.1em",
              }}
            >
              SOON
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto px-4"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            Designing technology that interacts, learns, and empowers.
            Innovation lives where code meets curiosity. 
            <br />
            <span className="text-cyan-400">Something extraordinary is launching soon.</span>
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            {[
              { icon: LuGithub, href: "https://github.com/Anniebhalla16", label: "GitHub" },
              { icon: LuLinkedin, href: "https://www.linkedin.com/in/anniebhalla/", label: "LinkedIn" },
              { icon: LuTwitter, href: "https://x.com/AnnieBhalla16", label: "Twitter" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="group relative p-3 rounded-full bg-white/5 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 hover:bg-white/10"
                aria-label={label}
              >
                <Icon className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                <div className="absolute inset-0 rounded-full bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              </a>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="mt-16">
            <p
              className="text-sm text-gray-500 mb-4"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: "0.1em",
              }}
            >
              DEVELOPMENT PROGRESS
            </p>
            <div className="max-w-xs mx-auto">
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full animate-pulse"
                  style={{ width: "73%" }}
                />
              </div>
              <p className="text-cyan-400 text-sm mt-2 font-semibold">75% Complete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Warp Speed Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${50 + Math.random() * 100}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random()}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
