import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import Ellert from '../src/PostgresEventStore'
import {
  createTestDatabase,
  getTestDatabasePoolConfig,
  getTestServerPoolConfig
} from './Constants'
import { Pool, PoolClient } from 'pg'
import { pgAdmin } from '../src/pg-admin'

describe('when appending a new to event to a stream', async (): Promise<void> => {
  let db: PoolClient = null
  let admin = null
  const poolConfig = getTestServerPoolConfig()
  const pool = new Pool(poolConfig)
  db = await pool.connect()
  const testDatabase = await createTestDatabase(pool)
  const testPoolConfig = getTestDatabasePoolConfig(testDatabase)
  const store = await Ellert({ poolConfig: testPoolConfig }, [])

  const streamResult = await store.appendToStream('test', [
    { type: 'test', data: {}, metadata: {} }
  ])

  const testEvent = await store.getLastEvent('test')
  beforeEach(async () => {
    admin = pgAdmin(pool)
  })

  it('should return the stream result including the event', async () => {
    expect(streamResult).toBeDefined()
    expect(streamResult.length).toBe(1)
    expect(streamResult[0].type).toBe('test')
  })

  it('should persist the event for this stream', async () => {
    expect(testEvent).toBeDefined()
    expect(testEvent.type).toBe('test')
    expect(testEvent.data).toEqual({})
    expect(testEvent.metadata).toEqual({})
  })

  afterAll(async () => {
    store.release()
    await admin.dropDatabase(testDatabase)
    db.release()
  })
})
