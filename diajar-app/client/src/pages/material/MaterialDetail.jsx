import { useParams } from 'react-router-dom'
import { useMaterial } from '../../hooks/useMaterials'
import { useAuth } from '../../hooks/useAuth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { materialService } from '../../api/materialService'
import MaterialReader from '../../components/material/MaterialReader'
import RatingStars from '../../components/material/RatingStars'
import CommentSection from '../../components/material/CommentSection'
import { CheckCircle, BarChart3, Calendar } from 'lucide-react'

export default function MaterialDetail() {
  const { slug } = useParams()
  const { token, user } = useAuth()
  const queryClient = useQueryClient()
  const { data: materialRes, isLoading, error, refetch } = useMaterial(slug)

  const materialData = materialRes?.success ? materialRes.data : null

  const completeMutation = useMutation({
    mutationFn: (materialId) => materialService.markComplete(materialId),
    onSuccess: (res) => {
      if (res.success) {
        const { data } = res
        alert(`Selamat! Kamu mendapatkan +${data.exp_gained} EXP`)
        if (data.is_level_up) {
          alert(`Level up ke level ${data.current_level}!`)
        }
        queryClient.invalidateQueries({ queryKey: ['material', slug] })
      } else {
        alert(res.error || 'Gagal menyelesaikan materi')
      }
    },
  })

  const ratingMutation = useMutation({
    mutationFn: ({ materialId, rating }) => materialService.createRating(materialId, rating),
    onSuccess: (res) => {
      if (res.success) {
        alert(`Rating berhasil dikirim! Kamu mendapatkan +${res.data.points_gained} Points`)
        queryClient.invalidateQueries({ queryKey: ['material', slug] })
      } else {
        alert(res.error || 'Gagal memberi rating')
      }
    },
  })

  const handleComplete = () => {
    if (!token) {
      alert('Silakan masuk terlebih dahulu')
      window.location.href = '/auth'
      return
    }
    if (!materialData?.user_progress?.is_completed) {
      completeMutation.mutate(materialData.id)
    }
  }

  const handleRate = (ratingValue) => {
    if (!token) {
      alert('Silakan masuk terlebih dahulu')
      window.location.href = '/auth'
      return
    }
    ratingMutation.mutate({ materialId: materialData.id, rating: ratingValue })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-slate-500">Memuat materi...</p>
        </div>
      </div>
    )
  }

  if (error || !materialData) {
    return (
      <div className="min-h-screen bg-slate-50 pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy mb-2">Materi tidak ditemukan</h2>
          <p className="text-slate-500">
            {error?.message || 'Materi yang Anda cari tidak tersedia.'}
          </p>
        </div>
      </div>
    )
  }

  const {
    id,
    title,
    cover_image_url,
    content,
    author,
    category,
    average_rating,
    ratings_count,
    user_progress,
    created_at,
  } = materialData

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-bold text-primary uppercase tracking-wide">
            {category?.name || 'Uncategorized'}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy mt-2 mb-4">
            {title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {author?.name?.[0] || 'A'}
              </div>
              <span>{author?.name || 'Anonim'}</span>
              {author?.level && <span>• Level {author.level}</span>}
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(created_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span>{ratings_count || 0} rating</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {cover_image_url && (
          <div className="mb-8">
            <img
              src={cover_image_url}
              alt={title}
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        )}

        {/* Material Content */}
        <div className="bg-white rounded-2xl border border-slate-100 p-8 mb-8">
          <MaterialReader content={content || ''} />
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Complete Button */}
            <button
              onClick={handleComplete}
              disabled={completeMutation.isPending || user_progress?.is_completed}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                user_progress?.is_completed
                  ? 'bg-green-100 text-green-700 cursor-default'
                  : 'bg-primary hover:bg-blue-600 text-white hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              <CheckCircle className={`w-5 h-5 ${user_progress?.is_completed ? 'text-green-500' : ''}`} />
              {user_progress?.is_completed
                ? 'Selesai Dibaca'
                : completeMutation.isPending
                ? 'Memproses...'
                : 'Tandai Selesai Baca'}
            </button>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-navy">
                Ratingmu:
              </span>
              {user_progress?.has_rated ? (
                <RatingStars rating={average_rating} interactive onRate={handleRate} />
              ) : ratingMutation.isPending ? (
                <span className="text-sm text-slate-500">Mengirim...</span>
              ) : (
                <RatingStars rating={0} interactive onRate={handleRate} />
              )}
            </div>
          </div>
        </div>

        {/* Comments */}
        <CommentSection
          materialId={id}
          currentUser={user}
          onCommentAdded={refetch}
        />
      </div>
    </div>
  )
}
