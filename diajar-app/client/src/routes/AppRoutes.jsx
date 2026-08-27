import { Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/landingPage/LandingPage'
import AuthView from '../pages/auth/AuthView'
import ProtectedRoute from '../components/ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthView />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  )
}

function DashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-navy mb-4">Dashboard</h1>
        <p className="text-slate-600">Selamat datang di dashboard LMS Gamifikasi!</p>
      </div>
    </div>
  )
}
