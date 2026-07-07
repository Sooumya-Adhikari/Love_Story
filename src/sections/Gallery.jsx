import React, { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import SectionHeading from '../components/SectionHeading.jsx'
import { useContent } from '../context/ContentContext.jsx'

function GalleryCard({ item, onOpen }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -10, y: px * 10 })
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={() => onOpen(item)}
      style={{ transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="mb-4 break-inside-avoid rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg transition-shadow hover:shadow-ember"
    >
      <motion.img
        src={item.src}
        alt={item.caption}
        loading="lazy"
        className="w-full object-cover"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.5 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
        <p className="text-white font-display italic text-lg">{item.caption}</p>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const { content } = useContent()
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)

  const categories = useMemo(() => ['all', ...new Set(content.gallery.map((g) => g.category))], [content.gallery])
  const filtered = filter === 'all' ? content.gallery : content.gallery.filter((g) => g.category === filter)

  return (
    <section id="gallery" className="relative py-24 px-6 md:px-10">
      <SectionHeading eyebrow="Frozen Moments" title="Memory Gallery" subtitle="A thousand little moments, worth a thousand more words." />

      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest border transition-colors ${
              filter === c ? 'bg-ember text-white border-ember' : 'border-filigree/40 hover:border-ember'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="max-w-5xl mx-auto columns-2 md:columns-3 gap-4">
        <AnimatePresence>
          {filtered.map((item) => (
            <GalleryCard key={item.id} item={item} onOpen={setActive} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black/85 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.img
              src={active.src}
              alt={active.caption}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              className="max-h-[85vh] max-w-full rounded-2xl shadow-glow"
            />
            <button className="absolute top-6 right-6 text-white text-2xl" onClick={() => setActive(null)} aria-label="Close">
              <FiX />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
