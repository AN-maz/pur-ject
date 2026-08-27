import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import { materialService } from '../../api/materialService'
import { useQuery } from '@tanstack/react-query'
import { BookOpen, PenSquare, Trophy, BarChart3, Star } from 'lucide-react'

const TIER_THRESHOLDS = [
  { threshold: 0, name: 'Bronze', color: 'text-orange-400' },
  { threshold: 100, name: 'Silver', color: 'text-slate-300' },
  { threshold: 500, name: 'Gold', color: 'text-yellow-400' },
  { threshold: 1000, name: 'Platinum', color: 'text-purple-400' },
  { threshold: 2000, name: 'Diamond', color: 'text-blue-400' },
]

export default function DashboardOverview() {
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const navigate = useNavigate()

  // 🟢 REDIRECT OTOMATIS JIKA ROLE ADALAH ADMIN
  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin/moderation', { replace: true })
    }
  }, [user, navigate])

  const { data: materialsRes, isLoading } = useQuery({
    queryKey: ['user-materials'],
    queryFn: () => materialService.getUserMaterials(),
    enabled: !!token && user?.role !== 'admin',
    staleTime: 2 * 60 * 1000,
  })

  const materials = materialsRes?.success ? materialsRes.data?.materials || [] : []

  const totalExp = user?.total_exp || 0
  const currentLevel = user?.level || 1
  const totalPoints = user?.total_points || 0

  const getTier = (exp) => {
    let tier = TIER_THRESHOLDS[0]
    for (const t of TIER_THRESHOLDS) {
      if (exp >= t.threshold) tier = t
    }
    return tier
  }

  const nextTier = TIER_THRESHOLDS.find((t) => t.threshold > totalExp) || TIER_THRESHOLDS[TIER_THRESHOLDS.length - 1]
  const progressExp = totalExp
  const progressPercent = nextTier ? Math.max(0, (progressExp / nextTier.threshold) * 100) : 100

  const stats = [
    {
      label: 'Level Saat Ini',
      value: `Level ${currentLevel}`,
      icon: <Trophy className="w-6 h-6 text-yellow-400" />,
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
    },
    {
      label: 'Total EXP',
      value: totalExp.toLocaleString(),
      icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
    {
      label: 'Total Poin',
      value: totalPoints.toLocaleString(),
      icon: <Star className="w-6 h-6 text-purple-500" />,
      bg: 'bg-purple-50',
      border: 'border-purple-200',
    },
    {
      label: 'Materi Dibuat',
      value: materials.length,
      icon: <PenSquare className="w-6 h-6 text-green-500" />,
      bg: 'bg-green-50',
      border: 'border-green-200',
    },
  ]

  return (
    <div className="space-y-8">

      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-navy">
          Halo, {user?.name || 'Petualang'}!
        </h1>
        <p className="text-slate-500 mt-1">
          Selamat belajar dan berbagi ilmu hari ini.
        </p>
      </div>

      {/* Tier Info */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className={`text-sm font-bold ${getTier(totalExp).color}`}>
              {getTier(totalExp).name}
            </span>
            <span className="text-slate-400 text-sm ml-2">
              {nextTier && `${totalExp} / ${nextTier.threshold} EXP untuk ${nextTier.name}`}
            </span>
          </div>
        </div>

        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} border ${stat.border} rounded-2xl p-5 text-center`}
          >
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <div className="text-2xl font-extrabold text-navy">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-navy mb-4">Aksi Cepat</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/dashboard/materi/create"
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-blue-600 transition"
          >
            <PenSquare className="w-4 h-4" />
            Buat Materi
          </Link>
          <Link
            to="/dashboard/materi/my-materials"
            className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-navy rounded-xl font-semibold hover:bg-slate-50 transition"
          >
            <BookOpen className="w-4 h-4" />
            Kelola Materi Saya
          </Link>
          <Link
            to="/materi"
            className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-navy rounded-xl font-semibold hover:bg-slate-50 hover:text-primary transition"
          >
            <BookOpen className="w-4 h-4" />
            Eksplor Materi
          </Link>
        </div>
      </div>

      {/* My Materials */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-navy">Materi Saya</h2>
          <Link
            to="/dashboard/materi/my-materials"
            className="text-sm text-primary hover:underline"
          >
            Lihat semua
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : materials.length === 0 ? (
          <p className="text-center py-8 text-slate-500">
            Kamu belum membuat materi.{' '}
            <Link to="/dashboard/materi/create" className="text-primary font-semibold">
              Buat materi pertama!
            </Link>
          </p>
        ) : (
          <div className="space-y-3">
            {materials.slice(0, 5).map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-navy">{m.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                    <span>Status: {getStatusLabel(m.status)}</span>
                    <span>Dibuat: {new Date(m.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                  {m.rejection_reason && (
                    <p className="text-xs text-red-500 mt-1 line-clamp-1">
                      Alasan: {m.rejection_reason}
                    </p>
                  )}
                </div>
                <StatusBadge status={m.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const config = {
    pending: 'bg-amber-50 text-amber-700 border border-amber-200',
    approved: 'bg-green-50 text-green-700 border border-green-200',
    rejected: 'bg-red-50 text-red-700 border border-red-200',
  }
  const label = {
    pending: 'Pending',
    approved: 'Disetujui',
    rejected: 'Ditolak',
  }
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config[status] || config.pending}`}>
      {label[status] || status}
    </span>
  )
}

function getStatusLabel(status) {
  return {
    pending: 'Menunggu Review',
    approved: 'Disetujui',
    rejected: 'Ditolak',
  }[status] || status
}