import { supabase } from '../config/supabase.js'

export async function getAllCategories () {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, description, created_at')
    .order('name', { ascending: true })

  if (error) throw error
  return data
}

export async function getCategoryBySlug (slug) {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, description')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}
