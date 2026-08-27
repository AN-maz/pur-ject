import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { adminService } from '../../api/adminService'
import { useUpdateMaterialStatus } from '../../hooks/useAdmin'
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'

export default function ModerationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectModal, setShowRejectModal] = useState(false)

  // Fetch detail materi via adminService dengan proteksi Retry 404
  const { data: material, isLoading, error } = useQuery({
    queryKey: ['material-detail-admin', id],
    queryFn: async () => {
      const res = await adminService.getMaterialById(id)
      if (!res.success) {
        throw new Error(res.error || 'Gagal memuat detail materi')
      }
      return res.data?.data || res.data
    },
    enabled: Boolean(id),
    retry: (failureCount, err) => {
      // Matikan retry berulang jika server merespons 404
      if (err?.message?.includes('404') || err?.response?.status === 404) {
        return false
      }
      return failureCount < 2
    },
  })

  const updateStatusMutation = useUpdateMaterialStatus()

const handleApprove = () => {
    // Langsung eksekusi mutation tanpa confirm() native browser
    updateStatusMutation.mutate(
      { id, status: 'approved' },
      {
        onSuccess: () => {
          alert('Materi berhasil disetujui!')
          navigate('/admin/moderation')
        },
        onError: (err) => alert(`Gagal memproses: ${err.message}`),
      }
    )
  }

  const handleRejectSubmit = (e) => {
    e.preventDefault()
    if (!rejectionReason.trim()) return alert('Alasan penolakan wajib diisi!')

    updateStatusMutation.mutate(
      { id, status: 'rejected', rejection_reason: rejectionReason },
      {
        onSuccess: () => {
          alert('Materi berhasil ditolak!')
          setShowRejectModal(false)
          navigate('/admin/moderation')
        },
        onError: (err) => alert(`Gagal memproses: ${err.message}`),
      }
    )
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !material) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Gagal memuat detail materi: {error?.message || 'Data tidak ditemukan'}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/moderation')}
        className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-navy transition"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Moderasi
      </button>

      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                material.status === 'pending'
                  ? 'bg-amber-100 text-amber-700'
                  : material.status === 'approved'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              Status: {material.status || 'pending'}
            </span>
            <h1 className="text-2xl font-bold text-navy mt-2">{material.title}</h1>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowRejectModal(true)}
              disabled={updateStatusMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-semibold rounded-xl text-sm transition"
            >
              <XCircle className="w-4 h-4" /> Tolak
            </button>
            <button
              onClick={handleApprove}
              disabled={updateStatusMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 font-semibold rounded-xl text-sm transition shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" /> Setujui (Approve)
            </button>
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-sm">
          <div>
            <span className="text-slate-400 block text-xs">Author</span>
            <span className="font-semibold text-slate-700">
              {material.author?.name || material.author_name || '-'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">Kategori</span>
            <span className="font-semibold text-slate-700">
              {material.category?.name || material.category_name || '-'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">Tanggal Dibuat</span>
            <span className="font-semibold text-slate-700">
              {material.created_at
                ? new Date(material.created_at).toLocaleDateString('id-ID')
                : '-'}
            </span>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-navy mb-4">Konten Materi</h2>
        {material.cover_image_url && (
          <img
            src={material.cover_image_url}
            alt={material.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
        )}
        <div className="prose max-w-none text-slate-700 whitespace-pre-line">
          {material.content}
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleRejectSubmit}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4"
          >
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold text-lg">Tolak Materi</h3>
            </div>
            <p className="text-sm text-slate-600">
              Berikan alasan penolakan agar author dapat memperbaiki materinya:
            </p>
            <textarea
              required
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Contoh: Format penulisan belum rapi..."
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={updateStatusMutation.isPending}
                className="px-4 py-2 text-sm font-semibold bg-red-600 text-white hover:bg-red-700 rounded-xl transition"
              >
                {updateStatusMutation.isPending ? 'Memproses...' : 'Kirim Penolakan'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}