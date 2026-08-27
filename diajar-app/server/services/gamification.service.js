import { supabase } from '../config/supabase.js'

export const LEVEL_THRESHOLDS = {
  computeLevel (totalExp) {
    if (totalExp <= 0) return 1
    return Math.floor(totalExp / 100) + 1
  }
}

export const EXP = {
  READ_COMPLETE: 50,
  MATERIAL_APPROVED: 200,
  HIGH_RATING: 20
}

export const POINTS = {
  RATING: 10,
  HIGH_RATING: 15
}

export async function awardExp (userId, amount) {
  const { data: user, error: fetchErr } = await supabase
    .from('users')
    .select('total_exp, level')
    .eq('id', userId)
    .single()

  if (fetchErr) throw fetchErr

  const newTotalExp = (user.total_exp || 0) + amount
  const newLevel = LEVEL_THRESHOLDS.computeLevel(newTotalExp)
  const isLevelUp = newLevel > (user.level || 1)

  const { data, error } = await supabase
    .from('users')
    .update({ total_exp: newTotalExp, level: newLevel })
    .eq('id', userId)
    .select('total_exp, level')
    .single()

  if (error) throw error

  return {
    expGained: amount,
    totalExp: data.total_exp,
    level: data.level,
    isLevelUp
  }
}

export async function awardPoints (userId, amount) {
  const { data, error } = await supabase
    .from('users')
    .increment('total_points', amount)
    .eq('id', userId)
    .select('total_points')
    .single()

  if (error) throw error
  return { pointsGained: amount, totalPoints: data.total_points }
}
