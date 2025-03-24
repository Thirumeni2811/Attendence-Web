import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/Theme/ThemeContext'
import Loaders from './components/Loader/Loaders';

//Lazy loading components
const Login = lazy(() => import('./pages/Login'));
const Homepage = lazy(() => import('./pages/Homepage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Department = lazy(() => import('./pages/Department'));
const Designation = lazy(() => import('./pages/Designation'));
const Schedule = lazy(() => import('./pages/Schedule'));
const Holiday = lazy(() => import('./pages/Holiday'));
const Breaks = lazy(() => import('./pages/Breaks'));
const Leave = lazy(() => import('./pages/Leave'));

function App() {
  const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem('token');
    return token ? children : <Navigate to="/" />;
  };
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen w-full">
              <Loaders />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            {/* Parent Route */}
            <Route path="/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
              <Route path="department" element={<Department />} />
              <Route path="designation" element={<Designation />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="schedule-breaks/:id" element={<Breaks />} />
              <Route path="holiday" element={<Holiday />} />
              <Route path="leave" element={<Leave />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
