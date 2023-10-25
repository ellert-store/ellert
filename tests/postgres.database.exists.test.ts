import { describe, expect, it } from 'vitest'
import createDatabase from '../src/postgres/create-database'
import databaseExists from '../src/postgres/database-exists'
import { Pool, PoolConfig } from 'pg'

describe('pg', async () => {
  describe('when creating database', async () => {
    it('should exist', async () => {
      const config: PoolConfig = {
        host: 'localhost',
        port: 5435,
        database: 'postgres',
        user: 'postgres',
        password: '123456'
      }
      const db = await new Pool(config).connect()
      const randomDbName = Math.random().toString(36).substring(7)
      await createDatabase(db, `test_db_${randomDbName}`)
      const exists = await databaseExists(db, `test_db_${randomDbName}`)
      expect(exists).toBe(true)
    })
  })

  describe('when checking if database exists for database that does not exist', async () => {
    it('should return false', async () => {
      const config: PoolConfig = {
        host: 'localhost',
        port: 5435,
        database: 'postgres',
        user: 'postgres',
        password: '123456'
      }
      const db = await new Pool(config).connect()
      const randomDbName = Math.random().toString(36).substring(7)
      const exists = await databaseExists(db, `test_db_${randomDbName}`)
      expect(exists).toBe(false)
    })
  })
})
