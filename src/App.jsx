import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import Home from './pages/Home.jsx'
import Admin from './pages/Admin.jsx'
import { useContent } from './context/ContentContext.jsx'

export default function App() {
  const { content } = useContent()
  const [loading, setLoading] = useState(true)

  return (
    <>
      <CustomCursor />
      {loading && (
        <LoadingScreen
          coupleName={`${content.couple.nameA} & ${content.couple.nameB}`}
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
