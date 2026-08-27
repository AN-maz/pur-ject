import * as categoryService from '../services/category.service.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { success, created, error as errorRes } from '../utils/response.js'

export const getAllCategories = asyncHandler(async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories()
    return success(res, 'Daftar kategori berhasil diambil', categories)
  } catch (err) {
    next(err)
  }
})

export const getCategoryBySlug = asyncHandler(async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryBySlug(req.params.slug)
    return success(res, 'Detail kategori berhasil diambil', { category })
  } catch (err) {
    if (err.code === 'PGRST116') return errorRes(res, 'Kategori tidak ditemukan', 404)
    next(err)
  }
})
