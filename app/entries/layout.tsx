'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import PageShell from '../../components/ui/PageShell'
import Watermark from '../../components/ui/Watermark'
import EntriesNav from '../../components/ui/EntriesNav'

export default function EntriesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Index page manages its own sidebar + layout
  if (pathname === '/entries') return <>{children}</>

  const slug = pathname.replace(/^\/entries\//, '')

  return (
    <PageShell padX={false}>
      <Watermark text="ENTRIES" position="top-center" size="clamp(140px,22vw,340px)" strokeOpacity={0.1} />
      <Watermark text="The Log." position="bottom-right" size="clamp(80px,12vw,180px)" italic strokeOpacity={0.07} />
      <div className="entries-layout">
        <EntriesNav activeSlug={slug} />
        <main style={{ minWidth: 0 }}>
          {children}
        </main>
      </div>
    </PageShell>
  )
}
