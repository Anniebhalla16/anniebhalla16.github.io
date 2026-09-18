'use client'

import { useEffect, useRef } from 'react'
import { P } from '../../../../lib/palette'

export default function VideoPlayer() {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.playbackRate = 1.5
  }, [])

  return (
    <div style={{
      borderRadius: 14,
      overflow: 'hidden',
      border: `1px solid ${P.hairline}`,
      marginBottom: 10,
      background: '#0A0A0F',
    }}>
      <video
        ref={ref}
        controls
        autoPlay
        loop
        muted
        playsInline
        style={{ width: '100%', display: 'block', maxHeight: '70vh' }}
        aria-label="MMOTS-WS RGB sequence — planetary analog terrain at DLR Oberpfaffenhofen"
      >
        <source src="/mmots_rgb.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
