import React, { useState } from 'react'
import { useContent } from '../context/ContentContext.jsx' // Imported the content context hook
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
  const { content, loading, isMainAuthed, verifyMainPassword } = useContent();
  const [passwordInput, setPasswordInput] = useState("");
  const [passError, setPassError] = useState("");

  // 1. Show loading screen until database data is completely loaded and server is ready
  if (loading || !content) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0a0a0a] text-white font-sans">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold animate-pulse text-pink-400">Our Love Story is Loading...</p>
          <p className="text-xs text-zinc-500 mt-2">(Waking up the server, please wait a moment)</p>
        </div>
      </div>
    );
  }

  // 2. Show password lock screen if the main page is not authorized yet
  if (!isMainAuthed) {
    const handleLockSubmit = (e) => {
      e.preventDefault();
      const success = verifyMainPassword(passwordInput);
      if (!success) {
        setPassError("Incorrect Password! Please try again.");
      }
    };

    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0a0a0a] text-white font-sans p-4">
        <form onSubmit={handleLockSubmit} className="bg-[#141414] border border-zinc-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center backdrop-blur-md">
          <div className="text-4xl mb-3">🔒</div>
          <h2 className="text-2xl font-bold mb-2 tracking-wide text-zinc-100">Private Story</h2>
          <p className="text-sm text-zinc-400 mb-6">This page is password protected. Enter password to view.</p>
          
          <input
            type="password"
            placeholder="Enter Password"
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
              setPassError(""); // Clear error message when user types
            }}
            className="w-full bg-[#1e1e1e] border border-zinc-700 rounded-xl px-4 py-3 text-center focus:outline-none focus:border-pink-500 transition-all mb-2 placeholder-zinc-600 text-pink-400 font-medium text-lg"
          />
          
          {passError && <p className="text-sm text-red-500 mb-4 font-medium">⚠️ {passError}</p>}
          
          <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 active:scale-[0.98] transition-all text-white font-semibold py-3 rounded-xl shadow-lg shadow-pink-900/20 mt-2">
            Unlock Story
          </button>
        </form>
      </div>
    );
  }

  // 3. Render main sections once authenticated and data is successfully loaded
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