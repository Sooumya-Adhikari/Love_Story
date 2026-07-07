import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiPlay, FiX } from 'react-icons/fi'
import SectionHeading from '../components/SectionHeading.jsx'
import { useContent } from '../context/ContentContext.jsx'

function VideoCard({ item, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5 }}
      onClick={() => onOpen(item)}
      className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-ember transition-shadow"
    >
      <motion.img
        src={item.thumbnail}
        alt={item.title}
        className="w-full h-56 object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.7 }}
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
        <motion.span
          className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-2xl border border-white/40"
          whileHover={{ scale: 1.15, boxShadow: '0 0 30px rgba(203,163,102,0.6)' }}
        >
          <FiPlay />
        </motion.span>
      </div>
      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <p className="text-white font-display italic text-lg">{item.title}</p>
      </div>
    </motion.div>
  )
}

export default function VideoGallery() {
  const { content } = useContent()
  const [active, setActive] = useState(null)

  if (!content.videos?.length) return null

  return (
    <section id="videos" className="relative py-24 px-6 md:px-10">
      <SectionHeading eyebrow="Moments in Motion" title="Video Memories" subtitle="Some moments needed sound and motion to be remembered right." />

      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
        {content.videos.map((v) => (
          <VideoCard key={v.id} item={v} onOpen={setActive} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden bg-black shadow-glow"
              onClick={(e) => e.stopPropagation()}
            >
              {active.videoUrl ? (
                <video src={active.videoUrl} controls autoPlay className="w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/70 text-sm px-6 text-center">
                  Add a video URL for "{active.title}" from the admin panel to play it here.
                </div>
              )}
            </motion.div>
            <button className="absolute top-6 right-6 text-white text-2xl" onClick={() => setActive(null)} aria-label="Close">
              <FiX />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
