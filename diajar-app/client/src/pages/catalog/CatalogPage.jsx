import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMaterials } from '../../hooks/useMaterials'
import { useCategories } from '../../hooks/useCategories'
import MaterialCard from '../../components/material/MaterialCard'
import { Search, X } from 'lucide-react'

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category_id') || '')
  const [sort, setSort] = useState(searchParams.get('sort') || 'latest')

  const queryParams = useMemo(() => {
    const params = {}
    if (selectedCategory) params.category_id = Number(selectedCategory)
    if (searchTerm.trim()) params.search = searchTerm.trim()
    params.sort = sort
    return params
  }, [selectedCategory, searchTerm, sort])

  const { data: materialsRes, isLoading, error } = useMaterials(queryParams)
  const { data: categoriesRes } = useCategories()
  const categories = categoriesRes?.success ? categoriesRes.data?.categories || [] : []

  // Sync URL params saat filter berubah
  useEffect(() => {
    const newParams = {}
    if (selectedCategory) newParams.category_id = selectedCategory
    if (searchTerm.trim()) newParams.search = searchTerm.trim()
    if (sort !== 'latest') newParams.sort = sort
    setSearchParams(newParams, { replace: true })
  }, [selectedCategory, searchTerm, sort, setSearchParams])

  const materials = materialsRes?.success ? materialsRes.data?.materials || [] : []
  const pagination = materialsRes?.success ? materialsRes.data?.pagination : null

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleSortChange = (e) => {
    setSort(e.target.value)
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy mb-3">
            Eksplorasi Materi
          </h1>
          <p className="text-slate-500 text-lg">
            Temukan materi pembelajaran berbasis gamifikasi dari berbagai kategori.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari materi..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white min-w-[180px]"
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={handleSortChange}
            className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white min-w-[140px]"
          >
            <option value="latest">Terbaru</option>
            <option value="popular">Terpopuler</option>
          </select>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-slate-500">Memuat materi...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500">Gagal memuat materi: {error.message || error}</p>
          </div>
        )}

        {/* Materials Grid */}
        {!isLoading && !error && materials.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>

            {/* Pagination Info */}
            {pagination && (
              <div className="mt-12 text-center text-sm text-slate-500">
                Menampilkan {(pagination.current_page - 1) * pagination.limit + 1}-
                {Math.min(pagination.current_page * pagination.limit, pagination.total_items)} dari{' '}
                {pagination.total_items} materi
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && materials.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-navy mb-2">Tidak ada materi ditemukan</h3>
            <p className="text-slate-500">
              Coba seseksi kata kunci pencarian atau filter yang berbeda.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
