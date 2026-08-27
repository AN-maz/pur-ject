import { supabase } from '../config/supabase.js'

export async function getLeaderboard ({ period = 'global', limit = 20 }) {
  const lim = Math.min(Math.max(1, limit), 100)

  if (period === 'weekly') {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const { data, error } = await supabase
      .from('exp_log')
      .select(`
        user_id,
        exp_gained,
        created_at,
        users!inner ( id, name, level )
      `, { count: 'exact' })
      .gte('created_at', oneWeekAgo)
      .order('exp_gained', { ascending: false })
      .limit(lim)

    if (!error && data) {
      const usersMap = new Map()
      for (const entry of data) {
        const u = entry.users
        if (!u) continue
        const current = usersMap.get(u.id) || { user_id: u.id, name: u.name, level: u.level, weekly_exp: 0 }
        current.weekly_exp += Number(entry.exp_gained) || 0
        usersMap.set(u.id, current)
      }
      const ranked = Array.from(usersMap.values())
        .sort((a, b) => b.weekly_exp - a.weekly_exp)
        .slice(0, lim)
        .map((u, idx) => ({
          rank: idx + 1,
          user_id: u.user_id,
          name: u.name,
          level: u.level,
          total_exp: u.weekly_exp
        }))
      return ranked
    }
    // fallback ke global jika exp_log tidak ada/error
  }

  const { data, error } = await supabase
    .from('users')
    .select('id, name, level, total_exp')
    .neq('total_exp', 0)
    .order('total_exp', { ascending: false })
    .limit(lim)

  if (error) throw error

  return (data || []).map((u, idx) => ({
    rank: idx + 1,
    user_id: u.id,
    name: u.name,
    level: u.level,
    total_exp: u.total_exp
  }))
}
