'use client'

import CategoryChip from '../../../components/ui/CategoryChip'
import SectionLabel from '../../../components/ui/SectionLabel'
import { P } from '../../../lib/palette'

function Stat({ value, label, accent = false }: { value: string; label: string; accent?: boolean }) {
  return (
    <div style={{
      background: P.card,
      border: `1px solid ${P.hairline}`,
      borderRadius: 10,
      padding: '18px 22px',
      textAlign: 'center',
      flex: '1 1 130px',
    }}>
      <div style={{
        fontSize: 24,
        fontWeight: 700,
        color: accent ? P.cognac : P.navy,
        fontFamily: 'var(--font-serif), Georgia, serif',
        lineHeight: 1,
      }}>
        {value}
      </div>
      <div style={{ fontSize: 10, color: P.muted, marginTop: 7, letterSpacing: '.07em', textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      margin: '52px 0 18px',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '.18em',
      textTransform: 'uppercase',
      color: P.cognac,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    }}>
      <span style={{ display: 'inline-block', width: 24, height: 1, background: P.cognac, opacity: 0.4 }} />
      {children}
    </h2>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 11px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 500,
      background: `${P.navy}0A`,
      color: P.navy,
      border: `1px solid ${P.hairline}`,
      marginRight: 6,
      marginBottom: 6,
      opacity: 0.85,
    }}>
      {children}
    </span>
  )
}

