import { PoolClient } from 'pg'

const databaseExists = async (
  db: PoolClient,
  databaseName: string
): Promise<boolean> => {
  const result = await db.query(
    `SELECT 1 FROM pg_database WHERE lower(datname) = lower('${databaseName}')`
  )
  return result.rows.length > 0
}

export default databaseExists
