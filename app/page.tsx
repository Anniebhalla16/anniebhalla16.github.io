import StarField from '@/components/StarField'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundImage: 'url(/hero-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#e8e4d9',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(7,8,11,0.62)',
          zIndex: 0,
        }}
      />
      <StarField />
      <Hero />
    </div>
  )
}
