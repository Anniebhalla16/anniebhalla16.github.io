const band: React.CSSProperties = {
  position: 'absolute',
  left: '-10%',
  right: '-10%',
  transformOrigin: '50% 100%',
}

export default function StarField() {
  return (
    <>
      {/* drifting stars */}
      <div
        style={{
          position: 'absolute',
          inset: '-20%',
          backgroundImage:
            'radial-gradient(1.4px 1.4px at 20px 30px, rgba(255,255,255,.9) 50%, transparent 51%), radial-gradient(1px 1px at 140px 90px, rgba(255,255,255,.55) 50%, transparent 51%), radial-gradient(1.6px 1.6px at 260px 200px, rgba(255,255,255,.75) 50%, transparent 51%), radial-gradient(1px 1px at 60px 260px, rgba(226,230,238,.5) 50%, transparent 51%), radial-gradient(1.2px 1.2px at 330px 60px, rgba(255,255,255,.5) 50%, transparent 51%)',
          backgroundSize: '380px 320px',
          animation: 'drift 140s linear infinite alternate',
          opacity: 0.85,
        }}
      />
      {/* twinkling stars */}
      <div
        style={{
          position: 'absolute',
          inset: '-20%',
          backgroundImage:
            'radial-gradient(1.8px 1.8px at 80px 140px, rgba(244,232,214,.75) 50%, transparent 51%), radial-gradient(1.4px 1.4px at 420px 320px, rgba(214,220,232,.6) 50%, transparent 51%)',
          backgroundSize: '560px 480px',
          animation: 'twinkle 6s ease-in-out infinite',
        }}
      />
      {/* corner halo */}
      <div
        style={{
          position: 'absolute',
          top: '-18vh',
          right: '-10vw',
          width: '64vw',
          height: '64vw',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 40% 40%, rgba(190,200,220,.09), rgba(190,200,220,.03) 45%, transparent 70%)',
          filter: 'blur(6px)',
        }}
      />
      {/* milky band */}
      <div
        style={{
          position: 'absolute',
          left: '-18%',
          right: '-18%',
          top: '6vh',
          height: '74vh',
          transform: 'rotate(-13deg)',
          background:
            'linear-gradient(90deg, transparent, rgba(230,232,238,.035) 22%, rgba(255,255,255,.05) 50%, rgba(226,230,238,.03) 78%, transparent)',
          filter: 'blur(28px)',
        }}
      />
      {/* aurora haze */}
      <div
        style={{
          ...band,
          bottom: '-8vh',
          height: '58vh',
          background:
            'linear-gradient(90deg, transparent, rgba(176,182,196,.10) 20%, rgba(198,204,216,.12) 50%, rgba(170,176,190,.09) 78%, transparent)',
          filter: 'blur(70px)',
          animation: 'aurora 26s ease-in-out infinite',
        }}
      />
      <div
        style={{
          ...band,
          left: '-12%',
          right: '-12%',
          bottom: '-16vh',
          height: '46vh',
          background:
            'linear-gradient(90deg, transparent, rgba(212,192,168,.07) 32%, rgba(168,178,192,.08) 64%, transparent)',
          filter: 'blur(80px)',
          animation: 'aurora2 37s ease-in-out infinite',
        }}
      />
    </>
  )
}
