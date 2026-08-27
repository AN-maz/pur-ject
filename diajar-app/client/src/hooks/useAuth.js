import { useAuthStore } from '../store/auth'

export function useAuth() {
  const login = useAuthStore((s) => s.login)
  const register = useAuthStore((s) => s.register)
  const googleLogin = useAuthStore((s) => s.googleLogin)
  const logout = useAuthStore((s) => s.logout)
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const isLoading = useAuthStore((s) => s.isLoading)

  return {
    login,
    register,
    googleLogin,
    logout,
    user,
    token,
    isAuthenticated: !!token,
    isLoading,
  }
}
