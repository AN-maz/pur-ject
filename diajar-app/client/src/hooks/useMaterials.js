import { useQuery } from '@tanstack/react-query'
import { materialService } from '../api/materialService'

export function useMaterials(params = {}) {
  return useQuery({
    queryKey: ['materials', params],
    queryFn: () => materialService.listMaterials(params),
    staleTime: 2 * 60 * 1000,
    keepPreviousData: true,
  })
}

export function useMaterial(slug) {
  return useQuery({
    queryKey: ['material', slug],
    queryFn: () => materialService.getMaterialBySlug(slug),
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  })
}
