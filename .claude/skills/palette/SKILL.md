---
description: Design system and color palette for anniebhalla16.github.io — read this before touching any UI. Enforces consistent palette, typography, spacing, and component patterns across all pages.
---

# Design System — anniebhalla16.github.io

**RULE #1: Never introduce custom colors.** All colors come from `lib/palette.ts`. No hex literals in component files except those defined below.

---

## Palette — `lib/palette.ts`

```ts
export const P = {
  navy:     '#1B2640',              // primary text, headings, buttons
  cognac:   '#A0714F',              // accent — links, highlights, active states, emphasis
  blue:     '#4A7FA5',              // secondary accent — research/tech contexts
  muted:    '#9B8B7A',              // body text, labels, captions, secondary info
  hairline: 'rgba(160,113,79,.15)', // all borders and dividers
  card:     '#FBF7F2',              // card backgrounds, inset panels
  bg:       '#F5EEE6',              // page background (set globally, rarely needed inline)
}
```

### When to use each token
| Token | Use | Never use for |
|---|---|---|
| `P.navy` | Headings, primary body, nav text, CTA button bg | Decorative splashes |
| `P.cognac` | Accent text, hover states, active nav, featured labels, left-border accents | Background fills > 10% opacity |
| `P.blue` | Research/tech category chips, secondary accents | Main headings |
| `P.muted` | Body paragraphs, captions, metadata, table cells | Headings |
| `P.hairline` | All `border` values, `<hr>` equivalents | Shadows |
| `P.card` | Card bg, `<aside>` bg, inset boxes, table row highlights (cognac @ 7% over card) | Page background |
| `P.bg` | Body bg only (set in globals.css) | Component-level bg |

---

## Typography

- **Serif** `var(--font-serif)` — Instrument Serif 400/400i. Use for: page H1, hero text, pull-quotes, stat values, italic emphasis.
- **Sans** `var(--font-sans)` — Poppins 300/400/500/600. Use for: all body copy, labels, buttons, nav.
- Never set `font-family` to a raw string — always use the CSS variables.

### Scale (fluid, use `clamp`)
| Role | Size |
|---|---|
| Page H1 | `clamp(28px, 4vw, 52px)` |
| Section H2 | `clamp(24px, 2.8vw, 36px)` |
| Section label | `10–13px`, `letterSpacing: '.16em'`, `textTransform: uppercase`, `fontWeight: 600` |
| Body | `15px`, `lineHeight: 1.85` |
| Caption / meta | `11–12px` |
| Small label | `10–11px`, uppercase, tracked |

---

## Spacing & Layout

- Page padding: use `PageShell` component — never re-implement padding manually.
- Max content width: **820px** for reading columns, **1000px** for wider content (tables, GIFs, figures).
- Section top margin: `52px`. Section title margin-bottom: `18px`.
- Card padding: `18–28px` depending on size.
- Gap between cards: `12–16px`.

---

## Components

### `PageShell`
Wraps every page. Handles top/bottom padding and horizontal padding. Always use it — never wrap pages in custom `<div>` with manual padding.

```tsx
import PageShell from '@/components/ui/PageShell'
// padX={false} for full-bleed layouts (entries list)
```

### `SectionLabel`
Uppercase index + label for section eyebrows.
```tsx
<SectionLabel index="03" label="Research" />
```

### `CategoryChip`
Pill chip for entry categories. Use `P.blue` for Research, `'#C07B45'` for Space, `'#9B7EC8'` for Hackathons, `'#6BBFA3'` for Projects, `'#9B8B7A'` for General.

### Section title pattern
```tsx
<h2 style={{
  margin: '52px 0 18px',
  fontSize: 'clamp(11px,1.1vw,13px)',
  fontWeight: 600,
  letterSpacing: '.18em',
  textTransform: 'uppercase',
  color: P.cognac,
  display: 'flex', alignItems: 'center', gap: 10,
}}>
  <span style={{ display:'inline-block', width:24, height:1, background:P.cognac, opacity:0.4 }} />
  Section Name
</h2>
```

### Card / inset panel pattern
```tsx
<div style={{
  background: P.card,
  border: `1px solid ${P.hairline}`,
  borderLeft: `3px solid ${P.cognac}`, // or P.blue or P.navy
  borderRadius: 10,
  padding: '18px 20px',
}}>
```

### Stat chip
```tsx
<div style={{
  background: P.card,
  border: `1px solid ${P.hairline}`,
  borderRadius: 10,
  padding: '18px 22px',
  textAlign: 'center',
  flex: '1 1 140px',
}}>
  <div style={{ fontSize: 26, fontWeight: 700, color: P.cognac, fontFamily: 'var(--font-serif), Georgia, serif' }}>
    {value}
  </div>
  <div style={{ fontSize: 11, color: P.muted, marginTop: 7, letterSpacing: '.07em', textTransform: 'uppercase' }}>
    {label}
  </div>
</div>
```

### Primary button
```tsx
<a style={{
  padding: '10px 20px', borderRadius: 8,
  background: P.navy, color: '#F5EEE6',
  fontSize: 13, fontWeight: 500, textDecoration: 'none',
}}>Label →</a>
```

### Ghost button
```tsx
<a style={{
  padding: '10px 20px', borderRadius: 8,
  background: 'transparent', color: P.muted,
  border: `1px solid ${P.hairline}`,
  fontSize: 13, textDecoration: 'none',
}}>Label</a>
```

### Table pattern
- Header: `10px`, uppercase, `letterSpacing: '.12em'`, `color: P.muted`, `fontWeight: 600`, `borderBottom: 2px solid ${P.hairline}`
- Row border: `1px solid ${P.hairline}`
- Highlight row: `background: \`${P.cognac}0A\``
- Highlighted cell text: `P.cognac`, `fontWeight: 600`

### Tag/pill
```tsx
<span style={{
  display: 'inline-block',
  padding: '4px 11px',
  borderRadius: 20,
  fontSize: 11,
  fontWeight: 500,
  background: `${P.navy}0A`,
  color: P.navy,
  border: `1px solid ${P.hairline}`,
  marginRight: 6, marginBottom: 6,
  opacity: 0.85,
}}>Tag</span>
```

---

## Hard rules

1. **No custom hex colors in page/component files.** Use `P.*` tokens only.
2. **No dark backgrounds on regular pages.** The site is warm/light. `#0A0A0F` and `#1C1C2E` are forbidden outside of the iPoster-specific pages.
3. **No inline `background: 'black'` or `color: 'white'`.** Use `P.navy` and `'#F5EEE6'` (the bg color) as the closest equivalents.
4. **Always use `PageShell`** for page-level layout. Never reconstruct padding manually.
5. **Accent sparingly.** `P.cognac` on max 2–3 elements per section. It loses power if overused.
6. **Left-border accent** on cards is the preferred way to add color — `borderLeft: \`3px solid ${P.cognac}\`` — not background fills.
7. **Borders always `P.hairline`**. Never `1px solid #333` or `1px solid gray`.
8. **GIFs and images** get `border: \`1px solid ${P.hairline}\`` + `borderRadius: 12px`. No dark wrappers around light-background images.

---

## Skill invocation

When the user asks to build or fix any UI on this site, always:
1. Read `lib/palette.ts` to confirm the current token values.
2. Use `PageShell` for layout.
3. Apply the patterns above — do not improvise colors or spacing.
4. If the user shares a screenshot and asks "fix the colors" — the fix is always: replace custom hex values with `P.*` tokens.
