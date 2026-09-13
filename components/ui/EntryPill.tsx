import { P } from '../../lib/palette'

export default function EntryPill({ children }: { children: React.ReactNode }) {
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
