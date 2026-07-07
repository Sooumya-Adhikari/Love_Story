import React from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import RevealText from '../components/RevealText.jsx'
import { useContent } from '../context/ContentContext.jsx'

function TimelineCard({ item, index }) {
  const fromLeft = index % 2 === 0

  return (
    <div className="relative flex md:justify-center items-start md:items-stretch mb-16 last:mb-0">
      {/* connecting line node */}
      <motion.span
        className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 w-3 h-3 rounded-full bg-filigree shadow-glow z-10"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      />

      <motion.div
        initial={{ opacity: 0, x: fromLeft ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        whileHover={{ y: -6, scale: 1.02 }}
        className={`group w-full md:w-[42%] ${fromLeft ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'}`}
      >
        <div className="glass-card rounded-3xl p-5 md:p-6 shadow-lg hover:shadow-ember transition-shadow duration-500">
          <div className="overflow-hidden rounded-2xl mb-4">
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-ember">{item.date}</span>
          <h3 className="font-display italic text-2xl md:text-3xl mt-1 mb-2">{item.title}</h3>
          <RevealText text={item.description} className="text-sm md:text-base opacity-80 leading-relaxed" />
        </div>
      </motion.div>
    </div>
  )
}

export default function Timeline() {
  const { content } = useContent()

  return (
    <section id="timeline" className="relative py-24 px-6 md:px-10">
      <SectionHeading eyebrow="Our Journey" title="The Love Timeline" subtitle="Every date is a chapter. Here are a few of our favorites." />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-filigree/60 to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
        {content.timeline.map((item, i) => (
          <TimelineCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}
