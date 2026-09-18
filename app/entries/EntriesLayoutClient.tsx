'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import PageShell from '../../components/ui/PageShell'
import Watermark from '../../components/ui/Watermark'
import EntriesNav from '../../components/ui/EntriesNav'
import type { Entry, Category } from '../../lib/db'

interface Props {
  children: React.ReactNode
  entries: Entry[]
  categories: Category[]
}

export default function EntriesLayoutClient({ children, entries, categories }: Props) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (pathname === '/entries') return <>{children}</>

  const slug = pathname.replace(/^\/entries\//, '')

  return (
    <PageShell padX={false}>
      <Watermark text="ENTRIES" position="top-center" size="clamp(140px,22vw,340px)" strokeOpacity={0.1} />
      <Watermark text="The Log." position="bottom-right" size="clamp(80px,12vw,180px)" italic strokeOpacity={0.07} />
      <div
        className="entries-layout"
        style={{ gridTemplateColumns: sidebarOpen ? '220px 1fr' : '44px 1fr' }}
      >
        <EntriesNav
          activeSlug={slug}
          entries={entries}
          categories={categories}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(o => !o)}
        />
        <main style={{ minWidth: 0 }}>
          {children}
        </main>
      </div>
    </PageShell>
  )
}
