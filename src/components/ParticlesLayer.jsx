import React, { useMemo } from 'react'

const GLYPHS = {
  petal: '🌸',
  heart: '💗',
  butterfly: '🦋',
  firefly: '✦',
  sparkle: '',
  star: '🌸',
  bubble: '○',
  leaf: '🍃'
}

function rand(min, max) {
  return Math.random() * (max - min) + min
}

/**
 * kinds: array of particle types to render, e.g. ['petal','heart','butterfly']
 * count: how many of each kind
 * mode: 'fall' | 'float' | 'drift' | 'twinkle'
 */
export default function ParticlesLayer({ kinds = ['petal', 'heart'], count = 8, className = '' }) {
  const particles = useMemo(() => {
    const list = []
    kinds.forEach((kind) => {
      for (let i = 0; i < count; i++) {
        list.push({
          key: `${kind}-${i}`,
          kind,
          left: rand(0, 100),
          delay: rand(0, 10),
          duration: rand(10, 22),
          size: rand(0.8, 1.8),
          driftMode: kind === 'butterfly' || kind === 'bubble' ? 'drift' : kind === 'firefly' || kind === 'star' || kind === 'sparkle' ? 'twinkle' : 'fall',
          top: rand(0, 100)
        })
      }
    })
    return list
  }, [kinds, count])

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((p) => {
        if (p.driftMode === 'fall') {
          return (
            <span
              key={p.key}
              className="absolute select-none opacity-80 animate-fall"
              style={{
                left: `${p.left}%`,
                fontSize: `${p.size}rem`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`
              }}
            >
              {GLYPHS[p.kind]}
            </span>
          )
        }
        if (p.driftMode === 'drift') {
          return (
            <span
              key={p.key}
              className="absolute select-none opacity-80 animate-drift"
              style={{
                top: `${p.top}%`,
                fontSize: `${p.size}rem`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`
              }}
            >
              {GLYPHS[p.kind]}
            </span>
          )
        }
        return (
          <span
            key={p.key}
            className="absolute select-none animate-twinkle text-filigree"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              fontSize: `${p.size * 0.7}rem`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${rand(2, 5)}s`
            }}
          >
            {GLYPHS[p.kind]}
          </span>
        )
      })}
    </div>
  )
}
