import React from 'react'
import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <motion.div
      className={`flex flex-col gap-3 max-w-2xl mb-14 ${alignClass}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {eyebrow && (
        <span className="font-body text-xs md:text-sm uppercase tracking-[0.35em] text-ember">{eyebrow}</span>
      )}
      <h2 className="font-display italic text-4xl md:text-6xl text-current">{title}</h2>
      <motion.span
        className="h-[2px] w-16 bg-gradient-to-r from-transparent via-filigree to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      {subtitle && <p className="font-body text-sm md:text-base opacity-70">{subtitle}</p>}
    </motion.div>
  )
}
