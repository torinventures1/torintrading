import { useEffect, useState, useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchCommentary } from '@/services/api'
import { subscribeToCommentary } from '@/services/socket'
import type { Commentary, Symbol } from '@/types'

export function useCommentary(symbol: Symbol) {
  const queryClient = useQueryClient()
  const [realtimeItems, setRealtimeItems] = useState<Commentary[]>([])

  const { data: initialItems = [], isLoading, error } = useQuery({
    queryKey: ['commentary', symbol],
    queryFn: () => fetchCommentary(symbol),
    staleTime: 30000,
  })

  useEffect(() => {
    setRealtimeItems([])

    const unsubscribe = subscribeToCommentary(symbol, (newItem) => {
      setRealtimeItems((prev) => [newItem, ...prev])
      queryClient.invalidateQueries({ queryKey: ['commentary', symbol] })
    })

    return unsubscribe
  }, [symbol, queryClient])

  const allItems = useCallback(() => {
    const combined = [...realtimeItems, ...initialItems]
    const seen = new Set<number>()
    return combined.filter((item) => {
      if (seen.has(item.id)) return false
      seen.add(item.id)
      return true
    })
  }, [realtimeItems, initialItems])

  return {
    items: allItems(),
    isLoading,
    error,
  }
}
