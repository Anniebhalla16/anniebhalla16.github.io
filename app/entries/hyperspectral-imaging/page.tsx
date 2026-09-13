'use client'

import React, { useState, useRef, useCallback } from 'react'
import { P } from '../../../lib/palette'
import CategoryChip from '../../../components/ui/CategoryChip'
import SectionLabel from '../../../components/ui/SectionLabel'

// ── Spectral data (based on USGS Spectral Library, splib07) ──────────────────
// 43 samples at 50 nm intervals, 400–2500 nm
const WL = [400,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200,1250,1300,1350,1400,1450,1500,1550,1600,1650,1700,1750,1800,1850,1900,1950,2000,2050,2100,2150,2200,2250,2300,2350,2400,2450,2500] as const

type Mineral = { key: string; name: string; shortName: string; color: string; desc: string; r: readonly number[] }

const MINERALS: Mineral[] = [
  {
    key: 'olivine', name: 'Olivine', shortName: 'Olivine', color: '#4CAF50',
    desc: 'Mg-Fe silicate common in planetary crust. Its broad ~1 μm absorption (Fe²⁺ crystal field) is a key SWIR discriminator — invisible in the Red-NIR range.',
    r: [.50,.51,.52,.53,.54,.54,.53,.50,.46,.42,.37,.34,.33,.34,.40,.48,.54,.56,.57,.57,.55,.55,.55,.56,.57,.58,.60,.61,.61,.61,.60,.61,.62,.62,.62,.61,.59,.61,.63,.64,.64,.65,.65],
  },
  {
    key: 'orthopyroxene', name: 'Orthopyroxene', shortName: 'OPX', color: '#FF9800',
    desc: 'Iron-magnesium pyroxene. Two diagnostic bands: Band I (~920 nm) and Band II (~1850 nm). Both fall outside the HyperLoop sensor range — hence undetectable.',
    r: [.30,.32,.34,.36,.38,.40,.41,.42,.42,.42,.40,.34,.28,.24,.26,.32,.38,.42,.45,.46,.46,.46,.45,.44,.43,.42,.41,.38,.33,.22,.19,.20,.25,.30,.34,.37,.38,.39,.40,.40,.41,.41,.41],
  },
  {
    key: 'clinopyroxene', name: 'Clinopyroxene', shortName: 'CPX', color: '#E91E9C',
    desc: 'Calcium-rich pyroxene dominant in basaltic terrains. Absorptions near 1 and 2 μm distinguish it from OPX — but only in SWIR.',
    r: [.32,.34,.35,.37,.38,.39,.40,.41,.41,.42,.41,.37,.33,.30,.30,.32,.37,.40,.42,.43,.43,.43,.43,.43,.42,.41,.40,.37,.33,.24,.21,.20,.23,.28,.31,.31,.29,.27,.28,.30,.31,.31,.32],
  },
  {
    key: 'phyllosilicate', name: 'Phyllosilicate (Montmorillonite)', shortName: 'Montmorill.', color: '#AB47BC',
    desc: 'Clay formed by water-rock interaction. Sharp absorptions at 1.4 μm (OH stretch), 1.9 μm (H₂O), and 2.2 μm (Al-OH) signal aqueous alteration — a potential biosignature proxy.',
    r: [.62,.62,.63,.63,.63,.63,.63,.63,.63,.63,.63,.63,.63,.63,.63,.63,.63,.62,.62,.59,.49,.44,.57,.62,.63,.63,.63,.62,.60,.48,.36,.35,.52,.59,.62,.61,.44,.40,.52,.59,.61,.62,.62],
  },
  {
    key: 'jarosite', name: 'Jarosite (Mars sulfate)', shortName: 'Jarosite', color: '#FFD600',
    desc: 'Iron sulfate detected on Mars by Opportunity rover at Meridiani Planum. Requires liquid water to form — a key Mars habitability indicator. Diagnostic feature at 2.2 μm.',
    r: [.18,.19,.22,.27,.31,.36,.38,.38,.38,.38,.37,.35,.33,.31,.29,.28,.30,.34,.38,.40,.42,.36,.40,.40,.39,.38,.38,.38,.38,.32,.22,.23,.34,.38,.39,.35,.20,.19,.28,.35,.38,.40,.41],
  },
  {
    key: 'basalt', name: 'Basalt', shortName: 'Basalt', color: '#26C6DA',
    desc: 'Dark volcanic rock dominant at MMOTS-WS and Mars analog terrain. Its uniformly low, featureless reflectance is the poster child for perceptual aliasing.',
    r: [.18,.19,.19,.19,.20,.20,.20,.21,.21,.21,.21,.20,.20,.19,.19,.19,.20,.20,.21,.21,.22,.21,.22,.22,.22,.23,.23,.22,.22,.20,.20,.20,.21,.21,.22,.22,.22,.21,.22,.22,.22,.22,.22],
  },
]

