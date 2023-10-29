import { Pool, PoolClient } from 'pg'

export const query = async <Result>(
  pool: Pool,
  executeQuery: (client: PoolClient) => Promise<Result>
): Promise<Result> => {
  let client: PoolClient | undefined = undefined
  try {
    client = await pool.connect()

    return await executeQuery(client)
  } finally {
    client?.release()
  }
}
