import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import { LayoutDashboard, AlertCircle, Tag, Shield, LogOut } from 'lucide-react'

export default function AdminLayout({ children }) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">

          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col justify-between min-h-[calc(100vh-140px)]">
              <div>
                {/* Header Profile Admin */}
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-bold text-navy truncate">Admin Panel</div>
                    <div className="text-xs text-slate-400 truncate">
                      {user?.name || 'Admin'}
                    </div>
                  </div>
                </div>

                {/* Navigasi Admin */}
                <nav className="space-y-1">
                  <NavItem to="/admin" icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" />
                  <NavItem to="/admin/moderation" icon={<AlertCircle className="w-4 h-4" />} label="Moderasi" />
                  <NavItem to="/admin/categories" icon={<Tag className="w-4 h-4" />} label="Kategori" />
                </nav>
              </div>

              {/* Tombol Logout */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer"
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
            ? 'bg-red-50 text-red-600 font-semibold'
            : 'text-slate-600 hover:bg-slate-50 hover:text-navy'
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  )
}