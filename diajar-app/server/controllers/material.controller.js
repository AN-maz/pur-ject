import * as materialService from '../services/material.service.js'
import * as ratingService from '../services/rating.service.js'
import * as commentService from '../services/comment.service.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { success, created, error as errorRes } from '../utils/response.js'

export const listMaterials = asyncHandler(async (req, res, next) => {
  try {
    const result = await materialService.listMaterials(req.query)
    return success(res, 'Katalog materi berhasil diambil', result)
  } catch (err) {
    next(err)
  }
})

export const getMaterialDetail = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user?.id
    const result = await materialService.getMaterialDetail(req.params.slug, userId)
    return success(res, 'Detail materi berhasil diambil', result)
  } catch (err) {
    if (err.code === 'PGRST116' || !err.status) return errorRes(res, 'Materi tidak ditemukan', 404)
    next(err)
  }
})

export const createMaterial = asyncHandler(async (req, res, next) => {
  try {
    const result = await materialService.createMaterial({
      ...req.body,
      author_id: req.user.id
    })
    return created(res, 'Materi berhasil diajukan dan menunggu persetujuan admin', result)
  } catch (err) {
    next(err)
  }
})

export const getUserMaterials = asyncHandler(async (req, res, next) => {
  try {
    const materials = await materialService.getUserMaterials(req.user.id)
    return success(res, 'Daftar materi user berhasil diambil', { materials })
  } catch (err) {
    next(err)
  }
})

export const updateMaterial = asyncHandler(async (req, res, next) => {
  try {
    const result = await materialService.updateMaterial(req.params.id, req.user.id, req.body)
    return success(res, 'Materi berhasil diperbarui, status kembali ke pending', result)
  } catch (err) {
    if (err.status === 403) return errorRes(res, 'Anda tidak memiliki akses ke materi ini', 403)
    if (err.code === 'PGRST116') return errorRes(res, 'Materi tidak ditemukan', 404)
    next(err)
  }
})

export const markComplete = asyncHandler(async (req, res, next) => {
  try {
    const result = await materialService.markComplete(req.params.id, req.user.id)
    if (result.expGained === 0) {
      return success(res, 'Materi sudah selesai dibaca sebelumnya', result)
    }
    return success(res, `Materi selesai dibaca! Kamu mendapatkan +${result.expGained} EXP`, {
      exp_gained: result.expGained,
      current_total_exp: result.totalExp,
      current_level: result.level,
      is_level_up: result.isLevelUp
    })
  } catch (err) {
    if (err.status === 404) return errorRes(res, 'Materi tidak ditemukan atau belum disetujusi', 404)
    next(err)
  }
})

export const createRating = asyncHandler(async (req, res, next) => {
  try {
    const result = await ratingService.createRating(req.params.id, req.user.id, req.body.rating_value)
    return created(res, 'Rating berhasil dikirim! Kamu mendapatkan +10 Points', result)
  } catch (err) {
    next(err)
  }
})

export const listComments = asyncHandler(async (req, res, next) => {
  try {
    const { comments, isMaterialApproved } = await commentService.listComments(req.params.id)
    if (!isMaterialApproved) return errorRes(res, 'Material tidak ditemukan', 404)
    return success(res, 'Daftar komentar berhasil diambil', { comments })
  } catch (err) {
    next(err)
  }
})

export const postComment = asyncHandler(async (req, res, next) => {
  try {
    const result = await commentService.createComment(req.params.id, req.user.id, req.body.comment_text)
    return created(res, 'Komentar berhasil dikirim', { comment: result })
  } catch (err) {
    if (err.status === 404) return errorRes(res, 'Material tidak ditemukan', 404)
    next(err)
  }
})
