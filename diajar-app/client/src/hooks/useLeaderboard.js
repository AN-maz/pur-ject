import { useQuery } from '@tanstack/react-query'
import apiClient from '../api/apiClient'

const extractError = (err) =>
  err.response?.data?.message ||
  err.response?.data?.error ||
  err.message ||
  'Terjadi kesalahan'

export function useLeaderboard(period = 'global') {
  return useQuery({
    queryKey: ['leaderboard', period],
    queryFn: async () => {
      try {
        const res = await apiClient.get('/leaderboard', { params: { period } })
        return { success: true, data: res.data.data }
      } catch (err) {
        return { success: false, error: extractError(err) }
      }
    },
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  })
}
