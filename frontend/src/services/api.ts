import type { Commentary, Symbol } from '@/types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002'

export async function fetchCommentary(symbol: Symbol): Promise<Commentary[]> {
  const response = await fetch(`${API_URL}/api/commentary/${symbol}`)
  if (!response.ok) {
    throw new Error('Failed to fetch commentary')
  }
  return response.json()
}

export async function postCommentary(
  symbol: Symbol,
  message: string,
  tradeType: string,
  priceLevel?: number
): Promise<Commentary> {
  const response = await fetch(`${API_URL}/api/commentary/${symbol}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      trade_type: tradeType,
      price_level: priceLevel,
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to post commentary')
  }
  return response.json()
}
