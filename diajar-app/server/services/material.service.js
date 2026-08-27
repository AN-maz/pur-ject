import { supabase } from '../config/supabase.js'
import { awardExp, EXP } from './gamification.service.js'

const DEFAULT_COVER_URL = 'https://via.placeholder.com/800x400?text=No+Cover+Image'
const MAX_LIMIT = 50


function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') + '-' + Date.now()
}

export async function listMaterials ({ category_id, search, sort, page, limit }) {
  let query = supabase
    .from('materials')
    .select(`
      id, title, slug, cover_image_url, content, status,
      category:categories ( id, name ),
      author:users!inner ( id, name, level ),
      average_rating, ratings_count, created_at
    `, { count: 'exact' })
    .eq('status', 'approved')

  if (category_id) query = query.eq('category_id', category_id)
  if (search) query = query.ilike('title', `%${search}%`)
  if (sort === 'popular') {
    query = query.order('ratings_count', { ascending: false })
  } else {
    query = query.order('created_at', { ascending: false })
  }

  const lim = Math.min(Math.max(1, Number(limit) || 10), MAX_LIMIT)
  const pg = Math.max(1, Number(page) || 1)
  const from = (pg - 1) * lim
  const to = from + lim - 1
  query = query.range(from, to)

  const { data, count, error } = await query

  if (error && !/range not satisfiable|result out of range|Requested range not satisfiable/i.test(error.message)) {
    throw error
  }

  const materials = (data || []).map((m) => ({
    id: m.id,
    title: m.title,
    slug: m.slug,
    cover_image_url: m.cover_image_url,
    author: m.author ? { id: m.author.id, name: m.author.name } : null,
    category: m.category ? { id: m.category.id, name: m.category.name } : null,
    average_rating: Number(m.average_rating) || 0,
    ratings_count: m.ratings_count,
    created_at: m.created_at
  }))

  return {
    materials,
    pagination: {
      total_items: count || 0,
      total_pages: count ? Math.ceil(count / lim) : 0,
      current_page: pg,
      limit: lim
    }
  }
}

export async function getMaterialDetail (slug, userId = null) {
  const { data, error } = await supabase
    .from('materials')
    .select(`
      id, title, slug, cover_image_url, content, status,
      category:categories ( id, name ),
      author:users ( id, name, level ),
      average_rating, ratings_count, created_at
    `)
    .eq('slug', slug)
    .eq('status', 'approved')
    .single()

  if (error) throw error

  let userProgress = null
  if (userId) {
    const { data: progress } = await supabase
      .from('reading_progress')
      .select('is_completed')
      .eq('user_id', userId)
      .eq('material_id', data.id)
      .single()

    const { data: existingRating } = await supabase
      .from('ratings')
      .select('id')
      .eq('user_id', userId)
      .eq('material_id', data.id)
      .single()

    userProgress = {
      is_completed: progress?.is_completed || false,
      has_rated: !!existingRating
    }
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    cover_image_url: data.cover_image_url,
    content: data.content,
    author: data.author ? { id: data.author.id, name: data.author.name, level: data.author.level } : null,
    category: data.category ? { id: data.category.id, name: data.category.name } : null,
    average_rating: Number(data.average_rating) || 0,
    ratings_count: data.ratings_count,
    user_progress: userProgress,
    created_at: data.created_at
  }
}

export async function createMaterial ({ author_id, category_id, title, cover_image_url, content, slug }) {

  const finalCoverUrl = (cover_image_url && cover_image_url.trim() !== '') 
    ? cover_image_url 
    : DEFAULT_COVER_URL

  const finalSlug = slug || generateSlug(title)

  const { data, error } = await supabase
    .from('materials')
    .insert({
      author_id,
      category_id,
      title,
      slug: finalSlug,
      cover_image_url: finalCoverUrl,
      content,
      status: 'pending',
      rejection_reason: null,
      average_rating: 0,
      ratings_count: 0
    })
    .select('id, status, created_at')
    .single()

  if (error) throw error
  return data
}

export async function getUserMaterials (userId) {
  const { data, error } = await supabase
    .from('materials')
    .select('id, title, status, rejection_reason, created_at, updated_at')
    .eq('author_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data || []).map((m) => ({
    id: m.id,
    title: m.title,
    status: m.status,
    rejection_reason: m.rejection_reason,
    created_at: m.created_at,
    updated_at: m.updated_at
  }))
}

export async function updateMaterial (materialId, userId, { category_id, title, cover_image_url, content }) {
  const { data: material, error: fetchErr } = await supabase
    .from('materials')
    .select('author_id')
    .eq('id', materialId)
    .single()

  if (fetchErr) throw fetchErr
  if (material.author_id !== userId) {
    const err = new Error('You do not own this material')
    err.status = 403
    throw err
  }

  const payload = {}
  if (category_id !== undefined) payload.category_id = category_id
  if (title !== undefined) payload.title = title
  if (cover_image_url !== undefined) payload.cover_image_url = cover_image_url
  if (content !== undefined) payload.content = content

  payload.status = 'pending'
  payload.rejection_reason = null

  const { data, error } = await supabase
    .from('materials')
    .update(payload)
    .eq('id', materialId)
    .select('id, title, status, created_at')
    .single()

  if (error) throw error
  return data
}

export async function markComplete (materialId, userId) {
  const { data: material, error: matErr } = await supabase
    .from('materials')
    .select('id, status')
    .eq('id', materialId)
    .eq('status', 'approved')
    .single()

  if (matErr) throw matErr
  if (!material) {
    const err = new Error('Material not found or not approved')
    err.status = 404
    throw err
  }

  const { data: existing, error: progErr } = await supabase
    .from('reading_progress')
    .select('exp_rewarded')
    .eq('user_id', userId)
    .eq('material_id', materialId)
    .single()

  if (progErr && progErr.code !== 'PGRST116') throw progErr

  if (existing?.exp_rewarded) {
    return { expGained: 0, totalExp: null, level: null, isLevelUp: false, message: 'Already completed' }
  }

  const { error: upsertErr } = await supabase
    .from('reading_progress')
    .upsert({
      user_id: userId, material_id: materialId,
      is_completed: true, exp_rewarded: true, completed_at: new Date().toISOString()
    })

  if (upsertErr) throw upsertErr

  const result = await awardExp(userId, EXP.READ_COMPLETE)
  return result
}

export async function getUserRating (materialId, userId) {
  const { data, error } = await supabase
    .from('ratings')
    .select('id, rating_value, created_at')
    .eq('user_id', userId)
    .eq('material_id', materialId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}
