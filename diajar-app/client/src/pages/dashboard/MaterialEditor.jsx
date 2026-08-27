import { Link, useNavigate, useParams } from 'react-router-dom'
import { materialService } from '../../api/materialService'
import { useCategories } from '../../hooks/useCategories'
import { useAuthStore } from '../../store/auth'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Eye, Send, X, Image, Search } from 'lucide-react'
import MaterialReader from '../../components/material/MaterialReader'

const SLASH_COMMANDS = [
  { cmd: '/h1', label: 'Heading 1', template: '# ' },
  { cmd: '/h2', label: 'Heading 2', template: '## ' },
  { cmd: '/h3', label: 'Heading 3', template: '### ' },
  { cmd: '/p', label: 'Paragraph', template: '' },
  { cmd: '/code', label: 'Code Block', template: '```\n\n```' },
  { cmd: '/sql', label: 'SQL Block', template: '```sql\n\n```' },
  { cmd: '/ul', label: 'Bullet List', template: '- ' },
  { cmd: '/ol', label: 'Numbered List', template: '1. ' },
  { cmd: '/quote', label: 'Blockquote', template: '> ' },
  { cmd: '/img', label: 'Image', template: '![alt text](url)' },
  { cmd: '/hr', label: 'Divider', template: '---' },
  { cmd: '/table', label: 'Table', template: '| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |' },
]

