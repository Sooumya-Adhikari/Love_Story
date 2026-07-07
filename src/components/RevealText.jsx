import React from 'react'
import { motion } from 'framer-motion'

/**
 * Reveals text letter by letter (word-safe) when it scrolls into view.
 */
export default function RevealText({ text, as: Tag = 'p', className = '', stagger = 0.015, once = true }) {
  const words = text.split(' ')

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } }
  }
  const child = {
    hidden: { opacity: 0, y: 10, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4 } }
  }

  return (
    <motion.span
      className={`inline ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={child} className="inline-block mr-[0.3em] whitespace-nowrap">
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
