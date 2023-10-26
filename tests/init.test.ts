import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import Ellert from '../src/PostgresEventStore'
import { Pool, PoolClient, PoolConfig } from 'pg'
import { pgAdmin } from '../src/pg-admin'
import {
  createTestDatabase,
  getTestDatabasePoolConfig,
  getTestServerPoolConfig
} from './Constants'

describe('when creating event store instance', async () => {
  let db: PoolClient = null
  let admin = null
  const poolConfig = getTestServerPoolConfig()
  const pool = new Pool(poolConfig)
  db = await pool.connect()
  const testDatabase = await createTestDatabase(db)
  const testPoolConfig = getTestDatabasePoolConfig(testDatabase)

  beforeEach(async () => {
    admin = pgAdmin(db)
  })

  it('should be defined', async () => {
    const store = await Ellert({ poolConfig: testPoolConfig }, [])
    expect(store).toBeDefined()
    store.release()
  })

  afterEach(async () => {
    await admin.dropDatabase(testDatabase)
    db.release()
  })
})
