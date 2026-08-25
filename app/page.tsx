import Navbar from '@/components/Navbar'
import StarField from '@/components/StarField'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background:
          'radial-gradient(1100px 640px at 72% 10%, #161a26 0%, rgba(10,11,16,0) 64%), radial-gradient(900px 560px at 16% 96%, #1a1c22 0%, rgba(8,9,13,0) 62%), linear-gradient(#090a0e, #07080b)',
        color: '#e8e4d9',
      }}
    >
      <StarField />
      <Navbar />
      <Hero />
    </div>
  )
}
