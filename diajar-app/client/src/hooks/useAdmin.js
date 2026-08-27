import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminService } from '../api/adminService'
import { materialService } from '../api/materialService'

export function usePendingMaterials(params = {}) {
  return useQuery({
    queryKey: ['admin-pending-materials', params],
    queryFn: () => adminService.getPendingMaterials(params),
    staleTime: 30 * 1000,
  })
}

export function useAllCategories() {
  return useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => adminService.getAllCategories(),
    staleTime: 2 * 60 * 1000,
  })
}

export function useMaterialStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [pendingRes, categoriesRes, materialsRes] = await Promise.all([
        adminService.getPendingMaterials({ limit: 100 }),
        adminService.getAllCategories(),
        materialService.listMaterials({ limit: 1 }),
      ])

      // 1. Hitung Total Pending Materi
      let pendingCount = 0
      if (pendingRes.success && pendingRes.data) {
        const d = pendingRes.data
        if (typeof d.total === 'number') {
          pendingCount = d.total
        } else if (d.pagination?.total_items) {
          pendingCount = d.pagination.total_items
        } else if (Array.isArray(d.materials)) {
          pendingCount = d.materials.length
        } else if (Array.isArray(d)) {
          pendingCount = d.length
        }
      }

      // 2. Hitung Total Kategori
      let categoryCount = 0
      if (categoriesRes.success && categoriesRes.data) {
        const c = categoriesRes.data
        if (Array.isArray(c.categories)) {
          categoryCount = c.categories.length
        } else if (Array.isArray(c)) {
          categoryCount = c.length
        }
      }

      // 3. Hitung Total Seluruh Materi
      let totalMaterialCount = 0
      if (materialsRes.success && materialsRes.data) {
        const m = materialsRes.data
        if (m.pagination?.total_items) {
          totalMaterialCount = m.pagination.total_items
        } else if (typeof m.total === 'number') {
          totalMaterialCount = m.total
        } else if (Array.isArray(m.materials)) {
          totalMaterialCount = m.materials.length
        } else if (Array.isArray(m)) {
          totalMaterialCount = m.length
        }
      }

      return {
        pendingCount,
        categoryCount,
        totalMaterialCount,
      }
    },
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  })
}

export function useUpdateMaterialStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status, rejection_reason }) =>
      adminService.updateMaterialStatus(id, { status, rejection_reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pending-materials'] })
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] })
    },
  })
}