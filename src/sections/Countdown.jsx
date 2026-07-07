import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import { useCountdown } from '../hooks/useCountdown.js'
import { useContent } from '../context/ContentContext.jsx'

function FlipUnit({ value, label }) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-20 md:w-20 md:h-24 rounded-xl bg-noir text-blush overflow-hidden shadow-glow flip-digit">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center font-display text-3xl md:text-4xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
        <div className="absolute inset-x-0 top-1/2 h-px bg-black/40" />
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-70">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const { content } = useContent()
  const t = useCountdown(content.countdownDate)

  return (
    <section id="countdown" className="relative py-24 px-6 md:px-10 bg-velvet/5">
      <SectionHeading
        eyebrow="Every Second Counts"
        title="Since We Said Forever"
        subtitle="Not because it matters how long, but because every second with you has been worth counting."
      />

      <div className="flex justify-center flex-wrap gap-3 md:gap-5">
        <FlipUnit value={t.years} label="Years" />
        <FlipUnit value={t.months} label="Months" />
        <FlipUnit value={t.days} label="Days" />
        <FlipUnit value={t.hours} label="Hours" />
        <FlipUnit value={t.minutes} label="Minutes" />
        <FlipUnit value={t.seconds} label="Seconds" />
      </div>
    </section>
  )
}