// ── Chart geometry ────────────────────────────────────────────────────────────
const VW = 720, VH = 370
const CM = { t: 32, r: 12, b: 54, l: 52 }
const PW = VW - CM.l - CM.r
const PH = VH - CM.t - CM.b

function xS(wl: number): number { return (wl - 400) / 2100 * PW }
function yS(r: number): number  { return PH * (1 - r) }

function makePath(m: Mineral): string {
  const pts: [number,number][] = WL.map((wl,i) => [xS(wl), yS(m.r[i])])
  const ext: [number,number][] = [pts[0], ...pts, pts[pts.length-1]]
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
  for (let i = 1; i < pts.length; i++) {
    const [x0,y0]=ext[i-1],[x1,y1]=ext[i],[x2,y2]=ext[i+1],[x3,y3]=ext[i+2]
    const c1x=(x1+(x2-x0)/6).toFixed(1), c1y=(y1+(y2-y0)/6).toFixed(1)
    const c2x=(x2-(x3-x1)/6).toFixed(1), c2y=(y2-(y3-y1)/6).toFixed(1)
    d += ` C${c1x},${c1y} ${c2x},${c2y} ${x2.toFixed(1)},${y2.toFixed(1)}`
  }
  return d
}

function atWL(m: Mineral, wl: number): number {
  if (wl <= 400) return m.r[0]
  if (wl >= 2500) return m.r[m.r.length-1]
  const arr = WL as unknown as number[]
  const i = arr.findIndex(w => w > wl) - 1
  if (i < 0) return m.r[0]
  const t = (wl - arr[i]) / (arr[i+1] - arr[i])
  return m.r[i] + t * (m.r[i+1] - m.r[i])
}

