'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { P } from '../../lib/palette'
import PageShell from '../../components/ui/PageShell'
import Watermark from '../../components/ui/Watermark'
import SectionLabel from '../../components/ui/SectionLabel'
import CategoryChip from '../../components/ui/CategoryChip'

const CAT: Record<string, { label: string; color: string }> = {
  roles:     { label: 'Roles',      color: '#6BBFA3' },
  research:  { label: 'Research',   color: '#4A7FA5' },
  space:     { label: 'Space',      color: '#C07B45' },
  hackathon: { label: 'Hackathons', color: '#9B7EC8' },
  project:   { label: 'Projects',   color: '#C8A45E' },
  academic:  { label: 'Academic',   color: '#9B8B7A' },
}

type Cat = keyof typeof CAT

interface Evt {
  id: string
  date: string
  year: number
  level: number
  cat: Cat
  title: string
  org: string
  detail: string
}

const events: Evt[] = [
  {
    id: 'msc-start', date: '09/2023', year: 2023.7, level: 3,
    cat: 'academic', title: 'MSc CS — Autonomous Systems', org: 'University of Stuttgart',
    detail: 'Started Masters programme. Focus on robotics, state estimation, and sensor fusion.',
  },
  {
    id: 'dlr', date: '01/2024', year: 2024.0, level: 7.5,
    cat: 'research', title: 'Research Student — Master Thesis', org: 'DLR-RMC, Oberpfaffenhofen',
    detail: 'Visual navigation fusing hyperspectral + RGB-D data with 3DGS SLAM for planetary surface navigation. 42% ATE reduction.',
  },
  {
    id: 'msc-grad', date: '10/2025', year: 2025.75, level: 5,
    cat: 'academic', title: 'MSc Completed — Grade 1.8', org: 'University of Stuttgart',
    detail: 'Graduated with distinction. Thesis on visual planetary navigation accepted.',
  },
  {
    id: 'sereact', date: '10/2025', year: 2025.85, level: 6.5,
    cat: 'roles', title: 'Software Engineer', org: 'Sereact, Stuttgart',
    detail: 'Telemetry & analytics infrastructure for 100+ robot stations. Event-driven pipelines on RabbitMQ / WebSockets. KPI reliability lifted from 50% → ~95%.',
  },
  {
    id: 'aaka', date: '01/2026', year: 2026.05, level: 7,
    cat: 'space', title: 'Analog Astronaut — EVA Lead', org: 'Aaka Space Studio, India',
    detail: 'Led 3 EVAs on 8-day lunar analog mission at Dholavira terrain. Supply coordination and scientific data collection.',
  },
  {
    id: 'oewf', date: '07/2026', year: 2026.5, level: 9.2,
    cat: 'space', title: 'Flight Control Team Member', org: 'Austrian Space Forum',
    detail: 'AMADEE-27 analog Mars mission — data management, ICD definitions, comms between Flight Crew and Mission Support Center.',
  },
  {
    id: 'iac', date: '10/2026', year: 2026.78, level: 8.5,
    cat: 'research', title: 'IAC 2026 — Paper Presentation', org: 'International Astronautical Congress',
    detail: 'Presenting visual navigation research for planetary surfaces using 3DGS SLAM and hyperspectral fusion.',
  },
]

const VW = 1000
const VH = 260
const PL = 30, PR = 30, PT = 24, PB = 52
const DEFAULT_RANGE: [number, number] = [2023.0, 2027.4]
const MIN_YEAR = 2020
const MAX_YEAR = 2029

const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function clampRange(min: number, max: number): [number, number] {
  const range = max - min
  const lo = Math.max(MIN_YEAR, min)
  const hi = Math.min(MAX_YEAR, lo + range)
  return [hi - range < MIN_YEAR ? MIN_YEAR : hi - range, hi]
}

