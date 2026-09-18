import { P } from '../../../../lib/palette'
import EntryBreadcrumb from '../../../../components/ui/EntryBreadcrumb'
import VideoPlayer from './VideoPlayer'

function Stat({ value, label, accent = false }: { value: string; label: string; accent?: boolean }) {
  return (
    <div style={{
      background: P.card,
      border: `1px solid ${P.hairline}`,
      borderRadius: 10,
      padding: '16px 20px',
      textAlign: 'center',
      flex: '1 1 120px',
    }}>
      <div style={{
        fontSize: 22,
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

export default function MMOTSDatasetPage() {
  return (
    <>
      <EntryBreadcrumb category="HyperLoop" />

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
        MMOTS-WS — <em style={{ color: P.cognac }}>Planetary Analog Terrain</em>
      </h1>
      <p style={{ margin: '0 0 6px', fontSize: 13, color: P.muted }}>
        Moon-Mars Outdoor Test Site · DLR Oberpfaffenhofen, Germany
      </p>
      <p style={{ margin: '0 0 36px', fontSize: 11, color: P.muted, opacity: 0.7 }}>
        1,506 RGB frames · 8 Hz · primary evaluation sequence · HyperLoop IAC-26.A3.IP.163
      </p>

      {/* ── Video player ── */}
      <VideoPlayer />
      <p style={{ margin: '0 0 40px', fontSize: 11, color: P.muted }}>
        All 1,506 RGB frames from the MMOTS-WS evaluation sequence · captured at 8 Hz · Ardea multicopter rig · DLR, Bavaria
      </p>

      {/* ── Stats ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 44 }}>
        <Stat value="1,506"   label="RGB frames" />
        <Stat value="8 Hz"    label="Capture rate" />
        <Stat value="8 m"     label="Closed loop" accent />
        <Stat value="133.9 s" label="Duration" />
        <Stat value="1,072"   label="Synchronised HSI pairs" />
      </div>

      {/* ── What you're seeing ── */}
      <div style={{
        background: P.card,
        border: `1px solid ${P.hairline}`,
        borderLeft: `3px solid ${P.cognac}`,
        borderRadius: 14,
        padding: '24px 28px',
        marginBottom: 36,
      }}>
        <p style={{
          margin: 0,
          fontSize: 'clamp(15px,1.5vw,18px)',
          fontFamily: 'var(--font-serif), Georgia, serif',
          fontWeight: 400,
          lineHeight: 1.7,
          color: P.navy,
          fontStyle: 'italic',
        }}>
          Every frame looks the same.<br />
          That is not a filming problem — it is{' '}
          <span style={{ color: P.cognac }}>the research problem</span>.
        </p>
      </div>

      <div style={{ lineHeight: 1.85, fontSize: 15, color: P.muted, marginBottom: 40 }}>
        <p style={{ margin: '0 0 18px' }}>
          The MMOTS-WS sequence is the primary evaluation dataset for HyperLoop. The camera rig traces an
          8-metre closed loop across planetary analog terrain — regolith-like soil, scattered rocks, small
          craters — at DLR&apos;s Moon-Mars Outdoor Test Site in Oberpfaffenhofen, Bavaria.
        </p>
        <p style={{ margin: '0 0 18px' }}>
          What you see in this sequence is exactly what makes planetary SLAM hard:{' '}
          <strong style={{ color: P.navy }}>perceptual aliasing</strong>. Every patch of terrain appears
          nearly identical to a camera. There are no buildings, no road markings, no landmarks that an
          RGB system can distinguish. The unmodified LoopSplat baseline, applied to this sequence without
          modification, produces a trajectory error of{' '}
          <strong style={{ color: P.cognac }}>3,380 cm</strong> — a complete navigation failure.
        </p>
        <p style={{ margin: 0 }}>
          HyperLoop&apos;s best result on this sequence: <strong style={{ color: P.navy }}>4.95 cm</strong>.
        </p>
      </div>

      {/* ── Nav ── */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingTop: 20, borderTop: `1px solid ${P.hairline}` }}>
        <a href="/entries/hyperloop" style={{
          padding: '10px 20px', borderRadius: 8, fontSize: 13,
          background: P.navy, color: '#F5EEE6', textDecoration: 'none', fontWeight: 500,
        }}>
          ← Full HyperLoop entry
        </a>
        <a href="/entries/loop-closure" style={{
          padding: '10px 20px', borderRadius: 8, fontSize: 13,
          background: P.card, color: P.navy, textDecoration: 'none',
          border: `1px solid ${P.hairline}`, fontWeight: 500,
        }}>
          Loop closure animation →
        </a>
      </div>
    </>
  )
}
