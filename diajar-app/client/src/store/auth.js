import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '../api/authService'
import apiClient from '../api/apiClient'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true })
        try {
          const res = await authService.login(email, password)
          if (res.success) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${res.token}`
            set({ token: res.token, user: res.user, isLoading: false })
            return { success: true }
          }
          set({ isLoading: false })
          return { success: false, error: res.error }
        } catch (err) {
          set({ isLoading: false })
          return { success: false, error: err.message }
        }
      },

      register: async (payload) => {
        set({ isLoading: true })
        try {
          const res = await authService.register(payload)
          if (res.success && res.token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${res.token}`
            set({ token: res.token, user: res.user, isLoading: false })
          } else {
            set({ isLoading: false })
          }
          return res
        } catch (err) {
          set({ isLoading: false })
          return { success: false, error: err.message }
        }
      },

      googleLogin: () => {
        authService.googleLogin()
      },

      logout: () => {
        localStorage.removeItem('token')
        delete apiClient.defaults.headers.common['Authorization']
        set({ token: null, user: null })
      },

      refreshUser: async () => {
        const token = get().token
        if (!token) return
        set({ isLoading: true })
        const res = await authService.getCurrentUser()
        if (res.success) {
          set({ user: res.user, isLoading: false })
        } else {
          get().logout()
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
)