export default function MaterialEditor() {
  const { id: materialId } = useParams()
  const navigate = useNavigate()
  const token = useAuthStore((s) => s.token)
  const { data: categoriesRes } = useCategories()

  const categories = categoriesRes?.success ? categoriesRes.data?.categories || [] : []

  const [title, setTitle] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [content, setContent] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [showCommands, setShowCommands] = useState(false)
  const [commandFilter, setCommandFilter] = useState('')
  const [cursorPosition, setCursorPosition] = useState(0)
  const [error, setError] = useState('')

  const isEditMode = !!materialId

  // Fetch user materials to find the material being edited
  const { data: userMaterialsRes } = useQuery({
    queryKey: ['user-materials'],
    queryFn: () => materialService.getUserMaterials(),
    enabled: !!token && isEditMode,
    staleTime: 0,
  })

  useEffect(() => {
    if (isEditMode && userMaterialsRes?.success) {
      const materials = userMaterialsRes.data?.materials || []
      const material = materials.find((m) => m.id === materialId)
      if (material) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTitle(material.title)
      }
    }
  }, [isEditMode, materialId, userMaterialsRes])

  const createMutation = useMutation({
    mutationFn: (payload) => materialService.createMaterial(payload),
    onSuccess: (res) => {
      if (res.success) {
        alert('Materi berhasil diajukan dan menunggu persetujuan admin!')
        navigate('/dashboard/materi/my-materials')
      } else {
        setError(res.error || 'Gagal membuat materi')
      }
    },
  })

  const updateMutation = useMutation({
    mutationFn: (payload) => materialService.updateMaterial(materialId, payload),
    onSuccess: (res) => {
      if (res.success) {
        alert('Materi berhasil diperbarui! Status kembali ke pending.')
        navigate('/dashboard/materi/my-materials')
      } else {
        setError(res.error || 'Gagal memperbarui materi')
      }
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!title.trim() || title.length < 3) {
      setError('Judul minimal 3 karakter')
      return
    }
    if (!content.trim() || content.length < 10) {
      setError('Konten minimal 10 karakter')
      return
    }
    if (!selectedCategory) {
      setError('Pilih kategori dulu')
      return
    }

    const payload = {
      category_id: Number(selectedCategory),
      title: title.trim(),
      cover_image_url: coverImage.trim() || null,
      content: content.trim(),
    }

    if (isEditMode) {
      updateMutation.mutate(payload)
    } else {
      createMutation.mutate(payload)
    }
  }

  const filteredCommands = commandFilter
    ? SLASH_COMMANDS.filter(
        (c) =>
          c.cmd.includes(commandFilter) ||
          c.label.toLowerCase().includes(commandFilter.toLowerCase())
      )
    : SLASH_COMMANDS

  const handleEditorChange = (e) => {
    const value = e.target.value
    const cursorPos = e.target.selectionStart
    const lastSlash = value.lastIndexOf('/', cursorPos)

    if (lastSlash >= 0 && cursorPos === lastSlash + 1) {
      setShowCommands(true)
      setCommandFilter('')
    } else if (lastSlash >= 0 && cursorPos > lastSlash + 1) {
      setShowCommands(true)
      setCommandFilter(value.substring(lastSlash + 1, cursorPos).trim())
    } else {
      setShowCommands(false)
    }

    setContent(value)
    setCursorPosition(cursorPos)
  }

  const handleCommandSelect = (template) => {
    const value = content
    const lastSlash = value.lastIndexOf('/')

    if (lastSlash >= 0) {
      const before = value.substring(0, lastSlash)
      const after = value.substring(cursorPosition)
      const newValue = before + template + after
      setContent(newValue)
    }

    setShowCommands(false)
    setCommandFilter('')
  }

  const inserting = createMutation.isPending || updateMutation.isPending

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-navy">
          {isEditMode ? 'Edit Materi' : 'Buat Materi Baru'}
        </h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
              showPreview
                ? 'bg-primary text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Editor' : 'Preview'}
          </button>
          <Link
            to="/dashboard/materi/my-materials"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
            Batal
          </Link>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Judul Materi
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul materi..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              required
              minLength={3}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Kategori
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-white"
              required
            >
              <option value="">Pilih kategori...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            URL Gambar Cover (opsional)
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://example.com/cover.jpg"
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <Image className="w-5 h-5 text-slate-400 self-center" />
          </div>
        </div>

        {/* Editor / Preview */}
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Konten (Markdown)
          </label>

          <div className="border-2 border-dashed border-slate-200 rounded-xl overflow-hidden">
            {showPreview ? (
              <div className="p-6 bg-neutral-50 min-h-[300px] overflow-y-auto">
                {!content.trim() ? (
                  <p className="text-slate-400">
                    Ketik sesuatu di panel editor untuk melihat preview...
                  </p>
                ) : (
                  <MaterialReader content={content} />
                )}
              </div>
            ) : (
              <>
                <textarea
                  value={content}
                  onChange={handleEditorChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setShowCommands(false)
                  }}
                  placeholder="Ketik '/' untuk melihat perintah...

# Contoh Heading
Ini adalah paragraf. Gunakan **bold**, *italic*, atau `code`."
                  className="w-full min-h-[300px] px-4 py-3 border-none outline-none font-mono text-sm resize-y text-slate-700"
                  spellCheck={false}
                />

                {/* Slash Commands */}
                {showCommands && (
                  <div className="absolute z-10 top-10 left-0 right-0 mx-4 mb-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                    <div className="p-2 border-b border-slate-100">
                      <div className="flex items-center gap-2 px-2 text-xs text-slate-400">
                        <Search className="w-3 h-3" />
                        <span>Perintah markdown</span>
                      </div>
                    </div>
                    {filteredCommands.map((cmd) => (
                      <div
                        key={cmd.cmd}
                        onClick={() => handleCommandSelect(cmd.template)}
                        className="px-3 py-2 hover:bg-slate-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono text-primary">
                            {cmd.cmd}
                          </span>
                          <span className="text-sm text-slate-600">
                            {cmd.label}
                          </span>
                        </div>
                      </div>
                    ))}
                    {filteredCommands.length === 0 && (
                      <div className="px-3 py-2 text-sm text-slate-400">
                        Tidak ada perintah ditemukan
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowPreview(false)}
            className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={inserting}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {inserting
              ? 'Mengirim...'
              : isEditMode
              ? 'Perbarui Materi'
              : 'Ajukan Materi'}
          </button>
        </div>
      </form>
    </div>
  )
}
