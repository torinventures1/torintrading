import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import { initDatabase } from './db/postgres.js'
import commentaryRouter, { setSocketIO } from './routes/commentary.js'

const app = express()
const httpServer = createServer(app)

const io = new SocketServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST'],
  },
})

setSocketIO(io)

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
}))
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/commentary', commentaryRouter)

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`)

  socket.on('join', (symbol: string) => {
    const room = symbol.toLowerCase()
    socket.join(room)
    console.log(`${socket.id} joined room: ${room}`)
  })

  socket.on('leave', (symbol: string) => {
    const room = symbol.toLowerCase()
    socket.leave(room)
    console.log(`${socket.id} left room: ${room}`)
  })

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`)
  })
})

const PORT = parseInt(process.env.PORT || '3002')

async function start() {
  try {
    await initDatabase()

    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(`WebSocket server ready`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

start()