function ResultRow({ exp, config, ate, highlight }: {
  exp: string; config: string; ate: string; highlight?: boolean
}) {
  return (
    <tr style={{
      background: highlight ? `${P.cognac}0A` : 'transparent',
      borderBottom: `1px solid ${P.hairline}`,
    }}>
      <td style={{ padding: '10px 14px', fontSize: 13, fontFamily: 'monospace', color: highlight ? P.cognac : P.navy, fontWeight: highlight ? 600 : 400 }}>{exp}</td>
      <td style={{ padding: '10px 14px', fontSize: 13, color: P.muted }}>{config}</td>
      <td style={{ padding: '10px 14px', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-serif), Georgia, serif', color: highlight ? P.cognac : P.navy, textAlign: 'right' }}>{ate}</td>
    </tr>
  )
}

export default function HyperLoopEntry() {
  return (
    <>

      {/* ── Header ── */}
      <div style={{ marginBottom: 12 }}>
        <SectionLabel index="03" label="Research" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <CategoryChip label="Research" color={P.blue} size="sm" />
        <span style={{ fontSize: 11, color: P.muted }}>Oct 2026 · IAC-26.A3.IP.163</span>
      </div>

      {/* ── Title ── */}
      <h1 style={{
        margin: '0 0 14px',
        fontFamily: 'var(--font-serif), Georgia, serif',
        fontWeight: 400,
        fontSize: 'clamp(28px,4vw,50px)',
        lineHeight: 1.1,
        letterSpacing: '-.02em',
        color: P.navy,
      }}>
        HyperLoop: Hyperspectral-Assisted<br />
        <em style={{ color: P.cognac }}>Loop Closure Detection</em> in Planetary SLAM
      </h1>
      <p style={{ margin: '0 0 4px', fontSize: 13, color: P.muted }}>
        Annie Bhalla · Dennis Rotondi · Riccardo Giubilato · Kai O. Arras · Wolfgang Stuerzl
      </p>
      <p style={{ margin: '0 0 44px', fontSize: 12, color: P.muted, opacity: 0.65 }}>
        University of Stuttgart · German Aerospace Center (DLR)
      </p>

      {/* ── Hook ── */}
      <div style={{
        background: P.card,
        borderRadius: 14,
        padding: 'clamp(22px,4vw,36px)',
        marginBottom: 40,
        borderLeft: `3px solid ${P.cognac}`,
      }}>
        <p style={{
          margin: 0,
          fontSize: 'clamp(17px,1.8vw,21px)',
          fontFamily: 'var(--font-serif), Georgia, serif',
          fontWeight: 400,
          lineHeight: 1.6,
          color: P.navy,
          fontStyle: 'italic',
        }}>
          Every location on a planetary surface looks the same.<br />
          What if the robot could tell them apart by{' '}
          <span style={{ color: P.cognac }}>what the rock is made of</span>?
        </p>
      </div>

      {/* ── Stats ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 52 }}>
        <Stat value="4.95 cm" label="Best ATE RMSE" accent />
        <Stat value="43%" label="Error reduction vs baseline" />
        <Stat value="65.5 m" label="Planetary analog dataset" />
        <Stat value="~27 ms" label="Descriptor overhead / frame" />
      </div>

      {/* ── The Problem ── */}
      <SectionTitle>The Problem</SectionTitle>
      <div style={{ lineHeight: 1.85, fontSize: 15, color: P.muted }}>
        <p style={{ margin: '0 0 20px' }}>
          Planetary rovers must navigate and map unknown terrain autonomously — a process called SLAM
          (Simultaneous Localisation and Mapping). As the rover moves, small errors in motion estimation
          accumulate. The only way to correct this drift is{' '}
          <strong style={{ color: P.navy }}>loop closure</strong>: recognising a location the robot has
          visited before, then snapping the map back into consistency.
        </p>

        {/* GIF */}
        <div style={{ margin: '28px 0 24px', borderRadius: 12, overflow: 'hidden', border: `1px solid ${P.hairline}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lc_animation.gif"
            alt="Loop closure correction — 27 PGO iterations from 12.69 cm to 4.90 cm RMSE, real MMOTS-WS E3 SIFT-VLAD data"
            style={{ width: '100%', display: 'block' }}
          />
          <div style={{ padding: '10px 16px', borderTop: `1px solid ${P.hairline}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 11, color: P.muted }}>
              Real data · E3 SIFT-VLAD · MMOTS-WS · 27 iterations · RMSE 12.69 cm → 4.90 cm
            </span>
            <a href="/entries/loop-closure" style={{ fontSize: 11, color: P.cognac, textDecoration: 'none' }}>
              full page →
            </a>
          </div>
        </div>

        <p style={{ margin: '0 0 28px' }}>
          The failure mode has a name: <strong style={{ color: P.navy }}>perceptual aliasing</strong>.
          On planetary terrain — craters, regolith, scattered rocks — visually distinct locations appear
          identical to RGB cameras. A system that cannot tell the difference cannot close the loop, and a
          map that cannot close the loop drifts until it is useless.
        </p>

        {/* Data frame comparison */}
        <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${P.hairline}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/fig_data.png" alt="RGB, Depth, and HSI frames from the same scene — terrain appears identical in RGB" style={{ width: '100%', display: 'block' }} />
          <div style={{ padding: '8px 14px', borderTop: `1px solid ${P.hairline}`, fontSize: 11, color: P.muted }}>
            Same scene — three modalities. RGB and Depth see visually similar terrain everywhere. HSI encodes spectral identity.
          </div>
        </div>
      </div>

      {/* ── The Hypothesis ── */}
      <SectionTitle>The Hypothesis</SectionTitle>
      <div style={{ lineHeight: 1.85, fontSize: 15, color: P.muted }}>
        <p style={{ margin: '0 0 16px' }}>
          Rocks that look identical in RGB often have different mineral composition — and minerals have
          distinctive spectral signatures in the infrared. Hyperspectral cameras capture tens to hundreds
          of narrow wavelength bands per pixel, effectively encoding{' '}
          <em style={{ color: P.navy }}>what a surface is made of</em> rather than how it appears.
        </p>
        <p style={{ margin: '0 0 28px' }}>
          <strong style={{ color: P.navy }}>HyperLoop</strong> is the first framework to integrate
          hyperspectral imaging into the loop closure module of a 3D Gaussian Splatting SLAM system.
          The idea: pair every RGB descriptor with a spectral one. When both agree a location has been
          seen before, trust it. When they disagree, reject it.
        </p>

        {/* Spectra chart */}
        <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${P.hairline}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/fig_spectra.png" alt="Spectral signatures of planetary terrain — Red-NIR nearly identical, SWIR discriminable" style={{ width: '100%', display: 'block' }} />
          <div style={{ padding: '8px 14px', borderTop: `1px solid ${P.hairline}`, fontSize: 11, color: P.muted }}>
            Red-NIR (600–860 nm) sensors cannot separate rock types. Diagnostic mineralogy features only appear in SWIR (900–2500 nm).
          </div>
        </div>
      </div>

      {/* ── Architecture ── */}
      <SectionTitle>Architecture</SectionTitle>
      <div style={{ lineHeight: 1.85, fontSize: 15, color: P.muted }}>
        <p style={{ margin: '0 0 24px' }}>
          HyperLoop extends <strong style={{ color: P.navy }}>LoopSplat</strong> — a 3DGS-based dense
          visual SLAM system with explicit loop closure — by adding a parallel hyperspectral branch.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {([
            {
              label: 'RGB Branch', accent: P.blue,
              items: ['SIFT keypoints → 128-dim local descriptors', 'K-Means visual codebook (K = 8)', 'VLAD aggregation → global descriptor', 'NetVLAD (baseline) or SIFT-VLAD (proposed)'],
            },
            {
              label: 'HSI Branch', accent: P.cognac,
              items: ['Ximea IMEC sensor · 15 bands · 600–860 nm', 'Spatial downsampling + per-pixel spectral normalisation', 'PCA compression: 15D → 6D (95% variance retained)', 'BoSW (TF-IDF histogram) or PCAK-VLAD (residuals)'],
            },
            {
              label: 'Decision-Level Fusion', accent: P.navy,
              items: ['Strict-AND: both modalities must independently exceed threshold', 'Weighted: β·S_RGB + (1-β)·S_HSI, β = 0.4', 'Thresholds set adaptively (top-30% within-submap similarity)', 'Accepted candidates → geometric check → Pose Graph Optimisation'],
            },
          ] as const).map(({ label, accent, items }) => (
            <div key={label} style={{ background: P.card, border: `1px solid ${P.hairline}`, borderLeft: `3px solid ${accent}`, borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: accent, marginBottom: 12, letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {items.map(item => (
                  <li key={item} style={{ fontSize: 13, color: P.muted, display: 'flex', gap: 10 }}>
                    <span style={{ color: accent, opacity: 0.5, flexShrink: 0 }}>›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* RGB + HSI descriptor side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, margin: '24px 0 0', alignItems: 'start' }}>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${P.hairline}` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fig_siftvlad.png" alt="SIFT-VLAD RGB descriptor pipeline" style={{ width: '100%', display: 'block' }} />
            <div style={{ padding: '8px 14px', borderTop: `1px solid ${P.hairline}`, fontSize: 11, color: P.muted }}>
              RGB branch: SIFT keypoints → vocabulary → VLAD descriptor
            </div>
          </div>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${P.hairline}`, width: 260, flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/fig_hsi_descriptor.png" alt="HSI descriptor pipeline — PCA, BoSW, PCAK-VLAD" style={{ width: '100%', display: 'block' }} />
            <div style={{ padding: '8px 14px', borderTop: `1px solid ${P.hairline}`, fontSize: 11, color: P.muted }}>
              HSI branch: PCA → spectral vocab → BoSW / PCAK-VLAD
            </div>
          </div>
        </div>

        {/* Full pipeline diagram */}
        <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${P.hairline}`, margin: '16px 0 0' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/fig_pipeline.png" alt="HyperLoop pipeline — RGB and HSI branches, decision-level fusion, PGO" style={{ width: '100%', display: 'block' }} />
          <div style={{ padding: '8px 14px', borderTop: `1px solid ${P.hairline}`, fontSize: 11, color: P.muted }}>
            Full pipeline: RGB-D frame → submap mapping → parallel RGB + HSI descriptors → fusion gate → geometric verification → PGO
          </div>
        </div>
        <p style={{ margin: '20px 0 0', fontSize: 14 }}>
          Decision-level fusion is chosen because the HSI sensor (40°×20° FOV) covers only a central
          sub-region of the RGB frame (84°×84°). Operating on per-frame descriptors avoids the need for
          precise extrinsic calibration between the two sensors.
        </p>
      </div>

      {/* ── Dataset ── */}
      <SectionTitle>Dataset — MMOTS, DLR</SectionTitle>
      <div style={{ lineHeight: 1.85, fontSize: 15, color: P.muted }}>
        <p style={{ margin: '0 0 20px' }}>
          Data was collected at the{' '}
          <strong style={{ color: P.navy }}>Moon-Mars Outdoor Test Site (MMOTS)</strong> of DLR,
          Oberpfaffenhofen — a purpose-built planetary analog environment with regolith-like soil,
          scattered rocks, and craters.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${P.hairline}` }}>
                {['Sequence', 'Frames', 'Duration', 'Distance', 'Role'].map(h => (
                  <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: P.muted, fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([
                ['MMOTS-WS', '1,072', '133.9 s', '8 m',    'Primary evaluation'],
                ['MMOTS-LL', '1,385', '172.9 s', '15 m',   'Vocabulary training'],
                ['MMOTS-RL', '945',   '119.1 s', '18 m',   'Vocabulary training'],
                ['MMOTS-US', '1,540', '186.0 s', '24.5 m', 'Vocabulary training'],
                ['SS-Sweden','2,100', '262.2 s', '123.3 m','Spectral diversity'],
              ] as const).map(([seq, frames, dur, dist, role], i) => (
                <tr key={seq} style={{ background: i === 0 ? `${P.cognac}07` : 'transparent', borderBottom: `1px solid ${P.hairline}` }}>
                  <td style={{ padding: '9px 12px', fontSize: 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? P.cognac : P.navy }}>{seq}</td>
                  <td style={{ padding: '9px 12px', fontSize: 13, color: P.muted }}>{frames}</td>
                  <td style={{ padding: '9px 12px', fontSize: 13, color: P.muted }}>{dur}</td>
                  <td style={{ padding: '9px 12px', fontSize: 13, color: P.muted }}>{dist}</td>
                  <td style={{ padding: '9px 12px', fontSize: 13, color: P.muted }}>{role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Results ── */}
      <SectionTitle>Results</SectionTitle>
      <div>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${P.hairline}` }}>
                {['Exp.', 'Configuration', 'ATE RMSE'].map(h => (
                  <th key={h} style={{ padding: '8px 14px', textAlign: h === 'ATE RMSE' ? 'right' : 'left', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: P.muted, fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <ResultRow exp="E1"   config="LoopSplat default (unmodified)"  ate="3380.89 cm" />
              <ResultRow exp="E2"   config="NetVLAD, outdoor-tuned"           ate="8.81 cm" />
              <ResultRow exp="E4-B" config="SIFT-VLAD + BoSW, Strict-AND"    ate="5.04 cm" />
              <ResultRow exp="E3"   config="SIFT-VLAD only (best overall)"    ate="4.95 cm" highlight />
            </tbody>
          </table>
        </div>
        {/* ATE bar chart — constrained width, nearly square */}
        <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${P.hairline}`, margin: '24px auto 16px', maxWidth: 560 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/fig_ate.png" alt="ATE RMSE comparison across experiments — E3 SIFT-VLAD best at 4.95 cm" style={{ width: '100%', display: 'block' }} />
          <div style={{ padding: '8px 14px', borderTop: `1px solid ${P.hairline}`, fontSize: 11, color: P.muted }}>
            Aligned ATE RMSE. E3 SIFT-VLAD (4.95 cm) is 43% below the E2 NetVLAD baseline (8.81 cm).
          </div>
        </div>

        {/* Loop closure retrieval precision/recall/F1 */}
        <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${P.hairline}`, marginBottom: '24px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/fig_lc.png" alt="Loop closure retrieval — Precision, Recall, F1 across all experiments" style={{ width: '100%', display: 'block' }} />
          <div style={{ padding: '8px 14px', borderTop: `1px solid ${P.hairline}`, fontSize: 11, color: P.muted }}>
            Loop closure retrieval scores. E4-B (SIFT-VLAD + BoSW, Strict-AND) achieves highest precision (0.24) — more conservative but reliable candidates.
          </div>
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.85, color: P.muted, margin: 0 }}>
          The 43% improvement from E2 to E4-B comes entirely from swapping NetVLAD for SIFT-VLAD.
          Best fusion (E4-B) stays within <strong style={{ color: P.navy }}>1.8%</strong> of best RGB-only (E3).
          Hyperspectral fusion neither helps nor hurts — understanding <em>why</em> is the central finding.
        </p>
      </div>

      {/* ── Key Finding ── */}
      <SectionTitle>The Key Finding</SectionTitle>
      <div style={{ background: P.card, border: `1px solid ${P.hairline}`, borderLeft: `3px solid ${P.cognac}`, borderRadius: 14, padding: '24px 28px' }}>
        <p style={{ margin: '0 0 14px', fontSize: 15, lineHeight: 1.85, color: P.muted }}>
          The <strong style={{ color: P.navy }}>Red-NIR spectral range (600–860 nm)</strong> provides
          limited discriminability for planetary analog terrain. The sensor was designed for agricultural
          vegetation — its range yields almost no material-specific information for rocks and regolith.
        </p>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.85, color: P.muted }}>
          Planetary minerals — pyroxene, olivine, feldspar, phyllosilicates — have diagnostic absorption
          features only in <strong style={{ color: P.cognac }}>SWIR (900–2500 nm)</strong>. The framework
          is ready. The field needs the right sensor.
        </p>
      </div>

      {/* ── Tags & nav ── */}
      <div style={{ marginTop: 52, paddingTop: 24, borderTop: `1px solid ${P.hairline}` }}>
        <div style={{ marginBottom: 20 }}>
          {['SLAM', '3D Gaussian Splatting', 'Loop Closure', 'Hyperspectral Imaging',
            'Planetary Robotics', 'SIFT-VLAD', 'Sensor Fusion', 'DLR', 'IAC 2026'].map(tag => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="/entries/loop-closure" style={{ padding: '10px 20px', borderRadius: 8, background: P.navy, color: '#F5EEE6', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
            Loop closure animation →
          </a>
          <a href="/entries" style={{ padding: '10px 20px', borderRadius: 8, background: 'transparent', color: P.muted, border: `1px solid ${P.hairline}`, fontSize: 13, textDecoration: 'none' }}>
            ← All entries
          </a>
        </div>
      </div>

    </>
  )
}
