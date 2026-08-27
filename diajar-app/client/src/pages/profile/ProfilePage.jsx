import { useAuthStore } from '../../store/auth'
import { Calendar, Mail, Trophy, BarChart3, Shield } from 'lucide-react'

export default function ProfilePage() {
  const token = useAuthStore((s) => s.token)
  const user = useAuthStore((s) => s.user)
  const refreshUser = useAuthStore((s) => s.refreshUser)
  const logout = useAuthStore((s) => s.logout)

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy mb-3">Akses Ditolak</h2>
          <p className="text-slate-500 mb-6">
            Silakan masuk untuk melihat profil Anda.
          </p>
          <a
            href="/auth"
            className="inline-block bg-primary hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl transition"
          >
            Masuk
          </a>
        </div>
      </div>
    )
  }

  if (!user) {
    refreshUser()
    return (
      <div className="min-h-screen bg-slate-50 pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-slate-500">Memuat profil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-blue-600 px-8 py-8 text-white">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-extrabold">
                {user.name?.[0] || user.email?.[0] || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-extrabold">{user.name}</h1>
                <p className="text-white/80">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="px-8 py-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-navy mb-4">Statistik Akun</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <Trophy className="w-6 h-6 mx-auto text-yellow-400 mb-2" />
                <div className="text-2xl font-bold text-navy">{user.level || 1}</div>
                <div className="text-xs text-slate-500">Level</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <BarChart3 className="w-6 h-6 mx-auto text-primary mb-2" />
                <div className="text-2xl font-bold text-navy">{user.total_exp || 0}</div>
                <div className="text-xs text-slate-500">Total EXP</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <Shield className="w-6 h-6 mx-auto text-purple-500 mb-2" />
                <div className="text-2xl font-bold text-navy">{user.total_points || 0}</div>
                <div className="text-xs text-slate-500">Points</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <Calendar className="w-6 h-6 mx-auto text-green-500 mb-2" />
                <div className="text-sm font-bold text-navy">
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString('id-ID')
                    : '-'}
                </div>
                <div className="text-xs text-slate-500">Tgl Daftar</div>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="px-8 py-6">
            <h2 className="text-lg font-bold text-navy mb-4">Informasi Akun</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500">Nama Lengkap</span>
                <div className="font-semibold text-navy">{user.name}</div>
              </div>
              <div>
                <span className="text-slate-500">Email</span>
                <div className="font-semibold text-navy flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
              </div>
              <div>
                <span className="text-slate-500">Role</span>
                <div className="font-semibold text-navy capitalize">{user.role || 'user'}</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-8 py-4 border-t border-slate-100 flex justify-end gap-3">
            <a
              href="/dashboard"
              className="px-4 py-2 text-sm font-semibold text-navy hover:bg-slate-100 rounded-lg transition"
            >
              Dashboard
            </a>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
