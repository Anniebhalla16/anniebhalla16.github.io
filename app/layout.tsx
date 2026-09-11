import type { Metadata } from 'next'
import { Instrument_Serif, Poppins } from 'next/font/google'
import './globals.css'
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
    'Astrophysics, data, and the long habit of looking up. An observation log kept in Munich.',
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: 'Annie Bhalla',
    description:
      'Astrophysics, data, and the long habit of looking up. An observation log kept in Munich.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body style={{ fontFamily: 'var(--font-sans), system-ui, sans-serif' }}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
