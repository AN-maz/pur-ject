import * as authService from '../services/auth.service.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { success } from '../utils/response.js'

export const register = asyncHandler(async (req, res, next) => {
  try {
    const result = await authService.register(req.body)
    if (result.access_token) {
      return success(res, result.message, { user: result.user, access_token: result.access_token }, 201)
    }
    return success(res, result.message, { user: result.user }, 201)
  } catch (err) {
    if (err.code === '23505' || err.message?.includes('already')) return success(res, 'Email sudah terdaftar', {}, 409)
    next(err)
  }
})

export const login = asyncHandler(async (req, res, next) => {
  try {
    const result = await authService.login(req.body)
    return success(res, 'Login berhasil', { user: result.user, access_token: result.access_token, refresh_token: result.refresh_token })
  } catch (err) {
    next(err)
  }
})

export const getMe = asyncHandler(async (req, res) => {
  return success(res, 'User profile fetched', { user: req.user })
})
