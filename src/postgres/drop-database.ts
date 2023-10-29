import { Pool } from 'pg'
import { query } from './query'

const dropDatabase = async (db: Pool, database: string) => {
  await query(db, async (client) => {
    await client.query(`DROP DATABASE IF EXISTS ${database}`)
  })
}

export default dropDatabase
