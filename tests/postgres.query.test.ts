import { afterEach, describe, expect, it } from 'vitest'
import {
  createTestDatabase,
  getTestDatabasePoolConfig,
  getTestServerPoolConfig
} from './Constants'
import { Pool } from 'pg'
import { pgAdmin } from '../src/pg-admin'
import { query } from '../src/postgres/query'

describe('query', (): void => {
  describe('when running a query', async (): Promise<void> => {
    let admin = null
    const poolConfig = getTestServerPoolConfig()
    const pool = new Pool(poolConfig)
    const testDatabase = await createTestDatabase(pool)
    const testPoolConfig = getTestDatabasePoolConfig(testDatabase)
    const testPool = new Pool(testPoolConfig)

    admin = pgAdmin(pool)
    it('should return result', async () => {
      await query(testPool, async (client) => {
        const { rows } = await client.query("SELECT 'pong' as pong")

        expect(rows.length).toBe(1)
      })
    })

    afterEach(async () => {
      await testPool.end()
      await admin.dropDatabase(testDatabase)
      await pool.end()
    })
  })
})
