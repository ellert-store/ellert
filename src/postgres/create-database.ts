import { PoolClient } from 'pg'

const createDatabase = async (db: PoolClient, databaseName: string) => {
  await db.query(`CREATE DATABASE ${databaseName}`)
}

export default createDatabase
