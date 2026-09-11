import React from 'react'

type Position = 'top-center' | 'bottom-right' | 'mid-right' | 'bottom-left' | 'top-right'

interface WatermarkProps {
  text: string
  position?: Position
  size?: string
  italic?: boolean
  strokeOpacity?: number
}

const positionStyles: Record<Position, React.CSSProperties> = {
  'top-center': {
    top: 'clamp(50px,8vh,100px)',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  'bottom-right': {
    bottom: -20,
    right: 0,
  },
  'mid-right': {
    top: '52%',
    right: -30,
  },
  'bottom-left': {
    bottom: '8%',
    left: -20,
  },
  'top-right': {
    top: 'clamp(60px,9vh,110px)',
    right: -10,
  },
}

export default function Watermark({
  text,
  position = 'bottom-right',
  size = 'clamp(100px,18vw,260px)',
  italic = false,
  strokeOpacity = 0.1,
}: WatermarkProps) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        ...positionStyles[position],
        fontFamily: 'var(--font-serif), Georgia, serif',
        fontSize: size,
        fontStyle: italic ? 'italic' : 'normal',
        color: 'transparent',
        WebkitTextStroke: `1px rgba(160,113,79,${strokeOpacity})`,
        letterSpacing: '-.01em',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  )
}
