import apiClient from './apiClient'

const extractError = (err) =>
  err.response?.data?.message ||
  err.response?.data?.error ||
  err.message ||
  'Terjadi kesalahan'

export const authService = {
  async login(email, password) {
    try {
      const res = await apiClient.post('/auth/login', {
        email: (email || '').trim(),
        password,
      })
      const token = res.data.data?.access_token || res.data.data?.token || null
      const user = res.data.data?.user || null
      if (token) {
        localStorage.setItem('token', token)
      }
      return { success: true, token, user }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  async register(payload) {
    try {
      const res = await apiClient.post('/auth/register', {
        ...payload,
        email: (payload.email || '').trim(),
        name: (payload.name || '').trim(),
      })
      const token = res.data.data?.access_token || res.data.data?.token || null
      const user = res.data.data?.user || null
      if (token) {
        localStorage.setItem('token', token)
      }
      return { success: true, token, user, message: res.data.message }
    } catch (err) {
      if (err.response?.status === 409) {
        return { success: false, error: 'Email sudah terdaftar' }
      }
      const supabaseMsg = err.response?.data?.message || err.response?.data?.error
      if (supabaseMsg) {
        const hint = supabaseMsg.includes('invalid')
          ? ' — Pastikan email tidak meng mengandung karakter tersembunyi dan domain tidak diblokir di panel Supabase.'
          : ''
        return { success: false, error: supabaseMsg + hint }
      }
      return { success: false, error: extractError(err) }
    }
  },

  async getCurrentUser() {
    try {
      const res = await apiClient.get('/auth/me')
      const user = res.data.data?.user || res.data.data || null
      return { success: true, user }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  googleLogin() {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1'
    window.location.href = `${apiUrl}/auth/google`
  },
}
