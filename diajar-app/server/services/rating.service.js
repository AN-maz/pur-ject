import { supabase } from '../config/supabase.js'
import { awardExp, awardPoints, EXP, POINTS } from './gamification.service.js'

export async function createRating (materialId, userId, ratingValue) {
  const { data: existing } = await supabase
    .from('ratings')
    .select('id, point_rewarded')
    .eq('user_id', userId)
    .eq('material_id', materialId)
    .single()

  const isFirstRating = !existing

  let data, error

  if (existing) {
    ({ data, error } = await supabase
      .from('ratings')
      .update({ rating_value: ratingValue })
      .eq('id', existing.id)
      .select())
  } else {
    ({ data, error } = await supabase
      .from('ratings')
      .insert({ user_id: userId, material_id: materialId, rating_value: ratingValue, point_rewarded: isFirstRating })
      .select())
  }

  if (error) throw error

  let pointsGained = 0
  let totalPoints = null

  if (isFirstRating) {
    const pt = await awardPoints(userId, POINTS.RATING)
    pointsGained = pt.pointsGained
    totalPoints = pt.totalPoints
  }

  await updateAverageRating(materialId)

  const avg = await getAverageRating(materialId)

  const { data: material, error: matErr } = await supabase
    .from('materials')
    .select('author_id, ratings_count')
    .eq('id', materialId)
    .single()

  if (matErr) throw matErr

  let expGained = 0
  if (ratingValue >= 4 && material.author_id !== userId) {
    const expResult = await awardExp(material.author_id, EXP.HIGH_RATING)
    expGained = expResult.expGained
    await awardPoints(material.author_id, POINTS.HIGH_RATING)
  }

  return {
    rating: { id: data[0].id, rating_value: ratingValue },
    points_gained: pointsGained,
    current_total_points: totalPoints,
    new_average_rating: avg
  }
}

export async function updateAverageRating (materialId) {
  const { data, error } = await supabase
    .rpc('calculate_average_rating', { p_material_id: materialId })

  if (error) throw error
  return data
}

export async function getAverageRating (materialId) {
  const { data, error } = await supabase
    .from('materials')
    .select('average_rating, ratings_count')
    .eq('id', materialId)
    .single()

  if (error) throw error
  return Number(data.average_rating) || 0
}