// ── Chart ─────────────────────────────────────────────────────────────────────
function SpectraChart({
  visible, highlighted,
}: {
  visible: Set<string>
  highlighted: string | null
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState<{ px: number; wl: number } | null>(null)

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width * VW - CM.l
    if (px < -4 || px > PW + 4) { setCursor(null); return }
    const clamped = Math.max(0, Math.min(PW, px))
    const wl = Math.round(400 + clamped / PW * 2100)
    setCursor({ px: clamped, wl })
  }, [])

  const yTicks = [0, 0.2, 0.4, 0.6, 0.8, 1.0]
  const xTicks = [400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400]

  return (
    <div style={{ position: 'relative' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VW} ${VH}`}
        style={{ width: '100%', display: 'block', userSelect: 'none', cursor: 'crosshair' }}
        onMouseMove={handleMove}
        onMouseLeave={() => setCursor(null)}
      >
        <defs>
          <clipPath id="hsi-clip">
            <rect x={0} y={0} width={PW} height={PH} />
          </clipPath>
        </defs>

        <g transform={`translate(${CM.l},${CM.t})`}>

          {/* ── Shaded spectral regions ── */}
          {/* HyperLoop sensor: 600–860 nm */}
          <rect x={xS(600)} y={0} width={xS(860)-xS(600)} height={PH}
            fill="rgba(160,113,79,.25)" />
          {/* SWIR diagnostic window: 900–2500 nm */}
          <rect x={xS(900)} y={0} width={xS(2500)-xS(900)} height={PH}
            fill="rgba(74,127,165,.09)" />

          {/* ── Y grid ── */}
          {yTicks.map(r => (
            <line key={r} x1={0} y1={yS(r)} x2={PW} y2={yS(r)}
              stroke="rgba(255,255,255,.07)" strokeWidth={r===0||r===1 ? 0.8 : 0.5} />
          ))}

          {/* ── Mineral curves ── */}
          <g clipPath="url(#hsi-clip)">
            {MINERALS.map(m => {
              if (!visible.has(m.key)) return null
              const isHL  = highlighted === m.key
              const isDim = highlighted !== null && !isHL
              return (
                <path key={m.key} d={makePath(m)} fill="none"
                  stroke={m.color}
                  strokeWidth={isHL ? 2.8 : isDim ? 1 : 1.8}
                  strokeOpacity={isDim ? 0.15 : 1}
                  style={{ transition: 'stroke-opacity .18s, stroke-width .18s' }}
                />
              )
            })}
          </g>

          {/* ── Crosshair ── */}
          {cursor && (
            <g>
              <line x1={cursor.px} y1={0} x2={cursor.px} y2={PH}
                stroke="rgba(255,255,255,.35)" strokeWidth={1} strokeDasharray="3 3" />
              {MINERALS.filter(m => visible.has(m.key)).map(m => (
                <circle key={m.key} cx={cursor.px} cy={yS(atWL(m, cursor.wl))} r={3}
                  fill={m.color} stroke="#080E1A" strokeWidth={1} />
              ))}
            </g>
          )}

          {/* ── Region labels (top) ── */}
          <text x={xS(730)} y={14} textAnchor="middle"
            fill="rgba(185,130,80,.95)" fontSize={8.5} fontWeight={700} letterSpacing=".08em">
            HYPERLOOP SENSOR
          </text>
          <text x={xS(730)} y={24} textAnchor="middle"
            fill="rgba(185,130,80,.7)" fontSize={8}>
            600–860 nm
          </text>

          <text x={xS(1700)} y={14} textAnchor="middle"
            fill="rgba(74,127,165,.95)" fontSize={8.5} fontWeight={700} letterSpacing=".08em">
            SWIR DIAGNOSTIC WINDOW
          </text>
          <text x={xS(1700)} y={24} textAnchor="middle"
            fill="rgba(74,127,165,.7)" fontSize={8}>
            900–2500 nm
          </text>

          {/* Spectrally flat label (bottom of sensor region) */}
          <text x={xS(730)} y={PH - 8} textAnchor="middle"
            fill="rgba(185,130,80,.55)" fontSize={7.5} fontStyle="italic">
            spectrally flat —
          </text>
          <text x={xS(730)} y={PH} textAnchor="middle"
            fill="rgba(185,130,80,.55)" fontSize={7.5} fontStyle="italic">
            minerals indistinguishable
          </text>

          {/* ── Absorption feature markers ── */}
          {[
            { wl: 920,  label: 'OPX Band I', sub: '~920' },
            { wl: 1400, label: 'OH',          sub: '~1400' },
            { wl: 1850, label: 'OPX Band II', sub: '~1850' },
            { wl: 1900, label: 'H₂O',         sub: '~1900' },
            { wl: 2200, label: 'Al-OH',        sub: '~2200' },
          ].map(a => (
            <g key={a.wl}>
              <line x1={xS(a.wl)} y1={0} x2={xS(a.wl)} y2={PH}
                stroke="rgba(255,255,255,.12)" strokeWidth={0.5} strokeDasharray="2 5" />
              <text x={xS(a.wl)} y={PH + 12} textAnchor="middle"
                fill="rgba(255,255,255,.45)" fontSize={7.5}>
                {a.label}
              </text>
              <text x={xS(a.wl)} y={PH + 21} textAnchor="middle"
                fill="rgba(255,255,255,.3)" fontSize={6.5}>
                {a.sub} nm
              </text>
            </g>
          ))}

          {/* ── Y axis ── */}
          {yTicks.map(r => (
            <g key={r}>
              <line x1={-4} y1={yS(r)} x2={0} y2={yS(r)}
                stroke="rgba(255,255,255,.25)" strokeWidth={0.8} />
              <text x={-8} y={yS(r)+3.5} textAnchor="end"
                fill="rgba(255,255,255,.4)" fontSize={9}>
                {r.toFixed(1)}
              </text>
            </g>
          ))}
          <text x={-38} y={PH/2} textAnchor="middle"
            fill="rgba(255,255,255,.45)" fontSize={10}
            transform={`rotate(-90,-38,${PH/2})`}>
            Reflectance
          </text>

          {/* ── X axis ── */}
          {xTicks.map(wl => (
            <g key={wl}>
              <line x1={xS(wl)} y1={PH} x2={xS(wl)} y2={PH+4}
                stroke="rgba(255,255,255,.25)" strokeWidth={0.8} />
              <text x={xS(wl)} y={PH+13} textAnchor="middle"
                fill="rgba(255,255,255,.4)" fontSize={9}>
                {wl}
              </text>
            </g>
          ))}
          <text x={PW/2} y={PH+42} textAnchor="middle"
            fill="rgba(255,255,255,.45)" fontSize={10}>
            Wavelength (nm)
          </text>

          {/* Frame */}
          <rect x={0} y={0} width={PW} height={PH} fill="none"
            stroke="rgba(255,255,255,.18)" strokeWidth={0.5} />
        </g>
      </svg>

      {/* ── Floating tooltip ── */}
      {cursor && (
        <div style={{
          position: 'absolute',
          left: `${(CM.l + cursor.px) / VW * 100}%`,
          top: `${CM.t / VH * 100}%`,
          transform: cursor.px > PW * 0.6
            ? 'translate(calc(-100% - 8px), 4px)'
            : 'translate(10px, 4px)',
          background: 'rgba(4,8,20,.93)',
          border: '1px solid rgba(255,255,255,.11)',
          borderRadius: 8,
          padding: '9px 12px',
          pointerEvents: 'none',
          zIndex: 20,
          minWidth: 148,
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{
            fontSize: 10, color: 'rgba(255,255,255,.5)',
            marginBottom: 7, letterSpacing: '.12em', textTransform: 'uppercase',
          }}>
            {cursor.wl} nm
          </div>
          {[...MINERALS]
            .filter(m => visible.has(m.key))
            .map(m => ({ m, r: atWL(m, cursor.wl) }))
            .sort((a,b) => b.r - a.r)
            .map(({ m, r }) => (
              <div key={m.key} style={{
                display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3,
                opacity: highlighted && highlighted !== m.key ? 0.25 : 1,
                transition: 'opacity .15s',
              }}>
                <span style={{ width: 10, height: 2, borderRadius: 1, background: m.color, flexShrink: 0 }} />
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,.65)', flex: 1, whiteSpace: 'nowrap' }}>
                  {m.shortName}
                </span>
                <span style={{
                  fontSize: 10, color: m.color, fontWeight: 600,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {r.toFixed(3)}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function HyperspectralPage() {
  const [visible, setVisible] = useState<Set<string>>(() => new Set(MINERALS.map(m => m.key)))
  const [highlighted, setHighlighted] = useState<string | null>(null)
  const [detail, setDetail] = useState<string | null>(null)

  const toggleMineral = (key: string) => {
    setVisible(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const detailMineral = detail ? MINERALS.find(m => m.key === detail) : null

  const sectionTitle = (text: string) => (
    <h2 style={{
      margin: '52px 0 18px', fontSize: 11, fontWeight: 600,
      letterSpacing: '.18em', textTransform: 'uppercase', color: P.cognac,
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <span style={{ display: 'inline-block', width: 24, height: 1, background: P.cognac, opacity: 0.4 }} />
      {text}
    </h2>
  )

  return (
    <>
      {/* ── Header ── */}
      <div style={{ marginBottom: 12 }}>
        <SectionLabel index="03" label="Research" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <CategoryChip label="Research" color={P.blue} size="sm" />
        <span style={{ fontSize: 11, color: P.muted }}>Oct 2026 · Master's Thesis Extract</span>
      </div>

      <h1 style={{
        margin: '0 0 14px',
        fontFamily: 'var(--font-serif), Georgia, serif',
        fontWeight: 400, fontSize: 'clamp(24px,3.5vw,46px)',
        lineHeight: 1.1, letterSpacing: '-.02em', color: P.navy,
      }}>
        Why Rocks Need More Than RGB:<br />
        <em style={{ color: P.cognac }}>Hyperspectral Imaging</em> for Planetary SLAM
      </h1>
      <p style={{ margin: '0 0 44px', fontSize: 13, color: P.muted }}>
        Annie Bhalla · University of Stuttgart · DLR Oberpfaffenhofen · Master's Thesis, 2025
      </p>

      {/* ── Hook ── */}
      <div style={{
        background: P.card, borderRadius: 14,
        padding: 'clamp(20px,3vw,32px)', marginBottom: 44,
        borderLeft: `3px solid ${P.cognac}`,
      }}>
        <p style={{
          margin: 0,
          fontSize: 'clamp(16px,1.7vw,20px)',
          fontFamily: 'var(--font-serif), Georgia, serif',
          fontWeight: 400, lineHeight: 1.65, color: P.navy, fontStyle: 'italic',
        }}>
          Every rock on a planetary surface looks the same to an RGB camera.
          Hyperspectral imaging sees beyond colour — encoding{' '}
          <span style={{ color: P.cognac }}>what a surface is made of</span>, not how it appears.
        </p>
      </div>

      {/* ── What is HSI ── */}
      {sectionTitle('What is Hyperspectral Imaging?')}
      <div style={{ lineHeight: 1.85, fontSize: 15, color: P.muted, marginBottom: 8 }}>
        <p style={{ margin: '0 0 18px' }}>
          Your phone camera captures three channels — red (~630–700 nm), green (~520–560 nm),
          and blue (~450–490 nm). These correspond to the three cone types in the human eye.
          Conventional cameras are therefore designed to sense only the narrow slice of the
          electromagnetic spectrum that humans perceive as visible light.
        </p>
        <p style={{ margin: '0 0 18px' }}>
          But objects, surfaces, and materials reflect and absorb light across a{' '}
          <strong style={{ color: P.navy }}>much wider range</strong> of wavelengths.
          Extend sensor measurements beyond the three RGB channels into the broader electromagnetic
          spectrum and you arrive at <strong style={{ color: P.navy }}>Spectral Imaging</strong>.
        </p>
        <p style={{ margin: 0 }}>
          <strong style={{ color: P.navy }}>Hyperspectral imaging (HSI)</strong> captures tens to
          hundreds of narrow, contiguous spectral bands per pixel — producing a complete
          reflectance spectrum at every spatial location. This spectrum is a material fingerprint:
          stable across illumination changes, invariant to viewpoint, and encoding chemical composition
          rather than visual appearance. The data is stored as an{' '}
          <strong style={{ color: P.navy }}>image cube</strong> (Height × Width × Bands) — a 3D tensor
          where each pixel is its own spectrum.
        </p>
      </div>

      {/* ── Interactive chart ── */}
      {sectionTitle('Planetary Mineral Absorption Features — Why SWIR Matters')}

      <div style={{
        background: '#080E1A', borderRadius: 16,
        padding: 'clamp(16px,2.5vw,28px) clamp(16px,2.5vw,28px) 16px',
        marginBottom: 8,
        border: '1px solid rgba(255,255,255,.07)',
      }}>
        {/* Chart */}
        <SpectraChart visible={visible} highlighted={highlighted} />

        {/* Legend */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 6,
          marginTop: 20, paddingTop: 16,
          borderTop: '1px solid rgba(255,255,255,.07)',
        }}>
          {MINERALS.map(m => {
            const on = visible.has(m.key)
            const hl = highlighted === m.key
            return (
              <button
                key={m.key}
                onClick={() => toggleMineral(m.key)}
                onMouseEnter={() => setHighlighted(m.key)}
                onMouseLeave={() => setHighlighted(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '5px 10px', borderRadius: 999,
                  border: `1px solid ${on ? m.color + '55' : 'rgba(255,255,255,.1)'}`,
                  background: hl ? m.color + '22' : on ? m.color + '10' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all .15s',
                }}
              >
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: on ? m.color : 'rgba(255,255,255,.2)',
                  transition: 'background .15s',
                }} />
                <span style={{
                  fontSize: 11, color: on ? m.color : 'rgba(255,255,255,.3)',
                  fontWeight: hl ? 600 : 400,
                  transition: 'color .15s',
                  textDecoration: !on ? 'line-through' : 'none',
                }}>
                  {m.shortName}
                </span>
              </button>
            )
          })}
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', alignSelf: 'center', marginLeft: 4 }}>
            click to toggle · hover to isolate
          </span>
        </div>
      </div>

      <p style={{ fontSize: 11, color: P.muted, marginBottom: 44, opacity: 0.7 }}>
        Spectral features based on USGS Spectral Library (splib07) and planetary science literature.
        Curves are approximate representations for educational purposes.
      </p>

      {/* ── Mineral detail cards ── */}
      {sectionTitle('The Minerals')}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 8 }}>
        {MINERALS.map(m => (
          <div
            key={m.key}
            onClick={() => setDetail(detail === m.key ? null : m.key)}
            style={{
              background: P.card, border: `1px solid ${P.hairline}`,
              borderLeft: `3px solid ${m.color}`,
              borderRadius: 10, padding: '14px 18px',
              cursor: 'pointer',
              transition: 'box-shadow .2s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: m.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: P.navy }}>{m.name}</span>
              </div>
              <span style={{ fontSize: 10, color: P.muted, opacity: 0.5 }}>
                {detail === m.key ? '▲' : '▼'}
              </span>
            </div>
            {detail === m.key && (
              <p style={{ margin: '12px 0 0', fontSize: 13, lineHeight: 1.75, color: P.muted, paddingLeft: 20 }}>
                {m.desc}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* ── Why SWIR matters ── */}
      {sectionTitle('The Sensor Problem')}
      <div style={{ lineHeight: 1.85, fontSize: 15, color: P.muted }}>
        <p style={{ margin: '0 0 18px' }}>
          Look at the chart above in the amber-shaded region (600–860 nm) — the range of the
          HyperLoop sensor (Ximea IMEC camera, 15 bands). Every mineral curve converges to a
          similar reflectance level. The terrain is{' '}
          <strong style={{ color: P.navy }}>spectrally flat</strong>: minerals that are chemically
          completely different look almost identical to the sensor.
        </p>
        <p style={{ margin: '0 0 18px' }}>
          Now look at the teal-shaded region (900–2500 nm) — the SWIR diagnostic window.
          The curves <em>diverge dramatically</em>. Orthopyroxene plunges to near-zero at 920 nm
          (Band I) and 1850 nm (Band II). Phyllosilicate shows sharp notches at 1400, 1900, and
          2200 nm. Jarosite has its own distinctive dip at 2200 nm. Each mineral becomes
          <strong style={{ color: P.navy }}> uniquely identifiable</strong>.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 8 }}>
        {[
          { label: 'HyperLoop Sensor Range', range: '600–860 nm', verdict: 'Spectrally flat', ok: false },
          { label: 'SWIR Diagnostic Window', range: '900–2500 nm', verdict: 'Discriminable', ok: true },
        ].map(({ label, range, verdict, ok }) => (
          <div key={label} style={{
            flex: '1 1 200px', background: P.card,
            border: `1px solid ${ok ? P.blue + '44' : P.cognac + '44'}`,
            borderRadius: 10, padding: '16px 20px',
          }}>
            <div style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: P.muted, marginBottom: 8 }}>
              {label}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: ok ? P.blue : P.cognac,
              fontFamily: 'var(--font-serif), Georgia, serif', marginBottom: 4 }}>
              {range}
            </div>
            <div style={{ fontSize: 12, color: ok ? P.blue : P.cognac, fontWeight: 500 }}>
              {verdict}
            </div>
          </div>
        ))}
      </div>

      {/* ── The finding ── */}
      {sectionTitle('The Key Finding')}
      <div style={{
        background: P.card, border: `1px solid ${P.hairline}`,
        borderLeft: `3px solid ${P.cognac}`, borderRadius: 14,
        padding: '22px 26px', marginBottom: 8,
      }}>
        <p style={{ margin: '0 0 14px', fontSize: 15, lineHeight: 1.85, color: P.muted }}>
          The HyperLoop framework demonstrated that integrating the Ximea IMEC Red-NIR sensor
          (600–860 nm) into SLAM loop closure provides <strong style={{ color: P.navy }}>
          limited additional discriminability</strong> for planetary analog terrain.
          The sensor was designed for agricultural vegetation analysis — a domain where Red-NIR
          reflectance differences encode chlorophyll content and plant health.
        </p>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.85, color: P.muted }}>
          For rocks and regolith, the diagnostic mineral absorption features only appear in{' '}
          <strong style={{ color: P.cognac }}>SWIR (900–2500 nm)</strong>. The framework is
          ready. The spectral pipeline works. The field needs the right sensor.
        </p>
      </div>

      {/* ── Tags & nav ── */}
      <div style={{ marginTop: 52, paddingTop: 24, borderTop: `1px solid ${P.hairline}` }}>
        <div style={{ marginBottom: 20 }}>
          {['Hyperspectral Imaging', 'SWIR', 'Planetary Mineralogy', 'SLAM', 'Sensor Fusion',
            'Red-NIR', 'Spectral Library', 'Olivine', 'Orthopyroxene', 'Mars'].map(tag => (
            <span key={tag} style={{
              display: 'inline-block', padding: '4px 11px', borderRadius: 20,
              fontSize: 11, fontWeight: 500,
              background: `${P.navy}0A`, color: P.navy,
              border: `1px solid ${P.hairline}`,
              marginRight: 6, marginBottom: 6, opacity: 0.85,
            }}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="/entries/hyperloop" style={{
            padding: '10px 20px', borderRadius: 8,
            background: P.navy, color: '#F5EEE6',
            fontSize: 13, fontWeight: 500, textDecoration: 'none',
          }}>
            See full HyperLoop paper →
          </a>
          <a href="/entries" style={{
            padding: '10px 20px', borderRadius: 8,
            background: 'transparent', color: P.muted,
            border: `1px solid ${P.hairline}`,
            fontSize: 13, textDecoration: 'none',
          }}>
            ← All entries
          </a>
        </div>
      </div>
    </>
  )
}
