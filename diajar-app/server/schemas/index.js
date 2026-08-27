import { z } from 'zod'

const titleSchema = z.string().min(3, 'Judul minimal 3 karakter').max(255)
const contentSchema = z.string().min(10, 'Konten minimal 10 karakter')
const slugSchema = z.string().regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung')
const materialIdSchema = z.string().uuid('ID materi tidak valid')

export const schemas = {
  createMaterial: z.object({
    category_id: z.number({ invalid_type_error: 'category_id harus angka' }),
    title: titleSchema,
    cover_image_url: z.string().url('URL cover tidak valid').optional().or(z.literal('')),
    content: contentSchema
  }),

  updateMaterial: z.object({
    category_id: z.number().optional(),
    title: titleSchema.optional(),
    cover_image_url: z.string().url().optional().or(z.literal('')),
    content: contentSchema.optional()
  }),

  createRating: z.object({
    rating_value: z.number().int().min(1).max(5)
  }),

  createComment: z.object({
    comment_text: z.string().min(1, 'Komentar tidak boleh kosong').max(2000, 'Komentar maksimal 2000 karakter')
  }),

  updateMaterialStatus: z.object({
    status: z.enum(['pending', 'approved', 'rejected']),
    rejection_reason: z.string().max(1000).optional()
  }),

  createCategory: z.object({
    name: z.string().min(2).max(50),
    slug: slugSchema,
    description: z.string().max(500).optional()
  }),

  updateCategory: z.object({
    name: z.string().min(2).max(50).optional(),
    slug: slugSchema.optional(),
    description: z.string().max(500).optional()
  }),

  register: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email('Format email tidak valid'),
    password: z.string().min(8, 'Password minimal 8 karakter')
  }),

  login: z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password wajib diisi')
  }),

  materialSlug: z.object({
    slug: z.string().min(1)
  }),

  categorySlug: z.object({
    slug: z.string().min(1)
  }),

  materialId: z.object({
    id: materialIdSchema
  }),

  pagination: z.object({
    category_id: z.coerce.number().optional(),
    search: z.string().trim().max(100).optional(),
    sort: z.enum(['latest', 'popular']).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10)
  })
}
