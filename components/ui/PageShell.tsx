import React from 'react'
import { P } from '../../lib/palette'

interface PageShellProps {
  children: React.ReactNode
  padX?: boolean
  centered?: boolean
}

export default function PageShell({ children, padX = true, centered = false }: PageShellProps) {
  return (
    <div
      className="page-inner"
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: 'clamp(76px,11vh,110px)',
        paddingBottom: 'clamp(80px,10vh,120px)',
        ...(padX && !centered
          ? {
              paddingLeft: 'clamp(28px,6vw,110px)',
              paddingRight: 'clamp(28px,6vw,110px)',
            }
          : centered
          ? {
              paddingLeft: 'clamp(20px,5vw,40px)',
              paddingRight: 'clamp(20px,5vw,40px)',
            }
          : {}),
        boxSizing: 'border-box',
        color: P.navy,
      }}
    >
      {centered ? (
        <div style={{ maxWidth: 740, margin: '0 auto' }}>
          {children}
        </div>
      ) : children}
    </div>
  )
}
