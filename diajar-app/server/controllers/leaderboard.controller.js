import * as leaderboardService from '../services/leaderboard.service.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { success } from '../utils/response.js'

export const getLeaderboard = asyncHandler(async (req, res, next) => {
  try {
    const period = req.query.period === 'weekly' ? 'weekly' : 'global'
    const limit = parseInt(req.query.limit) || 20
    const users = await leaderboardService.getLeaderboard({ period, limit })
    return success(res, 'Papan peringkat berhasil diambil', { users })
  } catch (err) {
    next(err)
  }
})
