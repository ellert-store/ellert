import { afterAll, beforeEach, describe, expect, it } from 'vitest'
import Ellert from '../src/PostgresEventStore'
import {
  createTestDatabase,
  getTestDatabasePoolConfig,
  getTestServerPoolConfig
} from './Constants'
import { Pool, PoolClient } from 'pg'
import { pgAdmin } from '../src/pg-admin'
import { Event } from '../src/Event'

type ProjectKickedOffEvent = Event<`ProjectKickedOffEvent`, { name: string }>

describe('when appending a new to event to a stream', async (): Promise<void> => {
  let db: PoolClient = null
  let admin = null
  const poolConfig = getTestServerPoolConfig()
  const pool = new Pool(poolConfig)
  db = await pool.connect()
  const testDatabase = await createTestDatabase(pool)
  const testPoolConfig = getTestDatabasePoolConfig(testDatabase)
  const store = await Ellert({ poolConfig: testPoolConfig }, [])

  const event: ProjectKickedOffEvent = {
    type: 'ProjectKickedOffEvent',
    data: {
      name: 'Ellert'
    },
    metadata: {}
  }
  const streamResult = await store.appendToStream('test', [event])

  const testEvent = await store.getLastEvent('test')
  beforeEach(async () => {
    admin = pgAdmin(pool)
  })

  it('should return the stream result including the event', async () => {
    expect(streamResult).toBeDefined()
    expect(streamResult.length).toBe(1)
    expect(streamResult[0].type).toBe('ProjectKickedOffEvent')
  })

  it('should persist the event for this stream', async () => {
    expect(testEvent).toBeDefined()
    expect(testEvent.type).toBe('ProjectKickedOffEvent')
    expect(testEvent.data).toEqual({ name: 'Ellert' })
    expect(testEvent.metadata).toEqual({})
  })

  afterAll(async () => {
    store.release()
    await admin.dropDatabase(testDatabase)
    db.release()
  })
})
