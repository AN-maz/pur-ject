import { useQuery } from '@tanstack/react-query'
import { categoryService } from '../api/categoryService'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAllCategories(),
    staleTime: 5 * 60 * 1000,
  })
}

export function useCategory(slug) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoryService.getCategoryBySlug(slug),
    staleTime: 5 * 60 * 1000,
  })
}
