import apiClient from './apiClient'

export const authService = {
  async login(email, password) {
    try {
      const res = await apiClient.post('/auth/login', { email, password })
      const token = res.data.token || res.data.accessToken
      const user = res.data.user || null
      if (token) {
        localStorage.setItem('token', token)
      }
      return { success: true, token, user }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Login gagal'
      return { success: false, error: message }
    }
  },

  async register(payload) {
    try {
      const res = await apiClient.post('/auth/register', payload)
      return { success: true, data: res.data }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Registrasi gagal'
      return { success: false, error: message }
    }
  },

  async getCurrentUser() {
    try {
      const res = await apiClient.get('/auth/me')
      return { success: true, user: res.data.user || res.data }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Gagal memuat profil'
      return { success: false, error: message }
    }
  },

  googleLogin() {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1'
    window.location.href = `${apiUrl}/auth/google`
  },
}
