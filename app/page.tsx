import Hero from '@/components/sections/Hero'
import Capabilities from '@/components/sections/Capabilities'
import Experience from '@/components/sections/Experience'
import Research from '@/components/sections/Research'
import Philosophy from '@/components/sections/Philosophy'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <Capabilities />
      <Experience />
      <Research />
      <Philosophy />
      <Contact />
    </main>
  )
}
