import apiClient from './apiClient'

const extractError = (err) =>
  err.response?.data?.message ||
  err.response?.data?.error ||
  err.message ||
  'Terjadi kesalahan'

export const materialService = {
  async listMaterials(params = {}) {
    try {
      const res = await apiClient.get('/materials', { params })
      return { success: true, data: res.data.data }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  async getMaterialBySlug(slug) {
    try {
      const res = await apiClient.get(`/materials/${slug}`)
      return { success: true, data: res.data.data }
    } catch (err) {
      if (err.response?.status === 404) {
        return { success: false, error: 'Materi tidak ditemukan' }
      }
      return { success: false, error: extractError(err) }
    }
  },

  async createMaterial(payload) {
    try {
      const res = await apiClient.post('/materials', payload)
      return { success: true, data: res.data.data }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  async getUserMaterials() {
    try {
      const res = await apiClient.get('/users/me/materials')
      return { success: true, data: res.data.data }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  async updateMaterial(id, payload) {
    try {
      const res = await apiClient.put(`/materials/${id}`, payload)
      return { success: true, data: res.data.data }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  async markComplete(id) {
    try {
      const res = await apiClient.post(`/materials/${id}/complete`)
      return { success: true, data: res.data.data }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  async createRating(id, ratingValue) {
    try {
      const res = await apiClient.post(`/materials/${id}/ratings`, { rating_value: ratingValue })
      return { success: true, data: res.data.data }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  async listComments(id) {
    try {
      const res = await apiClient.get(`/materials/${id}/comments`)
      return { success: true, data: res.data.data }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  async postComment(id, comment_text) {
    try {
      const res = await apiClient.post(`/materials/${id}/comments`, { comment_text })
      return { success: true, data: res.data.data }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },
}
