import Image from 'next/image'
import styles from './about.module.css'
import { P } from '../../lib/palette'
import PageShell from '../../components/ui/PageShell'
import Watermark from '../../components/ui/Watermark'
import SectionLabel from '../../components/ui/SectionLabel'

const roles = [
  {
    period: '07/2026 – present',
    title: 'Flight Control Team Member',
    org: 'Austrian Space Forum',
    detail: 'AMADEE-27 analog Mars mission — data management, ICD definitions, comms between Flight Crew and Mission Support Center.',
    color: P.cognac,
  },
  {
    period: '10/2025 – present',
    title: 'Software Engineer',
    org: 'Sereact, Stuttgart',
    detail: 'Telemetry & analytics for 100+ robot stations. Event-driven pipelines on RabbitMQ / WebSockets. KPI reliability lifted from 50% to ~95%.',
    color: P.blue,
  },
  {
    period: '01/2024 – 10/2025',
    title: 'Research Student — Master Thesis',
    org: 'DLR-RMC, Oberpfaffenhofen',
    detail: 'Visual navigation fusing hyperspectral + RGB-D with 3DGS SLAM for planetary surface navigation. 42% ATE reduction. IAC 2026 presentation.',
    color: P.muted,
  },
  {
    period: '01 – 08/2026',
    title: 'Analog Astronaut — EVA Lead',
    org: 'Aaka Space Studio, India',
    detail: 'Led 3 EVAs on 8-day lunar analog mission at Dholavira terrain. Supply coordination and scientific data collection.',
    color: P.cognac,
  },
]

const facts = [
  { label: 'Degree', value: 'MSc Computer Science — Autonomous Systems (1.8)', sub: 'University of Stuttgart, 2023–2025' },
  { label: 'Based', value: 'Stuttgart', sub: 'Germany' },
  { label: 'Languages', value: 'English (native) · Hindi (native) · German (B2)', sub: '' },
  { label: 'Callsign', value: 'Aurora', sub: '' },
]

const skills = [
  { cat: 'Navigation & Estimation', items: 'Visual SLAM, 3DGS, 6-DoF state estimation, multi-sensor fusion, stereo depth, hyperspectral imaging' },
  { cat: 'Robotics & Systems', items: 'ROS2, sensor data sync, real-time systems, computer vision, OpenCV, Open3D' },
  { cat: 'Mission Operations', items: 'Flight control ops, ICD & interface definition, ECSS standards, telemetry analysis, data management' },
  { cat: 'Programming', items: 'Python, C++, TypeScript, PyTorch, CUDA, Docker, RabbitMQ, REST APIs' },
]

export default function AboutPage() {
  return (
    <PageShell padX={true}>
      <Watermark text="About" position="bottom-right" strokeOpacity={0.09} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Hero row: headline + photo */}
        <div
          className={styles.heroRow}
          style={{ borderBottom: `1px solid ${P.hairline}` }}
        >
          {/* Left: label + headline + bio */}
          <div>
            <SectionLabel index="04" label="About" />
            <h1
              style={{
                margin: '0 0 clamp(20px,3vh,32px)',
                fontFamily: 'var(--font-serif), Georgia, serif',
                fontWeight: 400,
                fontSize: 'clamp(44px,8vw,108px)',
                lineHeight: 0.92,
                letterSpacing: '-.02em',
                color: P.navy,
              }}
            >
              I&apos;m Annie.
            </h1>
            <p
              style={{
                margin: '0 0 20px',
                fontSize: 'clamp(16px,1.3vw,19px)',
                lineHeight: 1.75,
                color: P.navy,
                maxWidth: 580,
              }}
            >
              I work at the boundary of robotics, autonomous navigation, and space
              exploration. My research at DLR fused hyperspectral and depth data with
              3DGS SLAM for planetary surface navigation. Now I build telemetry
              infrastructure at Sereact and coordinate data flow on an analog Mars
              mission with the Austrian Space Forum.
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(15px,1.1vw,17px)',
                lineHeight: 1.75,
                color: P.muted,
                maxWidth: 560,
              }}
            >
              I&apos;m drawn to problems where you have to reason carefully about
              what you can&apos;t directly see — state estimation, signal through
              noise, decisions under uncertainty. Outside of that, I photograph things
              that are too faint, compete in hackathons, and occasionally walk on
              terrain designed to feel like another planet.
            </p>
          </div>

          {/* Right: photo */}
          <div style={{ position: 'relative' }}>
            <Image
              src="/annie-about.png"
              alt="Annie Bhalla in flight suit in front of space capsule"
              width={400}
              height={533}
              className={styles.photo}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                objectPosition: 'center top',
                borderRadius: 12,
                display: 'block',
                boxShadow: '0 8px 48px rgba(27,38,64,.12)',
              }}
            />
            {/* Caption tag */}
            <div
              style={{
                position: 'absolute',
                bottom: 14,
                left: 14,
                padding: '5px 10px',
                background: 'rgba(251,247,242,.88)',
                backdropFilter: 'blur(8px)',
                borderRadius: 6,
                fontSize: 11,
                color: P.muted,
                letterSpacing: '.08em',
              }}
            >
              Aaka Space Studio · 2026
            </div>
          </div>
        </div>

        {/* Facts grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(24px,3vw,40px)',
          }}
        >
          {facts.map((f) => (
            <div key={f.label}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: '.22em',
                  textTransform: 'uppercase',
                  color: P.muted,
                  marginBottom: 8,
                  fontFamily: 'var(--font-sans), system-ui, sans-serif',
                }}
              >
                {f.label}
              </div>
              <div style={{ fontSize: 14, color: P.navy, fontWeight: 500, marginBottom: f.sub ? 4 : 0 }}>
                {f.value}
              </div>
              {f.sub && (
                <div style={{ fontSize: 12, color: P.muted }}>{f.sub}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
