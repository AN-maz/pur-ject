import { supabase } from '../config/supabase.js'

export const db = {
  select (table, columns = '*') {
    return supabase.from(table).select(columns)
  },

  insert (table, payload) {
    return supabase.from(table).insert(payload).select()
  },

  update (table, payload, col = 'id', value) {
    return supabase.from(table).update(payload).eq(col, value).select()
  },

  upsert (table, payload, onConflict) {
    return supabase.from(table).upsert(payload, { onConflict }).select()
  },

  remove (table, col = 'id', value) {
    return supabase.from(table).delete().eq(col, value)
  },

  rpc (fn, params = {}) {
    return supabase.rpc(fn, params)
  },

  storage () {
    return supabase.storage
  }
}

export default db
