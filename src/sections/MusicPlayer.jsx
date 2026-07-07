import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiVolume2, FiList, FiMusic } from 'react-icons/fi'
import { useContent } from '../context/ContentContext.jsx'

export default function MusicPlayer() {
  const { content } = useContent()
  const playlist = content.playlist?.length ? content.playlist : []
  const audioRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.6)
  const [showList, setShowList] = useState(false)
  const [ready, setReady] = useState(false)
  const current = playlist[index]

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    setPlaying(false)
  }, [index])

  // autoplay after first user interaction anywhere on the page, per spec
  useEffect(() => {
    if (ready) return
    function tryPlay() {
      setReady(true)
      if (current?.src && audioRef.current) {
        audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
      }
      window.removeEventListener('click', tryPlay)
    }
    window.addEventListener('click', tryPlay, { once: true })
    return () => window.removeEventListener('click', tryPlay)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function togglePlay() {
    if (!current?.src) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying((p) => !p)
  }

  function next() {
    setIndex((i) => (i + 1) % playlist.length)
  }
  function prev() {
    setIndex((i) => (i - 1 + playlist.length) % playlist.length)
  }

  if (!playlist.length) return null

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[300] w-[92%] max-w-md">
      <audio ref={audioRef} src={current?.src || undefined} onEnded={next} />

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.7, type: 'spring' }}
        className="glass-card rounded-2xl px-4 py-3 flex items-center gap-3 shadow-glow relative"
      >
        <div className="relative w-11 h-11 shrink-0">
          <motion.img
            src={current?.cover}
            alt="album cover"
            className="w-11 h-11 rounded-full object-cover border-2 border-filigree"
            animate={{ rotate: playing ? 360 : 0 }}
            transition={playing ? { repeat: Infinity, duration: 4, ease: 'linear' } : { duration: 0.3 }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">{current?.title || 'No song yet'}</p>
          <p className="text-xs opacity-60 truncate">{current?.artist}</p>
        </div>

        {/* equalizer */}
        <div className="hidden sm:flex items-end gap-[2px] h-5">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="w-[3px] bg-ember rounded-full"
              animate={playing ? { height: ['30%', '100%', '50%', '90%', '30%'] } : { height: '20%' }}
              transition={{ repeat: Infinity, duration: 1 + i * 0.15, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <button onClick={prev} className="hover:text-ember" aria-label="Previous">
          <FiSkipBack />
        </button>
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-ember text-white flex items-center justify-center hover:scale-105 transition-transform"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <FiPause /> : <FiPlay />}
        </button>
        <button onClick={next} className="hover:text-ember" aria-label="Next">
          <FiSkipForward />
        </button>

        <div className="hidden md:flex items-center gap-1">
          <FiVolume2 className="opacity-60" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 accent-ember"
          />
        </div>

        <button onClick={() => setShowList((s) => !s)} className="hover:text-ember" aria-label="Playlist">
          <FiList />
        </button>

        <AnimatePresence>
          {showList && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full mb-3 right-0 w-64 glass-card rounded-xl p-2 max-h-60 overflow-y-auto"
            >
              {playlist.map((song, i) => (
                <button
                  key={song.id}
                  onClick={() => {
                    setIndex(i)
                    setShowList(false)
                  }}
                  className={`w-full flex items-center gap-2 p-2 rounded-lg text-left text-sm hover:bg-ember/10 ${
                    i === index ? 'text-ember' : ''
                  }`}
                >
                  <FiMusic className="shrink-0" />
                  <span className="truncate">{song.title}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
