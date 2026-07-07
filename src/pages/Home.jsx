import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../sections/Hero.jsx'
import Timeline from '../sections/Timeline.jsx'
import Gallery from '../sections/Gallery.jsx'
import VideoGallery from '../sections/VideoGallery.jsx'
import LoveLetters from '../sections/LoveLetters.jsx'
import Quotes from '../sections/Quotes.jsx'
import Countdown from '../sections/Countdown.jsx'
import FutureDreams from '../sections/FutureDreams.jsx'
import Footer from '../sections/Footer.jsx'
import MusicPlayer from '../sections/MusicPlayer.jsx'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Timeline />
      <Gallery />
      <VideoGallery />
      <LoveLetters />
      <Quotes />
      <Countdown />
      <FutureDreams />
      <Footer />
      <MusicPlayer />
    </>
  )
}
