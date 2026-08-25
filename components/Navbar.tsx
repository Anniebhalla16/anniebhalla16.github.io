const items = [
  { label: 'Work', href: '/work' },
  { label: 'Studies', href: '/studies' },
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 50,
      }}
    >
      <nav
        style={{
          display: 'flex',
          gap: 28,
          padding: '11px 26px',
          borderRadius: '0 0 999px 999px',
          background: 'rgba(10,12,24,.55)',
          border: '1px solid rgba(232,228,217,.14)',
          borderTop: 'none',
          backdropFilter: 'blur(14px)',
          fontSize: 13.5,
          letterSpacing: '.01em',
        }}
      >
        {items.map((i) => (
          <a key={i.label} href={i.href}>
            {i.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
