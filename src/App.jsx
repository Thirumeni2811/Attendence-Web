import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import Dashboard from './pages/Dashboard'
import Department from './pages/Department'
import Fake from './pages/Fake'
import Designation from './pages/Designation'
import { ThemeProvider } from './components/Theme/ThemeContext'

function App() {
  const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem('token');
    return token ? children : <Navigate to="/" />;
  };
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          {/* Parent Route */}
          <Route path="/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route path="department" element={<Department />} />
            <Route path="designation" element={<Designation />} />
            <Route path="fake" element={<Fake />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
