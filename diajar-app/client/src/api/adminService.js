import apiClient from './apiClient'

const extractError = (err) =>
  err.response?.data?.message ||
  err.response?.data?.error ||
  err.message ||
  'Terjadi kesalahan'

export const adminService = {
  // GET Daftar Materi Moderasi (Mendukung query filter yang aman)
  async getPendingMaterials(params = {}) {
    try {
      // Bersihkan params agar hanya mengirim param yang diisi
      const cleanParams = {}
      if (params.page) cleanParams.page = params.page
      if (params.limit) cleanParams.limit = params.limit
      if (params.status && params.status !== 'all') cleanParams.status = params.status

      const res = await apiClient.get('/admin/materials', { params: cleanParams })
      return { success: true, data: res.data.data }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  // GET Detail Materi via Endpoint Admin (/admin/materials/:id)
  async getMaterialById(materialId) {
    try {
      const res = await apiClient.get(`/admin/materials/${materialId}`)
      return { success: true, data: res.data.data }
    } catch (err) {
      return { success: false, error: extractError(err) }
    }
  },

  // UPDATE Status Materi (Approve / Reject)
  async updateMaterialStatus(id, status, rejectionReason = null) {
    try {
      const payload = { status }
      // Hanya sertakan rejection_reason jika statusnya 'rejected'
      if (status === 'rejected' && rejectionReason) {
        payload.rejection_reason = rejectionReason
      }

      const res = await apiClient.patch(`/admin/materials/${id}/status`, payload)
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

  // Alias untuk getPendingMaterials jika ada komponen yang memanggil getAllMaterials
  async getAllMaterials(params = {}) {
    return this.getPendingMaterials(params)
  }
}