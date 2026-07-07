import React from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import { useContent } from '../context/ContentContext.jsx'

export default function FutureDreams() {
  const { content } = useContent()

  return (
    <section id="dreams" className="relative py-24 px-6 md:px-10">
      <SectionHeading eyebrow="Not Yet, But Someday" title="Future Dreams" subtitle="The chapters we haven't written yet, but already can't wait for." />

      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.futureDreams.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="glass-card rounded-3xl p-8 text-center hover:shadow-ember transition-shadow duration-500"
          >
            <motion.span
              className="text-5xl inline-block mb-4"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: i * 0.3 }}
            >
              {d.icon}
            </motion.span>
            <h3 className="font-display italic text-2xl mb-2">{d.title}</h3>
            <p className="text-sm opacity-70">{d.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
