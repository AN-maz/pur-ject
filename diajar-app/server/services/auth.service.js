import { supabase } from '../config/supabase.js'

export async function register ({ name, email, password }) {
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email, password,
    options: {
      data: { full_name: name },
      email_redirect_to: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login`
    }
  })

  if (signUpError) throw signUpError

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .insert({
      id: authData.user?.id,
      name, email, role: 'user',
      total_exp: 0, level: 1, total_points: 0
    })
    .select('id, name, email, role, total_exp, level, total_points, created_at')
    .single()

  if (profileError && profileError.code !== '23505') throw profileError

  return {
    user: profile,
    access_token: authData.session?.access_token || null,
    message: authData.user?.identities?.length === 0
      ? 'Cek email untuk konfirmasi'
      : 'Registrasi berhasil'
  }
}

export async function login ({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) throw error

  const { data: profile } = await supabase
    .from('users')
    .select('id, name, email, role, total_exp, level, total_points, created_at')
    .eq('id', data.user.id)
    .single()

  return {
    user: profile,
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token
  }
}
