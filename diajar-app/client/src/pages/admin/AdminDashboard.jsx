import { Link } from 'react-router-dom'
import { useMaterialStats } from '../../hooks/useAdmin'
import { useAuthStore } from '../../store/auth'
import { FileText, AlertCircle, Tag, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const user = useAuthStore((s) => s.user)
  const { data: stats } = useMaterialStats()

  const statCards = [
    {
      label: 'Materi Pending',
      value: stats?.pendingCount || 0,
      icon: <AlertCircle className="w-6 h-6 text-amber-500" />,
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
    {
      label: 'Total Kategori',
      value: stats?.categoryCount || 0,
      icon: <Tag className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
    {
      label: 'Total Materi',
      value: stats?.totalMaterialCount || 0,
      icon: <FileText className="w-6 h-6 text-green-500" />,
      bg: 'bg-green-50',
      border: 'border-green-200',
    },
    {
      label: 'Level Admin',
      value: user?.level || 1,
      icon: <TrendingUp className="w-6 h-6 text-purple-500" />,
      bg: 'bg-purple-50',
      border: 'border-purple-200',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-navy">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 mt-1">
          Pantau dan kelola platform LMS Gamifikasi.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} border ${stat.border} rounded-2xl p-5 text-center`}
          >
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <div className="text-3xl font-extrabold text-navy">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/admin/moderation"
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-xl transition group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition">
              <AlertCircle className="w-7 h-7 text-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-navy text-lg">Moderasi Konten</h3>
              <p className="text-sm text-slate-500">
                Review {stats?.pendingCount || 0} materi yang pending
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/categories"
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-xl transition group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition">
              <Tag className="w-7 h-7 text-blue-500" />
            </div>
            <div>
              <h3 className="font-bold text-navy text-lg">Kelola Kategori</h3>
              <p className="text-sm text-slate-500">
                {stats?.categoryCount || 0} kategori terdaftar
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
