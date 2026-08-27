import { supabase } from '../config/supabase.js'
import { sanitizeContent } from '../middlewares/sanitize.js'

export async function listComments (materialId) {
  const { data: material } = await supabase
    .from('materials')
    .select('id, status')
    .eq('id', materialId)
    .eq('status', 'approved')
    .single()

  if (!material) return { comments: [], isMaterialApproved: false }

  const { data, error } = await supabase
    .from('comments')
    .select(`
      id, comment_text, created_at,
      author:users!inner ( id, name, level )
    `)
    .eq('material_id', materialId)
    .order('created_at', { ascending: true })

  if (error) throw error

  return {
    comments: (data || []).map((c) => ({
      id: c.id,
      comment_text: c.comment_text,
      created_at: c.created_at,
      author: c.author ? { id: c.author.id, name: c.author.name, level: c.author.level } : null
    })),
    isMaterialApproved: true
  }
}

export async function createComment (materialId, userId, commentText) {
  const { data: material } = await supabase
    .from('materials')
    .select('id, status')
    .eq('id', materialId)
    .single()

  if (!material) {
    const err = new Error('Material not found')
    err.status = 404
    throw err
  }

  const sanitized = sanitizeContent(commentText)

  const { data, error } = await supabase
    .from('comments')
    .insert({
      material_id: materialId,
      user_id: userId,
      comment_text: sanitized
    })
    .select('id, comment_text, created_at')
    .single()

  if (error) throw error

  return data
}
