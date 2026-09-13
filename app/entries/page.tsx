import { getEntries, getCategories } from '../../lib/db'
import EntriesClient from './EntriesClient'

export const revalidate = 3600

export default async function EntriesPage() {
  const [entries, categories] = await Promise.all([getEntries(), getCategories()])
  return <EntriesClient entries={entries} categories={categories} />
}
