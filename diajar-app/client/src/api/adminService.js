import apiClient from './apiClient'

const extractError = (err) =>
  err.response?.data?.message ||
  err.response?.data?.error ||
  err.message ||
  'Terjadi kesalahan'

export const adminService = {
  async getPendingMaterials(params = {}) {
    try {
      const res = await apiClient.get('/admin/materials', { params })
      return { success: true, data: res.data.data }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  async updateMaterialStatus(materialId, status, rejectionReason = null) {
    try {
      const payload = { status }
      if (rejectionReason) payload.rejection_reason = rejectionReason
      const res = await apiClient.patch(`/admin/materials/${materialId}/status`, payload)
      return { success: true, data: res.data.data, message: res.data.message }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  async getAllCategories() {
    try {
      const res = await apiClient.get('/categories')
      return { success: true, data: res.data.data }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  async createCategory(payload) {
    try {
      const res = await apiClient.post('/admin/categories', payload)
      return { success: true, data: res.data.data, message: res.data.message }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  async updateCategory(id, payload) {
    try {
      const res = await apiClient.put(`/admin/categories/${id}`, payload)
      return { success: true, data: res.data.data, message: res.data.message }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  async deleteCategory(id) {
    try {
      const res = await apiClient.delete(`/admin/categories/${id}`)
      return { success: true, message: res.data.message }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },
}
