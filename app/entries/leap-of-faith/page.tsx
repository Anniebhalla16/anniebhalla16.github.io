'use client'

import { P } from '../../../lib/palette'
import EntryBreadcrumb from '../../../components/ui/EntryBreadcrumb'

export default function LeapOfFaithPage() {
  return (
    <>
      <EntryBreadcrumb category="Life" categoryColor="#9B8B7A" />

      {/* ── Title ── */}
      <h1 style={{
        margin: '0 0 10px',
        fontFamily: 'var(--font-serif), Georgia, serif',
        fontWeight: 400,
        fontSize: 'clamp(28px,3.5vw,48px)',
        lineHeight: 1.1,
        letterSpacing: '-.02em',
        color: P.navy,
      }}>
        Leap of Faith 💫
      </h1>
      <p style={{ margin: '0 0 44px', fontSize: 13, color: P.muted }}>
        Jun 18, 2026 · 3 min read · An excerpt from my diary
      </p>

      {/* ── Photo ── */}
      <div style={{ marginBottom: 48 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/annie-leap.jpeg"
          alt="Annie Bhalla — three years ago, the leap of faith"
          style={{
            width: 320,
            height: 'auto',
            borderRadius: 14,
            border: `1px solid ${P.hairline}`,
            display: 'block',
          }}
        />
      </div>

      {/* ── Body ── */}
      <div style={{
        fontSize: 16,
        lineHeight: 1.9,
        color: P.muted,
        maxWidth: 660,
      }}>
        <p style={{ margin: '0 0 24px' }}>
          Exactly three years ago today, on June 18th, 2023, I took my first international flight
          for my first away-from-home.
        </p>

        <p style={{ margin: '0 0 24px' }}>
          I packed my entire life into two big suitcases, bought a one-way ticket, and stepped
          toward a lifelong dream. It all started with a simple, quiet conversation with my dad,
          a moment that ultimately carried me to places I could once only dream of. 😇
        </p>

        <p style={{ margin: '0 0 24px' }}>
          I still remember standing at the airport entrance: a nervous 21-year-old with a heavy
          heart, but holding onto a massive amount of faith and trust in the universe. I had
          absolutely no idea what lay ahead of me. Looking back now, I am just incredibly
          grateful for everything that followed.
        </p>

        <p style={{ margin: '0 0 24px' }}>
          Of course, the path over these three years was never a straight line of constant yesses
          and celebrations. It has been a delicate rhythm of low points and high points. But
          that&apos;s the beauty of life — the universe has a way of leveling out the difficult phases
          with the rewarding ones. I too failed so many times, fell down, but learnt the quiet
          art of getting back up, dusting myself off, and putting myself out there anyway, even
          when doubts crept in.
        </p>

        <p style={{ margin: '0 0 24px' }}>
          Through it all, Germany provided the space for my wildest goals to breathe. My time at
          the University of Stuttgart gave me the exposure, knowledge, and an inspiring community
          of friends who pushed me to be my best. Working at the German Aerospace Center (DLR)
          gave me opportunity to dive into planetary robotics, and now at Sereact, I am exploring
          the dynamic world of industrial AI robotics. For someone whose head has always been in
          the stars, this journey has connected me with an incredible constellation of people in
          the space and robotics industry.
        </p>

        <p style={{ margin: '0 0 24px' }}>
          But the truth is, I am nowhere near the final destination. But what even is a final
          destination? We are all a constant work in progress, and the horizon is always moving.
          There is no fixed stopping point, no ultimate arrival — only the next frontier. Three
          years don&apos;t define the completion of who I want to become, but they have given me the
          beautiful momentum to keep exploring. ❤️
        </p>

        <p style={{ margin: '0 0 24px' }}>
          With that said, my dear fellow life explorers, take that leap of faith. There are more
          milestones to reach, more to achieve, and so much more to explore.
        </p>

        <p style={{ margin: '0 0 48px', fontWeight: 600, color: P.navy }}>
          To the stars and beyond! 🚀 🌌
        </p>
      </div>

    </>
  )
}
