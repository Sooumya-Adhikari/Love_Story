import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function LoadingScreen({ onFinish, coupleName }) {
  const rootRef = useRef(null)
  const heartRef = useRef(null)
  const logoRef = useRef(null)
  const flowerRef = useRef(null)
  const petalsRef = useRef([])

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.9,
          ease: 'power2.inOut',
          onComplete: onFinish
        })
      }
    })

    tl.fromTo(heartRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' })
      .to(heartRef.current, { scale: 1.2, duration: 0.35, ease: 'power1.inOut', repeat: 3, yoyo: true })
      .to(heartRef.current, { opacity: 0, scale: 0.6, duration: 0.4 }, '+=0.1')
      .fromTo(
        logoRef.current,
        { opacity: 0, y: 20, letterSpacing: '0.4em' },
        { opacity: 1, y: 0, letterSpacing: '0.08em', duration: 1.1, ease: 'power3.out' },
        '-=0.1'
      )
      .fromTo(
        flowerRef.current,
        { scale: 0, opacity: 0, rotate: -30 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: 'elastic.out(1, 0.6)' },
        '-=0.5'
      )
      .fromTo(
        petalsRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(3)' },
        '-=0.6'
      )
      .to({}, { duration: 0.7 }) // brief hold so it can be admired

    return () => tl.kill()
  }, [onFinish])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-noir text-blush overflow-hidden"
    >
      <div className="absolute inset-0 bg-aurora opacity-60" />

      <div ref={heartRef} className="absolute text-6xl">💗</div>

      <div className="relative flex flex-col items-center gap-6">
        <div ref={flowerRef} className="relative w-24 h-24 flex items-center justify-center">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              ref={(el) => (petalsRef.current[i] = el)}
              className="absolute w-10 h-14 bg-gradient-to-t from-ember to-filigree-light rounded-full"
              style={{
                transform: `rotate(${i * 60}deg) translateY(-20px)`,
                transformOrigin: 'center 40px',
                opacity: 0.9
              }}
            />
          ))}
          <span className="relative z-10 w-4 h-4 rounded-full bg-filigree" />
        </div>

        <h1 ref={logoRef} className="font-display italic text-3xl md:text-5xl text-filigree tracking-wide opacity-0">
          {coupleName}
        </h1>
        <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-blush/60">loading our story</p>
      </div>
    </div>
  )
}
