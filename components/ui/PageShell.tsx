import React from 'react'
import { P } from '../../lib/palette'

interface PageShellProps {
  children: React.ReactNode
  padX?: boolean
}

export default function PageShell({ children, padX = true }: PageShellProps) {
  return (
    <div
      className="page-inner"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        paddingTop: 'clamp(76px,11vh,110px)',
        paddingBottom: 'clamp(80px,10vh,120px)',
        ...(padX
          ? {
              paddingLeft: 'clamp(28px,6vw,110px)',
              paddingRight: 'clamp(28px,6vw,110px)',
            }
          : {}),
        boxSizing: 'border-box',
        color: P.navy,
      }}
    >
      {children}
    </div>
  )
}
