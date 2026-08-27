import { useQuery } from '@tanstack/react-query'
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
        adminService.getPendingMaterials({ limit: 1 }),
        adminService.getAllCategories(),
        materialService.listMaterials({ limit: 1 }),
      ])

      return {
        pendingCount: pendingRes.success ? pendingRes.data?.total || 0 : 0,
        categoryCount: categoriesRes.success
          ? (categoriesRes.data?.categories || categoriesRes.data || []).length
          : 0,
        totalMaterialCount: materialsRes.success
          ? materialsRes.data?.pagination?.total_items || 0
          : 0,
      }
    },
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  })
}
