import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import { LayoutDashboard, PenSquare, BookOpen, Trophy, User, Shield, LogOut } from 'lucide-react'

export default function DashboardLayout({ children }) {
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy mb-3">Akses Ditolak</h2>
          <p className="text-slate-500 mb-6">
            Silakan masuk untuk mengakses dashboard.
          </p>
          <Link
            to="/auth"
            className="inline-block bg-primary hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl transition"
          >
            Masuk
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">

          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col justify-between min-h-[calc(100vh-140px)]">
              <div>
                {/* User Info Header */}
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {user?.name?.[0] || user?.email?.[0] || 'U'}
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-bold text-navy truncate">{user?.name || 'User'}</div>
                    <div className="text-xs text-slate-400 capitalize">{user?.role || 'user'}</div>
                  </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-1">
                  <NavItem to="/dashboard" icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" />
                  <NavItem to="/materi" icon={<BookOpen className="w-4 h-4" />} label="Eksplor Materi" />
                  <NavItem to="/dashboard/materi/my-materials" icon={<PenSquare className="w-4 h-4" />} label="Materi Saya" />
                  <NavItem to="/dashboard/materi/create" icon={<PenSquare className="w-4 h-4" />} label="Buat Materi" />
                  <NavItem to="/leaderboard" icon={<Trophy className="w-4 h-4" />} label="Leaderboard" />
                  <NavItem to="/profile" icon={<User className="w-4 h-4" />} label="Profil" />

                  {/* Navigasi khusus Admin */}
                  {user?.role === 'admin' && (
                    <div className="pt-4 mt-4 border-t border-slate-100">
                      <div className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Admin Panel
                      </div>
                      <NavItem to="/admin" icon={<Shield className="w-4 h-4 text-red-500" />} label="Dashboard Admin" />
                      <NavItem to="/admin/moderation" icon={<Shield className="w-4 h-4 text-red-500" />} label="Moderasi Materi" />
                      <NavItem to="/admin/categories" icon={<Shield className="w-4 h-4 text-red-500" />} label="Kelola Kategori" />
                    </div>
                  )}
                </nav>
              </div>

              {/* Tombol Logout */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Keluar
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
          isActive
            ? 'bg-primary/10 text-primary font-semibold'
            : 'text-slate-600 hover:bg-slate-50 hover:text-navy'
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  )
}