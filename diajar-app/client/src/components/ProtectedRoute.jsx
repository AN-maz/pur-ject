import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'

export default function ProtectedRoute({ children }) {
  const token = useAuthStore((s) => s.token)

  if (!token) {
    return <Navigate to="/auth" replace />
  }

  return children
}
