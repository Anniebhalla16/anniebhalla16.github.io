import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Annie Bhalla | Autonomous Systems Engineer',
  description:
    'Software Engineer & Autonomous Systems MSc graduate specializing in planetary robotics, real-time diagnostics, and space mission operations. Targeting flight software, planetary SLAM, and autonomous space systems.',
  keywords: [
    'aerospace engineer',
    'autonomous systems',
    'robotics',
    'SLAM',
    'planetary exploration',
    'space software',
    'ROS2',
    '3D Gaussian Splatting',
  ],
  openGraph: {
    title: 'Annie Bhalla | Autonomous Systems Engineer',
    description: 'Engineering Autonomy for the Next Frontier.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <body className="bg-space-900 text-slate-200 antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
