import { Router, Request, Response } from 'express'
import { Server as SocketServer } from 'socket.io'
import { getCommentary, createCommentary } from '../db/postgres.js'
import type { CreateCommentaryInput } from '../types.js'

const router = Router()

let io: SocketServer | null = null

export function setSocketIO(socketIO: SocketServer): void {
  io = socketIO
}

router.get('/:symbol', async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params
    const limit = parseInt(req.query.limit as string) || 50

    if (!['nifty', 'btcusd'].includes(symbol.toLowerCase())) {
      res.status(400).json({ error: 'Invalid symbol. Use "nifty" or "btcusd"' })
      return
    }

    const commentary = await getCommentary(symbol, limit)
    res.json(commentary)
  } catch (error) {
    console.error('Error fetching commentary:', error)
    res.status(500).json({ error: 'Failed to fetch commentary' })
  }
})

router.post('/:symbol', async (req: Request, res: Response) => {
  try {
    const { symbol } = req.params
    const input: CreateCommentaryInput = req.body

    if (!['nifty', 'btcusd'].includes(symbol.toLowerCase())) {
      res.status(400).json({ error: 'Invalid symbol. Use "nifty" or "btcusd"' })
      return
    }

    if (!input.message || !input.trade_type) {
      res.status(400).json({ error: 'Message and trade_type are required' })
      return
    }

    const validTradeTypes = ['long', 'short', 'info', 'target', 'exit']
    if (!validTradeTypes.includes(input.trade_type)) {
      res.status(400).json({ error: 'Invalid trade_type' })
      return
    }

    const commentary = await createCommentary(symbol, input)

    if (io) {
      io.to(symbol.toLowerCase()).emit(`commentary:${symbol.toLowerCase()}`, commentary)
    }

    res.status(201).json(commentary)
  } catch (error) {
    console.error('Error creating commentary:', error)
    res.status(500).json({ error: 'Failed to create commentary' })
  }
})

export default router