export default function TrajectoryPage() {
  const [viewRange, setViewRange] = useState<[number, number]>(DEFAULT_RANGE)
  const viewRangeRef = useRef<[number, number]>(DEFAULT_RANGE)
  const svgRef = useRef<SVGSVGElement>(null)
  const dragRef = useRef<{ startX: number; startVMin: number; startVMax: number } | null>(null)
  const draggedRef = useRef(false)
  const touchStartRef = useRef<{ x: number; vMin: number; vMax: number } | null>(null)
  const pinchRef = useRef<{ dist: number; vMin: number; vMax: number; centerYear: number } | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [filter, setFilter] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => { viewRangeRef.current = viewRange }, [viewRange])

  const xp = useCallback((year: number, vr = viewRangeRef.current) => {
    return PL + ((year - vr[0]) / (vr[1] - vr[0])) * (VW - PL - PR)
  }, [])

  const yp = (level: number) => PT + ((10 - level) / 9) * (VH - PT - PB)

  const getTouchDist = (t: TouchList) => {
    const dx = t[0].clientX - t[1].clientX
    const dy = t[0].clientY - t[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  // Touch pan + pinch zoom — non-passive so preventDefault blocks page scroll
  useEffect(() => {
    const el = svgRef.current
    if (!el) return

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const [vMin, vMax] = viewRangeRef.current
        touchStartRef.current = { x: e.touches[0].clientX, vMin, vMax }
        draggedRef.current = false
        pinchRef.current = null
      } else if (e.touches.length === 2) {
        const [vMin, vMax] = viewRangeRef.current
        const rect = el.getBoundingClientRect()
        const centerClientX = (e.touches[0].clientX + e.touches[1].clientX) / 2
        const svgX = ((centerClientX - rect.left) / rect.width) * VW
        const centerYear = vMin + ((svgX - PL) / (VW - PL - PR)) * (vMax - vMin)
        pinchRef.current = { dist: getTouchDist(e.touches), vMin, vMax, centerYear }
        touchStartRef.current = null
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (e.touches.length === 1 && touchStartRef.current) {
        const { x, vMin, vMax } = touchStartRef.current
        const dx = e.touches[0].clientX - x
        if (Math.abs(dx) > 4) draggedRef.current = true
        const rect = el.getBoundingClientRect()
        const chartPx = rect.width * (VW - PL - PR) / VW
        const range = vMax - vMin
        const yearDelta = -(dx * range) / chartPx
        setViewRange(clampRange(vMin + yearDelta, vMin + yearDelta + range))
      } else if (e.touches.length === 2 && pinchRef.current) {
        const { dist: startDist, vMin, vMax, centerYear } = pinchRef.current
        const scale = startDist / getTouchDist(e.touches)
        const newRange = Math.max(0.3, Math.min(12, (vMax - vMin) * scale))
        const ratio = (centerYear - vMin) / (vMax - vMin)
        const newMin = centerYear - ratio * newRange
        setViewRange(clampRange(newMin, newMin + newRange))
      }
    }

    const onTouchEnd = () => {
      touchStartRef.current = null
      pinchRef.current = null
    }

    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  // Wheel zoom — must be non-passive to call preventDefault
  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - rect.left
      const svgX = (relX / rect.width) * VW
      const [vMin, vMax] = viewRangeRef.current
      const pivotYear = vMin + ((svgX - PL) / (VW - PL - PR)) * (vMax - vMin)
      const factor = e.deltaY > 0 ? 1.18 : 0.84
      const newRange = Math.max(0.3, Math.min(12, (vMax - vMin) * factor))
      const ratio = (pivotYear - vMin) / (vMax - vMin)
      const newMin = pivotYear - ratio * newRange
      setViewRange(clampRange(newMin, newMin + newRange))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current!.getBoundingClientRect()
    const [vMin, vMax] = viewRange
    dragRef.current = { startX: e.clientX, startVMin: vMin, startVMax: vMax }
    draggedRef.current = false
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragRef.current) return
    const rect = svgRef.current!.getBoundingClientRect()
    const { startX, startVMin, startVMax } = dragRef.current
    if (Math.abs(e.clientX - startX) > 4) draggedRef.current = true
    const chartPx = rect.width * (VW - PL - PR) / VW
    const yearsPerPx = (startVMax - startVMin) / chartPx
    const yearDelta = -(e.clientX - startX) * yearsPerPx
    const range = startVMax - startVMin
    setViewRange(clampRange(startVMin + yearDelta, startVMin + yearDelta + range))
  }

  const handleMouseUp = () => {
    dragRef.current = null
    setIsDragging(false)
  }

  const handleDotClick = (id: string) => {
    if (draggedRef.current) return
    setSelected(id)
    setHovered(id)
    document.getElementById(`evt-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  // X-axis ticks: years when wide, quarters when medium, months when zoomed
  const xTicks = useMemo(() => {
    const [vMin, vMax] = viewRange
    const span = vMax - vMin
    const ticks: { year: number; label: string; major: boolean }[] = []

    if (span > 2.5) {
      // Year ticks
      for (let y = Math.ceil(vMin); y <= Math.floor(vMax) + 1; y++) {
        if (y >= vMin - 0.1 && y <= vMax + 0.1) ticks.push({ year: y, label: String(y), major: true })
      }
    } else if (span > 0.9) {
      // Quarter ticks
      const startY = Math.floor(vMin)
      for (let y = startY; y <= Math.ceil(vMax); y++) {
        for (let q = 0; q < 4; q++) {
          const yr = y + q * 0.25
          if (yr >= vMin - 0.05 && yr <= vMax + 0.05) {
            const m = q * 3
            ticks.push({ year: yr, label: m === 0 ? String(y) : MONTH_ABBR[m], major: m === 0 })
          }
        }
      }
    } else {
      // Month ticks
      const startY = Math.floor(vMin)
      for (let y = startY; y <= Math.ceil(vMax); y++) {
        for (let m = 0; m < 12; m++) {
          const yr = y + m / 12
          if (yr >= vMin - 0.04 && yr <= vMax + 0.04) {
            ticks.push({ year: yr, label: m === 0 ? String(y) : MONTH_ABBR[m], major: m === 0 })
          }
        }
      }
    }
    return ticks
  }, [viewRange])

  const sortedEvts = useMemo(() => [...events].sort((a, b) => a.year - b.year), [])
  const visibleLine = sortedEvts.filter(e => e.year >= viewRange[0] - 0.1 && e.year <= viewRange[1] + 0.1)
  const linePts = visibleLine.map(e => `${xp(e.year, viewRange)},${yp(e.level)}`).join(' ')

  const listEvents = useMemo(() =>
    [...events].filter(e => !filter || e.cat === filter).sort((a, b) => b.year - a.year),
  [filter])

  const hovEvt = events.find(e => e.id === hovered)

  const isZoomed = viewRange[0] !== DEFAULT_RANGE[0] || viewRange[1] !== DEFAULT_RANGE[1]

  return (
    <PageShell padX={true}>
      {/* Watermark 1 — top, full-bleed centered */}
      <Watermark text="AURORA" position="top-center" size="clamp(160px,26vw,400px)" strokeOpacity={0.13} />
      {/* Watermark 2 — mid-page, right-anchored, smaller, italic */}
      <Watermark text="Trajectory" position="mid-right" size="clamp(80px,14vw,200px)" italic strokeOpacity={0.08} />
      {/* Watermark 3 — bottom, left-anchored */}
      <Watermark text="AURORA" position="bottom-left" strokeOpacity={0.07} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: 'clamp(28px,4vh,48px)' }}>
          <SectionLabel index="02" label="Trajectory" />
          <h1 style={{ margin: '0 0 clamp(12px,1.5vh,18px)', fontFamily: 'var(--font-serif), Georgia, serif', fontWeight: 400, fontSize: 'clamp(44px,8vw,108px)', lineHeight: 0.92, letterSpacing: '-.02em' }}>
            <span style={{ color: P.navy }}>The</span>
            <br />
            <em style={{ fontStyle: 'italic', color: P.cognac }}>Trajectory.</em>
          </h1>
          <p style={{ margin: 0, fontSize: 'clamp(15px,1.1vw,17px)', lineHeight: 1.75, color: P.muted, maxWidth: 500 }}>
            Every role, mission, paper, and build.
          </p>
        </div>

        {/* Chart panel */}
        <div style={{
          background: 'linear-gradient(160deg, #020608 0%, #060e1a 100%)',
          borderRadius: 16,
          padding: 'clamp(20px,3vw,36px)',
          marginBottom: 'clamp(48px,8vh,80px)',
          border: '1px solid rgba(119,141,169,.18)',
          boxShadow: '0 8px 40px rgba(13,27,42,.22)',
        }}>

          {/* Chart top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(224,225,221,.35)' }}>
              Every record
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 10, color: 'rgba(224,225,221,.25)', letterSpacing: '.06em' }}>
                drag to pan · pinch to zoom
              </span>
              {/* Zoom controls */}
              <div style={{ display: 'flex', gap: 4 }}>
                {[
                  { label: '−', action: () => { const [a,b] = viewRange; const c=(a+b)/2; const r=Math.min(12,(b-a)*1.5); setViewRange(clampRange(c-r/2,c+r/2)) } },
                  { label: '+', action: () => { const [a,b] = viewRange; const c=(a+b)/2; const r=Math.max(0.3,(b-a)*0.6); setViewRange(clampRange(c-r/2,c+r/2)) } },
                ].map(btn => (
                  <button key={btn.label} onClick={btn.action} style={{ width: 26, height: 26, borderRadius: 5, background: 'rgba(119,141,169,.15)', border: '1px solid rgba(119,141,169,.2)', color: 'rgba(224,225,221,.55)', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
                    {btn.label}
                  </button>
                ))}
                {isZoomed && (
                  <button onClick={() => setViewRange(DEFAULT_RANGE)} style={{ height: 26, padding: '0 10px', borderRadius: 5, background: 'rgba(119,141,169,.12)', border: '1px solid rgba(119,141,169,.18)', color: 'rgba(224,225,221,.4)', fontSize: 10, letterSpacing: '.1em', cursor: 'pointer' }}>
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* SVG */}
          <svg
            ref={svgRef}
            viewBox={`0 0 ${VW} ${VH}`}
            style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible', cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none', touchAction: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <defs>
              <clipPath id="chart-area">
                <rect x={PL - 2} y={PT - 4} width={VW - PL - PR + 4} height={VH - PT - PB + 4} />
              </clipPath>
            </defs>
            {/* Grid lines */}
            {[2,4,6,8,10].map(l => (
              <line key={l} x1={PL} y1={yp(l)} x2={VW-PR} y2={yp(l)} stroke="rgba(119,141,169,.1)" strokeWidth={1} />
            ))}

            {/* X-axis tick lines + labels */}
            {xTicks.map((t, i) => {
              const x = xp(t.year, viewRange)
              if (x < PL - 5 || x > VW - PR + 5) return null
              return (
                <g key={i}>
                  <line x1={x} y1={PT} x2={x} y2={VH - PB + 6} stroke={t.major ? 'rgba(119,141,169,.15)' : 'rgba(119,141,169,.07)'} strokeWidth={1} strokeDasharray={t.major ? 'none' : '2 4'} />
                  <text x={x} y={VH - 10} textAnchor="middle" fill={t.major ? 'rgba(224,225,221,.45)' : 'rgba(224,225,221,.22)'} fontSize={t.major ? 13 : 10} fontFamily="system-ui, sans-serif" fontWeight={t.major ? 500 : 400}>
                    {t.label}
                  </text>
                </g>
              )
            })}

            {/* Connector polyline — clipped to chart area */}
            {linePts && (
              <polyline points={linePts} fill="none" stroke="rgba(119,141,169,.3)" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" clipPath="url(#chart-area)" />
            )}

            {/* Dots — clipped to chart area */}
            <g clipPath="url(#chart-area)">
            {sortedEvts.map(e => {
              const cx = xp(e.year, viewRange)
              const cy = yp(e.level)
              if (cx < PL - 20 || cx > VW - PR + 20) return null
              const color = CAT[e.cat]?.color ?? '#778da9'
              const isHov = hovered === e.id
              const dimmed = filter !== null && filter !== e.cat
              return (
                <g key={e.id} style={{ opacity: dimmed ? 0.15 : 1, transition: 'opacity 0.25s' }}>
                  {selected === e.id && <circle cx={cx} cy={cy} r={15} fill="none" stroke={color} strokeWidth={1} opacity={0.35} />}
                  <circle cx={cx} cy={cy} r={isHov ? 11 : 7.5} fill="none" stroke={color} strokeWidth={isHov ? 2 : 1.5} style={{ transition: 'r 0.15s' }} />
                  <circle cx={cx} cy={cy} r={isHov ? 5 : 3} fill={color} style={{ transition: 'r 0.15s' }} />
                  <circle cx={cx} cy={cy} r={20} fill="transparent" style={{ cursor: 'pointer' }}
                    onMouseEnter={ev => { ev.stopPropagation(); setHovered(e.id) }}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleDotClick(e.id)}
                  />
                </g>
              )
            })}
            </g>

            {/* Hover label — intentionally outside clipPath so it can overflow */}
            {hovEvt && (() => {
              const cx = xp(hovEvt.year, viewRange)
              const cy = yp(hovEvt.level)
              const color = CAT[hovEvt.cat]?.color ?? '#778da9'
              const above = cy > 80
              const labelY = above ? cy - 22 : cy + 32
              const clampedX = Math.min(Math.max(cx, 140), VW - 140)
              return (
                <g pointerEvents="none">
                  <text x={clampedX} y={labelY} textAnchor="middle" fill={color} fontSize={12} fontFamily="system-ui, sans-serif" fontWeight={600}>
                    {hovEvt.title}
                  </text>
                  <text x={clampedX} y={labelY + 16} textAnchor="middle" fill="rgba(224,225,221,.5)" fontSize={10} fontFamily="system-ui, sans-serif">
                    {hovEvt.org} · {hovEvt.date}
                  </text>
                </g>
              )
            })()}
          </svg>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 'clamp(12px,2vw,24px)', flexWrap: 'wrap', marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(119,141,169,.1)' }}>
            {Object.entries(CAT).map(([key, val]) => {
              const active = filter === key
              return (
                <button key={key} onClick={() => setFilter(active ? null : key)} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: active ? val.color : 'transparent', border: `1.5px solid ${val.color}`, display: 'inline-block', boxShadow: active ? `0 0 8px 1px ${val.color}55` : 'none', transition: 'all 0.2s' }} />
                  <span style={{ fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: active ? val.color : 'rgba(224,225,221,.38)', transition: 'color 0.2s' }}>
                    {val.label}
                  </span>
                </button>
              )
            })}
            {filter && (
              <button onClick={() => setFilter(null)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(224,225,221,.22)' }}>
                Clear ×
              </button>
            )}
          </div>
        </div>

        {/* Event list */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
            <div style={{ fontSize: 10.5, letterSpacing: '.24em', textTransform: 'uppercase', color: P.muted, fontFamily: 'var(--font-sans), system-ui, sans-serif' }}>
              {filter ? CAT[filter].label : 'All records'}
            </div>
            <div style={{ fontSize: 11, color: P.muted, opacity: 0.6 }}>
              {listEvents.length} {listEvents.length === 1 ? 'record' : 'records'}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {listEvents.map((e, i) => {
              const color = CAT[e.cat]?.color ?? P.blue
              const isSelected = selected === e.id
              return (
                <div key={e.id} id={`evt-${e.id}`} style={{ display: 'grid', gridTemplateColumns: '8px 1fr', gap: '0 20px', borderRadius: 12, transition: 'background 0.3s, box-shadow 0.3s', background: isSelected ? `${color}0c` : 'transparent', boxShadow: isSelected ? `inset 0 0 0 1px ${color}28` : 'none', padding: '12px 16px', margin: '0 -16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                    {i < listEvents.length - 1 && <div style={{ width: 1, flex: 1, background: P.hairline, marginTop: 6, minHeight: 32 }} />}
                  </div>
                  <div style={{ paddingBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                      <CategoryChip label={CAT[e.cat]?.label} color={color} size="sm" />
                      <span style={{ fontSize: 11, color: P.muted }}>{e.date}</span>
                    </div>
                    <div style={{ fontSize: 'clamp(15px,1.2vw,17px)', fontWeight: 600, color: P.navy, marginBottom: 3 }}>{e.title}</div>
                    <div style={{ fontSize: 13, color, marginBottom: 10 }}>{e.org}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.65, color: P.muted }}>{e.detail}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
