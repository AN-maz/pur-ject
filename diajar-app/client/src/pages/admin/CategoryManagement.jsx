import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminService } from '../../api/adminService'
import { Plus, Edit, Trash2, Save, X, Tag } from 'lucide-react'

export default function CategoryManagement() {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [formMode, setFormMode] = useState('create')
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({ name: '', slug: '', description: '' })
  const [error, setError] = useState('')

  const { data: res, isLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => adminService.getAllCategories(),
    staleTime: 2 * 60 * 1000,
  })

  const categories = res?.success ? (res.data?.categories || res.data || []) : []

  const createMutation = useMutation({
    mutationFn: (payload) => adminService.createCategory(payload),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['admin-categories'] })
        queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
        setShowForm(false)
        setFormData({ name: '', slug: '', description: '' })
      } else {
        setError(res.error || 'Gagal membuat kategori')
      }
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => adminService.updateCategory(id, payload),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['admin-categories'] })
        setShowForm(false)
        setEditingCategory(null)
        setFormData({ name: '', slug: '', description: '' })
      } else {
        setError(res.error || 'Gagal memperbarui kategori')
      }
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => adminService.deleteCategory(id),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ['admin-categories'] })
        queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
      } else {
        setError(res.error || 'Gagal menghapus kategori')
      }
    },
  })

  const handleCreate = () => {
    setFormMode('create')
    setEditingCategory(null)
    setFormData({ name: '', slug: '', description: '' })
    setShowForm(true)
    setError('')
  }

  const handleEdit = (category) => {
    setFormMode('edit')
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
    })
    setShowForm(true)
    setError('')
  }

  const handleDelete = (category) => {
    if (!window.confirm(`Hapus kategori "${category.name}"? Tindakan ini tidak dapat dibatalkan.`)) return
    deleteMutation.mutate(category.id)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name.trim() || !formData.slug.trim()) {
      setError('Nama dan slug wajib diisi')
      return
    }

    if (formMode === 'edit' && editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, payload: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  const submitting = createMutation.isPending || updateMutation.isPending

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-navy">Kelola Kategori</h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-blue-600 transition"
        >
          <Plus className="w-5 h-5" />
          Tambah Kategori
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-navy">
                {formMode === 'edit' ? 'Edit Kategori' : 'Kategori Baru'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Nama Kategori
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Misal: Teknologi & Pemrograman"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="misal: teknologi-dan-pemrograman"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
                  required
                />
                <p className="text-xs text-slate-400 mt-1">
                  Slug hanya boleh huruf kecil, angka, dan tanda hubung.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Deskripsi (opsional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Deskripsi singkat kategori..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-y"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-blue-600 transition disabled:opacity-50"
                >
                  <Save className="w-4 h-4 inline mr-1" />
                  {submitting ? 'Menyimpan...' : formMode === 'edit' ? 'Perbarui' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center">
            <Tag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Belum ada kategori.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Nama
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Slug
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-4 font-semibold text-navy">{category.name}</td>
                  <td className="py-4 px-4 text-sm text-slate-500 font-mono">
                    {category.slug}
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-500 max-w-xs truncate">
                    {category.description || '-'}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
