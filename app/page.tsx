import StarField from '@/components/StarField'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100dvh',
        backgroundImage: 'url(/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#e8e4d9',
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(7,8,11,0.62)',
          zIndex: 0,
        }}
      />
      {/* StarField clipped to this hero only */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'clip',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <StarField />
      </div>
      {/* Content above everything */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Hero />
      </div>
    </div>
  )
}
