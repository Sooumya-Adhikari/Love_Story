import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Home from './pages/Home.jsx'
import Admin from './pages/Admin.jsx'
import { useContent } from './context/ContentContext.jsx'

export default function App() {
  // Extracted 'loading' from context as well to check server status
  const { content, loading: serverLoading } = useContent()
  const [loading, setLoading] = useState(true)

  // Guard Clause: If server data is still fetching, show a safe minimal loader 
  // to prevent reading properties of null (like content.couple)
  if (serverLoading || !content) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0a0a0a] text-white font-sans">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold animate-pulse text-pink-400">Connecting...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      
      {/* Now safely renders because 'content' is guaranteed to be loaded here */}
      {loading && (
        <LoadingScreen
          coupleName={`${content?.couple?.nameA || 'Soumyadeep'} & ${content?.couple?.nameB || 'Swikriti'}`}
          onFinish={() => setLoading(false)}
        />
      )}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}