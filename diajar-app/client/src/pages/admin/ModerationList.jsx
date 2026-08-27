import { Link } from 'react-router-dom'
import { usePendingMaterials } from '../../hooks/useAdmin'
import { useState } from 'react'
import { AlertCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ModerationList() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const { data: res, isLoading, error, refetch } = usePendingMaterials({
    page,
    limit: 20,
    status: 'pending',
  })

  // Penanganan aman pembacaan payload backend
  const rawData = res?.success ? res.data : null
  const materials = Array.isArray(rawData)
    ? rawData
    : rawData?.materials || rawData?.data || []

  // Ekstrak Total Data & Halaman
  const total = rawData?.total || rawData?.pagination?.total_items || materials.length
  const totalPages = Math.ceil(total / 20) || 1

  // Filter dengan toleransi huruf kapital/kecil (case-insensitive)
  const pendingCount = materials.filter(
    (m) => m.status?.toLowerCase() === 'pending'
  ).length

  const rejectedCount = materials.filter(
    (m) => m.status?.toLowerCase() === 'rejected'
  ).length

  // Saring materi berdasarkan kata kunci pencarian frontend
  const filteredMaterials = materials.filter((m) =>
    m.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-navy">Moderasi Konten</h1>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
        >
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <AlertCircle className="w-6 h-6 text-amber-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-amber-700">{pendingCount}</div>
          <div className="text-xs text-amber-600">Pending Review</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <AlertCircle className="w-6 h-6 text-red-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-red-700">{rejectedCount}</div>
          <div className="text-xs text-red-600">Ditolak</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
          <AlertCircle className="w-6 h-6 text-slate-500 mx-auto mb-1" />
          <div className="text-2xl font-bold text-navy">{total}</div>
          <div className="text-xs text-slate-500">Total di Halaman</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Cari materi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
      </div>

      {/* Materials Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">
            Gagal memuat data: {error.message || error}
          </div>
        ) : filteredMaterials.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">
              Tidak ada materi yang perlu dimoderasi.
            </p>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Judul
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Dibuat
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.map((material) => (
                  <tr
                    key={material.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition cursor-pointer"
                  >
                    <td className="py-4 px-4">
                      <Link
                        to={`/admin/moderation/${material.id}`}
                        className="font-semibold text-navy hover:text-primary transition line-clamp-1"
                      >
                        {material.title}
                      </Link>
                      {material.rejection_reason && (
                        <div className="mt-1">
                          <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded">
                            Ditolak: {material.rejection_reason}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">
                      {material.author?.name || material.author_name || '-'}
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">
                      {material.category?.name || material.category_name || '-'}
                    </td>
                    <td className="py-4 px-4 text-center text-sm text-slate-600">
                      {material.average_rating
                        ? `${Number(material.average_rating).toFixed(1)} (${material.ratings_count || 0})`
                        : '-'}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          material.status?.toLowerCase() === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : material.status?.toLowerCase() === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {material.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-sm text-slate-400">
                      {material.created_at
                        ? new Date(material.created_at).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Sebelumnya
                </button>
                <span className="text-sm text-slate-500">
                  Halaman {page} dari {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Berikutnya
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}