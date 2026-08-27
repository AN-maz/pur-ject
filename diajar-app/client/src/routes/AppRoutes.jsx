import { Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/landingPage/LandingPage'
import AuthView from '../pages/auth/AuthView'
import CatalogPage from '../pages/catalog/CatalogPage'
import MaterialDetail from '../pages/material/MaterialDetail'
import LeaderboardPage from '../pages/leaderboard/LeaderboardPage'
import ProfilePage from '../pages/profile/ProfilePage'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import DashboardOverview from '../pages/dashboard/DashboardOverview'
import MyMaterials from '../pages/dashboard/MyMaterials'
import MaterialEditor from '../pages/dashboard/MaterialEditor'
import AdminLayout from '../components/admin/AdminLayout'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ModerationList from '../pages/admin/ModerationList'
import ModerationDetail from '../pages/admin/ModerationDetail'
import CategoryManagement from '../pages/admin/CategoryManagement'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminRoute from '../components/AdminRoute'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthView />} />
      <Route path="/materi" element={<CatalogPage />} />
      <Route path="/materi/:slug" element={<MaterialDetail />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />

      {/* Protected Routes - Auth required */}
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout><DashboardOverview /></DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/materi/create" element={
        <ProtectedRoute>
          <DashboardLayout><MaterialEditor /></DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/materi/:id/edit" element={
        <ProtectedRoute>
          <DashboardLayout><MaterialEditor /></DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/materi/my-materials" element={
        <ProtectedRoute>
          <DashboardLayout><MyMaterials /></DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout><AdminDashboard /></AdminLayout>
        </AdminRoute>
      } />
      <Route path="/admin/moderation" element={
        <AdminRoute>
          <AdminLayout><ModerationList /></AdminLayout>
        </AdminRoute>
      } />
      <Route path="/admin/moderation/:id" element={
        <AdminRoute>
          <AdminLayout><ModerationDetail /></AdminLayout>
        </AdminRoute>
      } />
      <Route path="/admin/categories" element={
        <AdminRoute>
          <AdminLayout><CategoryManagement /></AdminLayout>
        </AdminRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<LandingPage />} />
    </Routes>
  )
}
