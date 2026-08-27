import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import { LayoutDashboard, AlertCircle, Tag, Shield } from 'lucide-react'

export default function AdminLayout({ children }) {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">

          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <div className="flex items-center gap-3 px-4 py-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="font-bold text-navy">Admin Panel</div>
                  <div className="text-xs text-slate-400">
                    {user?.name || 'Admin'}
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                <NavItem to="/admin" icon={<LayoutDashboard />} label="Dashboard" />
                <NavItem to="/admin/moderation" icon={<AlertCircle />} label="Moderasi" />
                <NavItem to="/admin/categories" icon={<Tag />} label="Kategori" />
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
            ? 'bg-red-50 text-red-600'
            : 'text-slate-600 hover:bg-slate-50 hover:text-navy'
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  )
}
