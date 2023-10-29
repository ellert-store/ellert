import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import Ellert from '../src/PostgresEventStore'
import { Pool } from 'pg'
import { pgAdmin } from '../src/pg-admin'
import {
  createTestDatabase,
  getTestDatabasePoolConfig,
  getTestServerPoolConfig
} from './Constants'

describe('when creating event store instance', async () => {
  let admin = null
  const poolConfig = getTestServerPoolConfig()
  const pool = new Pool(poolConfig)
  const testDatabase = await createTestDatabase(pool)
  const testPoolConfig = getTestDatabasePoolConfig(testDatabase)
  const store = await Ellert({ poolConfig: testPoolConfig }, [])

  beforeEach(async () => {
    admin = pgAdmin(pool)
  })

  it('should be defined', async () => {
    expect(store).toBeDefined()
  })

  afterEach(async () => {
    store.release()
    await admin.dropDatabase(testDatabase)
  })
})
