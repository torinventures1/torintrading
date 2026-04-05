import { io, Socket } from 'socket.io-client'
import type { Commentary } from '@/types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002'

let socket: Socket | null = null

export function getSocket(): Socket {
  if (!socket) {
    socket = io(API_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })
  }
  return socket
}

export function subscribeToCommentary(
  symbol: string,
  callback: (commentary: Commentary) => void
): () => void {
  const socket = getSocket()

  socket.emit('join', symbol)
  socket.on(`commentary:${symbol}`, callback)

  return () => {
    socket.emit('leave', symbol)
    socket.off(`commentary:${symbol}`, callback)
  }
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
