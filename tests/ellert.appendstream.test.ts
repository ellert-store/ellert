import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import Ellert from '../src/PostgresEventStore'
import {
  createTestDatabase,
  getTestDatabasePoolConfig,
  getTestServerPoolConfig
} from './Constants'
import { Pool, PoolClient } from 'pg'
import { pgAdmin } from '../src/pg-admin'

describe('', async (): Promise<void> => {
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

  it('should ', async () => {
    const store = await Ellert({ poolConfig: testPoolConfig }, [])

    const streamResult = await store.appendToStream('test', [
      { type: 'test', data: {}, metadata: {} }
    ])

    expect(streamResult).toBeDefined()
    expect(streamResult.length).toBe(1)
    expect(streamResult[0].type).toBe('test')

    const testEvent = await store.getLastEvent('test')
    expect(testEvent).toBeDefined()
    expect(testEvent.type).toBe('test')
    expect(testEvent.data).toEqual({})
    expect(testEvent.metadata).toEqual({})

    store.release()
  })

  afterEach(async () => {
    await admin.dropDatabase(testDatabase)
    db.release()
  })
})
