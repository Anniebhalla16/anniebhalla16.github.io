import React from 'react'
import { P } from '../../lib/palette'

export default function EntrySectionTitle({ children }: { children: React.ReactNode }) {
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
