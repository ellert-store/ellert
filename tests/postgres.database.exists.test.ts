import { afterEach, describe, expect, it } from 'vitest'
import databaseExists from '../src/postgres/database-exists'
import { Pool } from 'pg'
import {
  createTestDatabase,
  createTestDatabaseName,
  getTestServerPoolConfig
} from './Constants'
import dropDatabase from '../src/postgres/drop-database'

describe('pg', async () => {
  const config = getTestServerPoolConfig()
  const db = new Pool(config)
  const testDbName = await createTestDatabase(db)

  describe('when creating database', async () => {
    it('should exist', async () => {
      const exists = await databaseExists(db, testDbName)
      expect(exists).toBe(true)
    })
  })
  afterEach(async () => {
    await dropDatabase(db, testDbName)
  })

  describe('when checking if database exists for database that does not exist', async () => {
    const testDbName = createTestDatabaseName()
    it('should return false', async () => {
      const exists = await databaseExists(db, testDbName)
      expect(exists).toBe(false)
    })
  })
})
