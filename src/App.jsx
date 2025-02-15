import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import Dummy from './pages/Dummy'
import Fake from './pages/Fake'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        {/* Parent Route */}
        <Route path="/*" element={<Dashboard />}>
          <Route path="dummy" element={<Dummy />} />
          <Route path="fake" element={<Fake />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
