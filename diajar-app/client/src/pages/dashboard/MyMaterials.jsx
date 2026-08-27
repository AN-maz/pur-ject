import { Link } from 'react-router-dom'
import { materialService } from '../../api/materialService'
import { useAuthStore } from '../../store/auth'
import { useQuery } from '@tanstack/react-query'
import { PenSquare, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'

export default function MyMaterials() {
  const token = useAuthStore((s) => s.token)

  const { data: res, isLoading } = useQuery({
    queryKey: ['user-materials'],
    queryFn: () => materialService.getUserMaterials(),
    enabled: !!token,
  })

  const materials = res?.success ? res.data?.materials || [] : []

  const statusConfig = {
    pending: {
      icon: <Clock className="w-4 h-4 text-amber-500" />,
      label: 'Menunggu Review',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    approved: {
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
      label: 'Disetujui',
      color: 'bg-green-50 text-green-700 border-green-200',
    },
    rejected: {
      icon: <XCircle className="w-4 h-4 text-red-500" />,
      label: 'Ditolak',
      color: 'bg-red-50 text-red-700 border-red-200',
    },
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-navy">Materi Saya</h1>
        <Link
          to="/dashboard/materi/create"
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-blue-600 transition"
        >
          <PenSquare className="w-5 h-5" />
          Buat Materi Baru
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">
            {materials.filter((m) => m.status === 'pending').length}
          </div>
          <div className="text-xs text-slate-500">Pending</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {materials.filter((m) => m.status === 'approved').length}
          </div>
          <div className="text-xs text-slate-500">Disetujui</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {materials.filter((m) => m.status === 'rejected').length}
          </div>
          <div className="text-xs text-slate-500">Ditolak</div>
        </div>
      </div>

      {/* Materials List */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : materials.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <PenSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-navy mb-2">Belum ada materi</h3>
          <p className="text-slate-500 mb-6">
            Kamu belum membuat materi apa pun. Mulakan dengan membuat materi pertama!
          </p>
          <Link
            to="/dashboard/materi/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition"
          >
            <PenSquare className="w-5 h-5" />
            Buat Materi Sekarang
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {materials.map((m) => {
            const config = statusConfig[m.status] || statusConfig.pending
            const canEdit = m.status === 'rejected' || m.status === 'pending'
            return (
              <div
                key={m.id}
                className="bg-white rounded-xl border border-slate-100 p-5 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      {config.icon}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.color}`}
                      >
                        {config.label}
                      </span>
                    </div>

                    <h3 className="font-bold text-navy text-lg mb-1 line-clamp-1">
                      {m.title}
                    </h3>

                    <div className="flex items-center gap-6 text-xs text-slate-500 mt-2">
                      <span>Dibuat: {formatDate(m.created_at)}</span>
                      {m.updated_at && m.updated_at !== m.created_at && (
                        <span>Diperbarui: {formatDate(m.updated_at)}</span>
                      )}
                    </div>

                    {m.rejection_reason && (
                      <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-xs font-semibold text-red-700">
                              Alasan Penolakan:
                            </span>
                            <p className="text-xs text-red-600 mt-1">
                              {m.rejection_reason}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {canEdit && (
                    <Link
                      to={`/dashboard/materi/${m.id}/edit`}
                      className="px-4 py-2 border border-slate-200 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-50 transition"
                    >
                      Edit
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
