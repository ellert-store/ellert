import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import Ellert from '../src/PostgresEventStore'
import { Pool, PoolClient, PoolConfig } from 'pg'
import { pgAdmin } from '../src/pg-admin'

describe('when creating event store instance', async () => {
  let db: PoolClient = null
  let admin = null
  const poolConfig: PoolConfig = {
    host: 'localhost',
    port: 5435,
    database: 'postgres',
    user: 'postgres',
    password: '123456'
  }

  const pool = new Pool(poolConfig)

  beforeEach(async () => {
    db = await pool.connect()
    admin = pgAdmin(db)
  })

  it('should be defined', async () => {
    const store = await Ellert({ poolConfig }, [])
    expect(store).toBeDefined()
  })

  afterEach(async () => {
    await admin.dropDatabase('test_db')
    db.release()
  })
})
