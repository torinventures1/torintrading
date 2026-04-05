import pg from 'pg'
import type { Commentary, CreateCommentaryInput } from '../types.js'

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

export async function initDatabase(): Promise<void> {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS commentary (
        id SERIAL PRIMARY KEY,
        symbol VARCHAR(10) NOT NULL,
        message TEXT NOT NULL,
        trade_type VARCHAR(20),
        price_level DECIMAL(12,2),
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_commentary_symbol ON commentary(symbol);
      CREATE INDEX IF NOT EXISTS idx_commentary_created ON commentary(created_at DESC);
    `)
    console.log('Database initialized')
  } finally {
    client.release()
  }
}

export async function getCommentary(symbol: string, limit = 50): Promise<Commentary[]> {
  const result = await pool.query<Commentary>(
    `SELECT id, symbol, message, trade_type, price_level, created_at
     FROM commentary
     WHERE symbol = $1
     ORDER BY created_at DESC
     LIMIT $2`,
    [symbol.toUpperCase(), limit]
  )
  return result.rows
}

export async function createCommentary(
  symbol: string,
  input: CreateCommentaryInput
): Promise<Commentary> {
  const result = await pool.query<Commentary>(
    `INSERT INTO commentary (symbol, message, trade_type, price_level)
     VALUES ($1, $2, $3, $4)
     RETURNING id, symbol, message, trade_type, price_level, created_at`,
    [symbol.toUpperCase(), input.message, input.trade_type, input.price_level || null]
  )
  return result.rows[0]
}

export { pool }
