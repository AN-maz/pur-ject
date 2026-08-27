import { supabase } from '../config/supabase.js'
import crypto from 'crypto'

function hashPassword (password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex')
  return `${salt}:${hash}`
}

export async function register ({ name, email, password }) {

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email, 
    password,
    options: {
      data: { name }, 
      email_redirect_to: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/auth`
    }
  })

  if (signUpError) throw signUpError

  if (!authData.user) {
    throw new Error('Gagal mendapatkan ID user dari Supabase Auth')
  }

  const { data: profile, error: profileError } = await supabase
    .from('users')
    .upsert({
      id: authData.user.id,
      name,
      email,
      role: 'user',
      password_hash: hashPassword(password),
      total_exp: 0,
      level: 1,
      total_points: 0
    }, { onConflict: 'id' })
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
