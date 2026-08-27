import { supabase } from '../config/supabase.js'

export default async function auth (req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required' })
  }

  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' })
  }

  // Ambil role dari tabel DB public.users
  const userRole = await getUserRole(user.id)

  req.user = {
    id: user.id,
    email: user.email,
    role: userRole
  }

  next()
}

async function getUserRole (userId) {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single()

  if (error || !data) return 'user'
  return data.role || 'user'
}