'use client'

import { P } from '../../../../lib/palette'
import PageShell from '../../../../components/ui/PageShell'

export default function LoopClosurePage() {
  return (
    <PageShell centered>

      {/* ── Breadcrumb ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, fontSize: 12, color: P.muted }}>
        <a href="/entries/hyperloop" style={{ color: P.muted, textDecoration: 'none' }}>← HyperLoop</a>
        <span style={{ opacity: 0.4 }}>/</span>
        <span style={{ color: P.cognac }}>Loop Closure</span>
      </div>

      {/* ── Title ── */}
      <h1 style={{
        margin: '0 0 10px',
        fontFamily: 'var(--font-serif), Georgia, serif',
        fontWeight: 400,
        fontSize: 'clamp(24px,3vw,42px)',
        lineHeight: 1.15,
        letterSpacing: '-.02em',
        color: P.navy,
      }}>
        What is <em style={{ color: P.cognac }}>Loop Closure Detection</em>?
      </h1>
      <p style={{ margin: '0 0 40px', fontSize: 13, color: P.muted }}>
        Real trajectory data · E3 SIFT-VLAD · MMOTS-WS dataset · DLR Oberpfaffenhofen
      </p>

      {/* ── GIF ── */}
      <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${P.hairline}`, marginBottom: 10 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/lc_animation.gif"
          alt="Loop closure correction — 27 PGO iterations converging from 12.69 cm to 4.90 cm RMSE on real MMOTS-WS data"
          style={{ width: '100%', display: 'block' }}
        />
      </div>
      <p style={{ margin: '0 0 48px', fontSize: 11, color: P.muted }}>
        E3 · SIFT-VLAD · RGB only · no HSI fusion · MMOTS-WS · 27 iterations · RMSE 12.69 cm → 4.90 cm
      </p>

      {/* ── Explanation cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 48 }}>
        {[
          { step: '01', title: 'Drift accumulates', accent: P.navy,
            body: 'Every pose estimate carries a small error. As the rover moves, errors compound — the estimated trajectory diverges further from the truth with each step.' },
          { step: '02', title: 'A place is recognised', accent: P.cognac,
            body: 'The system compares descriptors from the current frame against past frames. A match above threshold becomes a loop closure candidate.' },
          { step: '03', title: 'Geometric verification', accent: P.blue,
            body: 'The candidate pair undergoes a 3D Gaussian splat overlap check. Only geometrically consistent matches are accepted as confirmed edges.' },
          { step: '04', title: 'Pose graph correction', accent: P.cognac,
            body: 'Confirmed edges are added to the pose graph. Optimisation redistributes accumulated error across the full trajectory — watch the RMSE drop.' },
        ].map(({ step, title, accent, body }) => (
          <div key={step} style={{ background: P.card, border: `1px solid ${P.hairline}`, borderLeft: `3px solid ${accent}`, borderRadius: 10, padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ width: 24, height: 24, borderRadius: '50%', background: `${accent}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: accent, flexShrink: 0 }}>{step}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: accent }}>{title}</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.75, color: P.muted }}>{body}</p>
          </div>
        ))}
      </div>

      {/* ── Key numbers ── */}
      <div style={{ background: P.card, border: `1px solid ${P.hairline}`, borderRadius: 12, padding: '24px 28px', marginBottom: 48 }}>
        <div style={{ fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: P.muted, marginBottom: 20, fontWeight: 600 }}>
          Experiment E3 — Key numbers
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28 }}>
          {[
            { val: '12.69 cm', sub: 'RMSE at iteration 1',          accent: true },
            { val: '4.90 cm',  sub: 'Final RMSE — 27 iterations',   accent: true },
            { val: '27',       sub: 'Loop closure iterations',       accent: false },
            { val: '998',      sub: 'Keyframes in final trajectory', accent: false },
            { val: '8 m',      sub: 'Sequence extent (closed loop)', accent: false },
            { val: '1,072',    sub: 'Synchronised RGB-HSI pairs',    accent: false },
          ].map(({ val, sub, accent }) => (
            <div key={sub}>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-serif), Georgia, serif', color: accent ? P.cognac : P.navy }}>{val}</div>
              <div style={{ fontSize: 11, color: P.muted, marginTop: 4 }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Nav ── */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a href="/entries/hyperloop" style={{ padding: '10px 20px', borderRadius: 8, fontSize: 13, background: P.navy, color: '#F5EEE6', textDecoration: 'none' }}>
          ← HyperLoop entry
        </a>
        <a href="/entries" style={{ padding: '10px 20px', borderRadius: 8, fontSize: 13, background: 'transparent', color: P.muted, border: `1px solid ${P.hairline}`, textDecoration: 'none' }}>
          All entries
        </a>
      </div>

    </PageShell>
  )
}
