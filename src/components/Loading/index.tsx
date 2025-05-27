"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

export default function Loading() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Stars background
    const stars: { x: number; y: number; radius: number; opacity: number; speed: number }[] = []
    const createStars = () => {
      stars.length = 0
      const starCount = Math.floor((canvas.width * canvas.height) / 3000)

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random(),
          speed: Math.random() * 0.05,
        })
      }
    }

    createStars()

    // Data particles
    const particles: { x: number; y: number; size: number; speed: number; color: string }[] = []
    const createParticles = () => {
      particles.length = 0
      const particleCount = 50

      for (let i = 0; i < particleCount; i++) {
        const colors = ["#4ECDC4", "#19647E", "#28AFB0", "#37FF8B"]
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    createParticles()

    // Animation variables
    let roverX = -100
    const trailPoints: { x: number; y: number; opacity: number }[] = []
    const roverSpeed = 1.5
    const trailLength = 150

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw Mars-like background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#1A1A2E")
      gradient.addColorStop(1, "#541212")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        // Twinkle effect
        star.opacity = Math.sin(Date.now() * star.speed) * 0.5 + 0.5

        // Subtle movement
        star.x += star.speed
        if (star.x > canvas.width) star.x = 0
      })

      // Draw data particles
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Move particles
        particle.y += particle.speed
        if (particle.y > canvas.height) {
          particle.y = 0
          particle.x = Math.random() * canvas.width
        }
      })

      // Update rover position
      roverX += roverSpeed
      if (roverX > canvas.width + 100) roverX = -100

      // Create trail points
      const baseY = canvas.height * 0.6
      const trailY = baseY + Math.sin(roverX * 0.02) * 20

      trailPoints.unshift({ x: roverX, y: trailY, opacity: 1 })
      if (trailPoints.length > trailLength) {
        trailPoints.pop()
      }

      // Draw trail
      for (let i = 1; i < trailPoints.length; i++) {
        const point = trailPoints[i]
        const prevPoint = trailPoints[i - 1]

        // Decrease opacity as we go further from the rover
        point.opacity = 1 - i / trailLength

        // Draw circuit-like trail
        ctx.beginPath()
        ctx.moveTo(prevPoint.x, prevPoint.y)
        ctx.lineTo(point.x, point.y)
        ctx.strokeStyle = `rgba(74, 222, 222, ${point.opacity})`
        ctx.lineWidth = 2
        ctx.stroke()

        // Add circuit nodes
        if (i % 15 === 0) {
          ctx.beginPath()
          ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(74, 222, 222, ${point.opacity})`
          ctx.fill()
        }

        // Add binary code effect
        if (i % 10 === 0) {
          ctx.fillStyle = `rgba(74, 222, 222, ${point.opacity})`
          ctx.font = "10px monospace"
          ctx.fillText(Math.random() > 0.5 ? "1" : "0", point.x + 5, point.y - 5)
        }
      }

      // Draw "Loading..." text
      const loadingProgress = Math.min(1, roverX / (canvas.width * 0.7))
      const loadingText = "Loading..."
      const visibleText = loadingText.substring(0, Math.floor(loadingText.length * loadingProgress))

      ctx.font = "bold 24px sans-serif"
      ctx.fillStyle = "#FFFFFF"
      ctx.textAlign = "center"
      ctx.fillText(visibleText, canvas.width / 2, canvas.height * 0.7)

      // Draw rover
      drawRover(ctx, roverX, trailY)

      // Draw floating drones
      drawDrone(ctx, roverX + 50, trailY - 50, Date.now() * 0.001)
      drawDrone(ctx, roverX - 70, trailY - 30, Date.now() * 0.0015 + 2)

      // Draw holographic data
      drawHolographicData(ctx, roverX, trailY)

      requestAnimationFrame(animate)
    }

    // Draw rover function
    const drawRover = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      // Rover body
      ctx.fillStyle = "#D64933"
      ctx.fillRect(x - 30, y - 25, 60, 20)

      // Rover head/camera
      ctx.fillStyle = "#19647E"
      ctx.fillRect(x + 15, y - 35, 20, 10)

      // Rover wheels
      ctx.fillStyle = "#2C2C54"
      ctx.beginPath()
      ctx.arc(x - 20, y + 5, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x + 20, y + 5, 10, 0, Math.PI * 2)
      ctx.fill()

      // Rover antenna
      ctx.strokeStyle = "#FFFFFF"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(x, y - 25)
      ctx.lineTo(x, y - 45)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x, y - 45, 3, 0, Math.PI * 2)
      ctx.fillStyle = "#FF5E5B"
      ctx.fill()

      // Rover lights
      ctx.beginPath()
      ctx.arc(x + 25, y - 30, 5, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 100, 0.8)"
      ctx.fill()

      // Light beam
      const gradient = ctx.createRadialGradient(x + 25, y - 30, 0, x + 25, y - 30, 100)
      gradient.addColorStop(0, "rgba(255, 255, 100, 0.3)")
      gradient.addColorStop(1, "rgba(255, 255, 100, 0)")
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.moveTo(x + 25, y - 30)
      ctx.lineTo(x + 100, y - 80)
      ctx.lineTo(x + 100, y + 20)
      ctx.closePath()
      ctx.fill()

      // Robotic arm
      const armAngle = Math.sin(Date.now() * 0.001) * 0.2
      ctx.strokeStyle = "#CCCCCC"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(x - 10, y - 15)
      ctx.lineTo(x - 30, y - 30)
      ctx.lineTo(x - 50 + Math.cos(armAngle) * 10, y - 20 + Math.sin(armAngle) * 10)
      ctx.stroke()

      // Claw
      ctx.beginPath()
      ctx.moveTo(x - 50 + Math.cos(armAngle) * 10, y - 20 + Math.sin(armAngle) * 10)
      ctx.lineTo(x - 60 + Math.cos(armAngle) * 10, y - 25 + Math.sin(armAngle) * 10)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x - 50 + Math.cos(armAngle) * 10, y - 20 + Math.sin(armAngle) * 10)
      ctx.lineTo(x - 60 + Math.cos(armAngle) * 10, y - 15 + Math.sin(armAngle) * 10)
      ctx.stroke()
    }

    // Draw drone function
    const drawDrone = (ctx: CanvasRenderingContext2D, x: number, y: number, time: number) => {
      // Drone body
      ctx.fillStyle = "#19647E"
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fill()

      // Drone propellers
      const propellerSpeed = time * 10
      const propellerLength = 10

      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2 + propellerSpeed
        ctx.strokeStyle = "#4ECDC4"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + Math.cos(angle) * propellerLength, y + Math.sin(angle) * propellerLength)
        ctx.stroke()
      }

      // Drone scanning beam
      const scanAngle = Math.sin(time * 2) * 0.5
      const gradient = ctx.createLinearGradient(x, y, x + Math.cos(scanAngle) * 30, y + Math.sin(scanAngle) * 30)
      gradient.addColorStop(0, "rgba(74, 222, 222, 0.8)")
      gradient.addColorStop(1, "rgba(74, 222, 222, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + Math.cos(scanAngle - 0.2) * 30, y + Math.sin(scanAngle - 0.2) * 30)
      ctx.lineTo(x + Math.cos(scanAngle + 0.2) * 30, y + Math.sin(scanAngle + 0.2) * 30)
      ctx.closePath()
      ctx.fill()
    }

    // Draw holographic data
    const drawHolographicData = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      // Data circles
      ctx.strokeStyle = "rgba(74, 222, 222, 0.3)"
      ctx.lineWidth = 1

      const time = Date.now() * 0.001
      const radius = 20 + Math.sin(time) * 5

      ctx.beginPath()
      ctx.arc(x, y - 60, radius, 0, Math.PI * 2)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(x, y - 60, radius * 0.7, 0, Math.PI * 2)
      ctx.stroke()

      // Data lines
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4 + time
        ctx.beginPath()
        ctx.moveTo(x, y - 60)
        ctx.lineTo(x + Math.cos(angle) * (radius + 5), y - 60 + Math.sin(angle) * (radius + 5))
        ctx.stroke()
      }

      // Binary data
      ctx.fillStyle = "rgba(74, 222, 222, 0.7)"
      ctx.font = "8px monospace"

      for (let i = 0; i < 10; i++) {
        const digit = Math.random() > 0.5 ? "1" : "0"
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 30 + radius

        ctx.fillText(digit, x + Math.cos(angle) * distance, y - 60 + Math.sin(angle) * distance)
      }
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1A1A2E] z-50">
      <canvas ref={canvasRef} className="w-full h-full" />

      <motion.div
        className="absolute bottom-10 left-0 right-0 text-center text-white/70 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Annie Bhalla • AI & Robotics Specialist
      </motion.div>
    </div>
  )
}
