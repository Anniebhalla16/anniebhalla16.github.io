import type { Metadata } from 'next'
import { Instrument_Serif, Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const sans = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Annie Bhalla',
  description:
    'Robotics engineer, analog astronaut, and navigator of unexplored terrain. Based in Stuttgart.',
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: 'Annie Bhalla',
    description:
      'Robotics engineer, analog astronaut, and navigator of unexplored terrain. Based in Stuttgart.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        style={{
          fontFamily: 'var(--font-sans), system-ui, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
        }}
      >
        <Navbar />
        <div style={{ flex: 1 }}>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
