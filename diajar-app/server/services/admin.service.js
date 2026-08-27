import { supabase } from '../config/supabase.js'
import { awardExp, EXP } from './gamification.service.js'
import { updateAverageRating } from './rating.service.js'

export async function getPendingMaterials ({ page = 1, limit = 20 }) {
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error } = await supabase
    .from('materials')
    .select(`
      id, title, status, rejection_reason,
      category:categories ( id, name ),
      author:users ( id, name, level ),
      average_rating, ratings_count, created_at
    `, { count: 'exact' })
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
    .range(from, to)

  if (error) throw error

  return {
    materials: (data || []).map((m) => ({
      id: m.id,
      title: m.title,
      status: m.status,
      category: m.category ? { id: m.category.id, name: m.category.name } : null,
      author: m.author ? { id: m.author.id, name: m.author.name, level: m.author.level } : null,
      average_rating: Number(m.average_rating) || 0,
      ratings_count: m.ratings_count,
      rejection_reason: m.rejection_reason,
      created_at: m.created_at
    })),
    count
  }
}

export async function updateMaterialStatus (materialId, { status, rejection_reason }) {
  const result = await supabase.rpc('approve_or_reject_material', {
    p_material_id: materialId,
    p_new_status: status,
    p_rejection_reason: rejection_reason || null
  })

  const { data: updated, error: fetchErr } = await supabase
    .from('materials')
    .select('id, status, author_id, title')
    .eq('id', materialId)
    .single()

  if (fetchErr) throw fetchErr

  let expResult = null
  if (status === 'approved') {
    expResult = await awardExp(updated.author_id, EXP.MATERIAL_APPROVED)
    try {
      await supabase.rpc('invalidate_leaderboard_cache')
    } catch (e) {
      void e
    }
  }

  await updateAverageRating(materialId)

  return {
    material_id: updated.id,
    status: updated.status,
    author_exp_rewarded: expResult ? expResult.expGained : 0
  }
}

export async function createCategory ({ name, slug, description }) {
  const { data, error } = await supabase
    .from('categories')
    .insert({ name, slug, description })
    .select('id, name, slug, description, created_at')
    .single()

  if (error) throw error
  return data
}

export async function updateCategory (categoryId, { name, slug, description }) {
  const payload = {}
  if (name) payload.name = name
  if (slug) payload.slug = slug
  if (description !== undefined) payload.description = description

  const { data, error } = await supabase
    .from('categories')
    .update(payload)
    .eq('id', categoryId)
    .select('id, name, slug, description, created_at')
    .single()

  if (error) throw error
  return data
}

export async function deleteCategory (categoryId) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', categoryId)

  if (error) throw error
  return { message: 'Category deleted' }
}
