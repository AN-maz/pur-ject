import { Link, NavLink } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import { LayoutDashboard, PenSquare, BookOpen, Trophy, User } from 'lucide-react'

export default function DashboardLayout({ children }) {
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)

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
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <div className="flex items-center gap-3 px-4 py-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  {user?.name?.[0] || user?.email?.[0] || 'U'}
                </div>
                <div>
                  <div className="font-bold text-navy">{user?.name || 'User'}</div>
                  <div className="text-xs text-slate-400">{user?.role || 'user'}</div>
                </div>
              </div>

              <nav className="space-y-1">
                <NavItem to="/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
                <NavItem to="/materi" icon={<BookOpen />} label="Eksplor Materi" />
                <NavItem to="/dashboard/materi/my-materials" icon={<PenSquare />} label="Materi Saya" />
                <NavItem to="/dashboard/materi/create" icon={<PenSquare />} label="Buat Materi" />
                <NavItem to="/leaderboard" icon={<Trophy />} label="Leaderboard" />
                <NavItem to="/profile" icon={<User />} label="Profil" />
              </nav>
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
            ? 'bg-primary/10 text-primary'
            : 'text-slate-600 hover:bg-slate-50 hover:text-navy'
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  )
}
