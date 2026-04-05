export type TradeType = 'long' | 'short' | 'info' | 'target' | 'exit'

export interface Commentary {
  id: number
  symbol: string
  message: string
  trade_type: TradeType
  price_level: number | null
  created_at: Date
}

export interface CreateCommentaryInput {
  message: string
  trade_type: TradeType
  price_level?: number
}
