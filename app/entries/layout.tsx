import React from 'react'
import { getEntries, getCategories } from '../../lib/db'
import EntriesLayoutClient from './EntriesLayoutClient'

export const revalidate = 3600

export default async function EntriesLayout({ children }: { children: React.ReactNode }) {
  const [entries, categories] = await Promise.all([getEntries(), getCategories()])
  return (
    <EntriesLayoutClient entries={entries} categories={categories}>
      {children}
    </EntriesLayoutClient>
  )
}
