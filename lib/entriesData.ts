export const CATS: Record<string, { label: string; color: string; desc: string }> = {
  all:        { label: 'All Entries',      color: '#1B2640', desc: '' },
  space:      { label: 'Space & Missions', color: '#C07B45', desc: 'Analog missions, EVAs, flight ops' },
  research:   { label: 'Research',         color: '#4A7FA5', desc: 'SLAM, navigation, sensor fusion' },
  hackathons: { label: 'Hackathons',       color: '#9B7EC8', desc: 'Competitions & sprints' },
  projects:   { label: 'Projects',         color: '#6BBFA3', desc: 'Things I built' },
  general:    { label: 'General',          color: '#9B8B7A', desc: 'Everything else' },
}

export interface Entry {
  slug: string
  title: string
  cat: string
  date: string
  excerpt: string
  readTime: number
  featured?: boolean
}

export const entries: Entry[] = [
  {
    slug: 'hyperloop',
    title: 'HyperLoop: hyperspectral loop closure for planetary SLAM',
    cat: 'research',
    date: 'Oct 2026',
    excerpt: "Building the first SLAM system that fuses hyperspectral and RGB-D sensing for loop closure on planetary terrain. The null result was the finding: Red-NIR can't see what matters. SWIR is next.",
    readTime: 12,
    featured: true,
  },
  {
    slug: 'loop-closure',
    title: 'What is a Loop Closure?',
    cat: 'research',
    date: 'Oct 2026',
    excerpt: "A robot's worst enemy is drift. Loop closure detection is how SLAM systems recognise a previously seen place and correct accumulated error — in this case, on a simulated planetary surface.",
    readTime: 5,
  },
]
