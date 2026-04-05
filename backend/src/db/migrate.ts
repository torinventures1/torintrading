import 'dotenv/config'
import { initDatabase, pool } from './postgres.js'

async function migrate() {
  try {
    console.log('Running database migration...')
    await initDatabase()
    console.log('Migration complete!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

migrate()
