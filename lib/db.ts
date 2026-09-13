import { supabase } from './supabase'

export interface Category {
  id: string
  key: string
  label: string
  color: string
  description: string
}

export interface Entry {
  id: string
  slug: string
  title: string
  cat_id: string
  date: string
  excerpt: string
  read_time: number
  featured: boolean
  published: boolean
  created_at: string
  categories: Category
}

export interface TrajectoryEvent {
  id: string
  event_key: string
  date: string
  end_date: string | null
  year: number
  level: number
  cat_id: string
  title: string
  org: string
  detail: string
  entry_id: string | null
  categories: Category
  entries: { slug: string } | null
}

export async function getEntries(): Promise<Entry[]> {
  const { data, error } = await supabase
    .from('entries')
    .select('*, categories(*)')
    .eq('published', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as Entry[]
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('key')
  if (error) throw error
  return data as Category[]
}

export async function getTrajectoryEvents(): Promise<TrajectoryEvent[]> {
  const { data, error } = await supabase
    .from('trajectory_events')
    .select('*, categories(*), entries(slug)')
    .order('year', { ascending: true })
  if (error) throw error
  return data as TrajectoryEvent[]
}
