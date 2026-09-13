import { P } from '../../lib/palette'

interface FigureProps {
  src: string
  alt: string
  caption?: string
  maxWidth?: number | string
  margin?: string | number
}

export default function Figure({ src, alt, caption, maxWidth, margin = '0' }: FigureProps) {
  return (
    <figure
      style={{
        margin: typeof margin === 'number' ? `${margin}px` : margin,
        ...(maxWidth ? { maxWidth, marginLeft: 'auto', marginRight: 'auto' } : {}),
      }}
    >
      <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${P.hairline}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" style={{ width: '100%', display: 'block' }} />
      </div>
      {caption && (
        <figcaption style={{
          marginTop: 8,
          paddingLeft: 4,
          fontSize: 11,
          lineHeight: 1.6,
          color: P.muted,
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
