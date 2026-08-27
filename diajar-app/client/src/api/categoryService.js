import apiClient from './apiClient'

const extractError = (err) =>
  err.response?.data?.message ||
  err.response?.data?.error ||
  err.message ||
  'Terjadi kesalahan'

export const categoryService = {
  async getAllCategories() {
    try {
      const res = await apiClient.get('/categories')
      return { success: true, data: res.data.data }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  async getCategoryBySlug(slug) {
    try {
      const res = await apiClient.get(`/categories/${slug}`)
      return { success: true, data: res.data.data }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },
}
