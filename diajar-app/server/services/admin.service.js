import { supabase } from '../config/supabase.js'
import { awardExp, EXP } from './gamification.service.js'
import { updateAverageRating } from './rating.service.js'

export async function getPendingMaterials(queryParams = {}) {
  const { page = 1, limit = 20, status = 'pending' } = queryParams
  const pageNum = parseInt(page, 10)
  const limitNum = parseInt(limit, 10)
  const offset = (pageNum - 1) * limitNum

  let query = supabase
    .from('materials')
    .select(
      `
      *,
      author:users(id, name, email),
      category:categories(id, name)
    `,
      { count: 'exact' }
    )

  if (status) {
    query = query.eq('status', status)
  }

  const { data, count, error } = await query
    .range(offset, offset + limitNum - 1)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase Query Error:', error)
    throw error
  }

  return {
    materials: data || [],
    count: count || 0,
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
export const getMaterialById = async (id) => {
  const { data, error } = await supabase
    .from('materials')
    .select(`
      *,
      author:users(id, name, email),
      category:categories(id, name)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}