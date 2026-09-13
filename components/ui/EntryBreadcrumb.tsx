import { P } from '../../lib/palette'

interface Props {
  category: string
  categoryColor?: string
}

export default function EntryBreadcrumb({ category, categoryColor = P.cognac }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, fontSize: 12, color: P.muted }}>
      <a href="/entries" style={{ color: P.muted, textDecoration: 'none' }}>← Entries</a>
      <span style={{ opacity: 0.4 }}>/</span>
      <span style={{ color: categoryColor }}>{category}</span>
    </div>
  )
}
