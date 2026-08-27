import { useParams, useNavigate } from 'react-router-dom'
import { usePendingMaterials } from '../../hooks/useAdmin'
import { adminService } from '../../api/adminService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import MaterialReader from '../../components/material/MaterialReader'
import RatingStars from '../../components/material/RatingStars'
import { Check, X, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function ModerationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [rejectionReason, setRejectionReason] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [showRejectForm, setShowRejectForm] = useState(false)

  // Fetch all pending materials and find the one with matching ID
  const { data: materialsRes, isLoading } = usePendingMaterials({
    limit: 100,
    status: 'pending',
  })

  const material = materialsRes?.success
    ? materialsRes.data?.materials?.find((m) => m.id === id)
    : null

  const updateStatusMutation = useMutation({
    mutationFn: ({ status, reason }) =>
      adminService.updateMaterialStatus(id, status, reason),
    onSuccess: (res) => {
      if (res.success) {
        alert(res.message || 'Status materi berhasil diperbarui!')
        queryClient.invalidateQueries({ queryKey: ['admin-pending-materials'] })
        queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
        navigate('/admin/moderation')
      } else {
        alert(res.error || 'Gagal memperbarui status')
      }
      setActionLoading(false)
    },
  })

  const handleApprove = async () => {
    if (!window.confirm('Setujui materi ini? Author akan mendapatkan +200 EXP.')) return
    setActionLoading(true)
    updateStatusMutation.mutate({ status: 'approved', reason: null })
  }

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('Masukkan alasan penolakan!')
      return
    }
    setActionLoading(true)
    setShowRejectForm(false)
    updateStatusMutation.mutate({ status: 'rejected', reason: rejectionReason })
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-slate-500">Memuat materi...</p>
      </div>
    )
  }

  if (!material) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy mb-2">Materi tidak ditemukan</h3>
        <p className="text-slate-500">
          Materi dengan ID ini tidak ditemukan di antrian moderasi.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-navy">Review Materi</h1>
        <button
          onClick={() => navigate('/admin/moderation')}
          className="text-sm text-slate-500 hover:text-navy transition"
        >
          ← Kembali ke Moderasi
        </button>
      </div>

      {/* Material Info */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            {material.category?.name || 'Uncategorized'}
          </span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              material.status === 'pending'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {material.status === 'pending' ? 'Pending' : material.status}
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-navy mb-2">
          {material.title}
        </h2>

        <div className="flex items-center gap-6 text-sm text-slate-500 mb-4">
          <span>oleh {material.author?.name || '-'} (Level {material.author?.level || 1})</span>
          <div className="flex items-center gap-2">
            <RatingStars rating={material.average_rating} />
            <span>({material.ratings_count || 0} rating)</span>
          </div>
          <span>{new Date(material.created_at).toLocaleDateString('id-ID')}</span>
        </div>

        {material.cover_image_url && (
          <img
            src={material.cover_image_url}
            alt={material.title}
            className="w-full max-h-48 object-cover rounded-xl mb-4"
          />
        )}
      </div>

      {/* Content Preview */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <h3 className="text-lg font-bold text-navy mb-4">Preview Konten</h3>
        <div className="prose prose-slate max-w-none">
          <MaterialReader content={material.content || ''} />
        </div>
      </div>

      {/* Rejection Reason (if previously rejected) */}
      {material.rejection_reason && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div>
              <span className="text-sm font-semibold text-red-700">
                Alasan Penolakan Sebelumnya:
              </span>
              <p className="text-sm text-red-600 mt-1">{material.rejection_reason}</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Aksi Moderasi</h3>

        {!showRejectForm ? (
          <div className="flex gap-3">
            <button
              onClick={handleApprove}
              disabled={actionLoading}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-50"
            >
              <Check className="w-5 h-5" />
              {actionLoading ? 'Memproses...' : 'Setujui'}
            </button>
            <button
              onClick={() => setShowRejectForm(true)}
              disabled={actionLoading}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition disabled:opacity-50"
            >
              <X className="w-5 h-5" />
              Tolak
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Alasan Penolakan
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Masukkan alasan mengapa materi ini ditolak..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-y"
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReject}
                disabled={actionLoading || !rejectionReason.trim()}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition disabled:opacity-50"
              >
                <X className="w-5 h-5" />
                {actionLoading ? 'Memproses...' : 'Konfirmasi Tolak'}
              </button>
              <button
                onClick={() => setShowRejectForm(false)}
                disabled={actionLoading}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
