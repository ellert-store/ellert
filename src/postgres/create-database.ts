import { Pool } from 'pg'
import { query } from './query'

const createDatabase = async (db: Pool, databaseName: string) => {
  await query(db, async (client) => {
    await client.query(`CREATE DATABASE ${databaseName}`)
  })
}

export default createDatabase
