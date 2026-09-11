import React from 'react'

interface CategoryChipProps {
  label: string
  color: string
  size?: 'sm' | 'md'
}

export default function CategoryChip({ label, color, size = 'sm' }: CategoryChipProps) {
  return (
    <span
      style={{
        fontSize: size === 'md' ? 10 : 9,
        letterSpacing: '.18em',
        textTransform: 'uppercase',
        color,
        padding: '3px 9px',
        border: `1px solid ${color}40`,
        borderRadius: 4,
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  )
}
