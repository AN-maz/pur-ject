import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY harus diisi di file .env')
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  db: { schema: 'public' },
  global: { headers: { 'x-application': 'lms-backend' } }
})

export function createServerSupabase (token) {
  return createClient(supabaseUrl, supabaseServiceRoleKey, token ? {
    global: { headers: { Authorization: `Bearer ${token}` } }
  } : {})
}

export default supabase
