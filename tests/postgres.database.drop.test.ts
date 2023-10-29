import { describe, expect, it } from 'vitest'
import { Pool, PoolConfig } from 'pg'
import createDatabase from '../src/postgres/create-database'
import dropDatabase from '../src/postgres/drop-database'
import databaseExists from '../src/postgres/database-exists'

describe('pg', () => {
  describe('when dropping existing database', () => {
    it('should not exist', async () => {
      const config: PoolConfig = {
        host: 'localhost',
        port: 5435,
        database: 'postgres',
        user: 'postgres',
        password: '123456'
      }
      const pool = new Pool(config)
      const randomDbName = Math.random().toString(36).substring(7)
      await createDatabase(pool, `test_db_${randomDbName}`)
      await dropDatabase(pool, `test_db_${randomDbName}`)
      const exists = await databaseExists(pool, `test_db_${randomDbName}`)
      expect(exists).toBe(false)
    })
  })
})
