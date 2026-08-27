import * as adminService from '../services/admin.service.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { success, created, error as errorRes } from '../utils/response.js'

export const getPendingMaterials = asyncHandler(async (req, res, next) => {
  try {
    const { materials, count } = await adminService.getPendingMaterials(req.query)
    return success(res, 'Daftar materi pending berhasil diambil', { materials, total: count })
  } catch (err) {
    console.error('=== ERROR ADMIN SERVICE GET PENDING MATERIALS ===')
    console.error(err)
    next(err)
  }
})

export const updateMaterialStatus = asyncHandler(async (req, res, next) => {
  try {
    const result = await adminService.updateMaterialStatus(req.params.id, req.body)
    if (req.body.status === 'approved') {
      return success(res, `Status materi berhasil diperbarui menjadi approved. Author mendapatkan +200 EXP.`, result)
    }
    return success(res, 'Status materi berhasil diperbarui menjadi rejected', result)
  } catch (err) {
    if (err.code === 'PGRST116') return errorRes(res, 'Materi tidak ditemukan', 404)
    next(err)
  }
})

export const createCategory = asyncHandler(async (req, res, next) => {
  try {
    const result = await adminService.createCategory(req.body)
    return created(res, 'Kategori berhasil dibuat', result)
  } catch (err) {
    if (err.code === '23505') return errorRes(res, 'Slug atau nama kategori sudah ada', 409)
    next(err)
  }
})

export const updateCategory = asyncHandler(async (req, res, next) => {
  try {
    const result = await adminService.updateCategory(req.params.id, req.body)
    return success(res, 'Kategori berhasil diperbarui', result)
  } catch (err) {
    if (err.code === 'PGRST116') return errorRes(res, 'Kategori tidak ditemukan', 404)
    if (err.code === '23505') return errorRes(res, 'Slug atau nama kategori sudah ada', 409)
    next(err)
  }
})

export const deleteCategory = asyncHandler(async (req, res, next) => {
  try {
    await adminService.deleteCategory(req.params.id)
    return success(res, 'Kategori berhasil dihapus', {})
  } catch (err) {
    if (err.code === 'PGRST116') return errorRes(res, 'Kategori tidak ditemukan', 404)
    next(err)
  }
})

export const getMaterialDetailForAdmin = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params
    const material = await adminService.getMaterialById(id)
    if (!material) return errorRes(res, 'Materi tidak ditemukan', 404)
    return success(res, 'Detail materi berhasil diambil', material)
  } catch (err) {
    if (err.code === 'PGRST116') return errorRes(res, 'Materi tidak ditemukan', 404)
    next(err)
  }
})