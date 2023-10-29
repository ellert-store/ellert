import { Pool } from 'pg'
import { query } from './query'

const databaseExists = async (
  db: Pool,
  databaseName: string
): Promise<boolean> => {
  return await query(db, async (client) => {
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE lower(datname) = lower('${databaseName}')`
    )
    return result.rows.length > 0
  })
}

export default databaseExists
