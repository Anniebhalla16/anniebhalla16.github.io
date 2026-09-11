import React from 'react'
import { P } from '../../lib/palette'

interface SectionLabelProps {
  index: string
  label: string
}

export default function SectionLabel({ index, label }: SectionLabelProps) {
  return (
    <div
      style={{
        fontSize: 11,
        letterSpacing: '.26em',
        textTransform: 'uppercase',
        color: P.muted,
        marginBottom: 20,
        fontFamily: 'var(--font-sans), system-ui, sans-serif',
      }}
    >
      {index} · {label}
    </div>
  )
}
