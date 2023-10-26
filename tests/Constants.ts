import { PoolClient, PoolConfig } from 'pg'
import createDatabase from '../src/postgres/create-database'

export const StreamName = 'Test'
export const StreamCollection = `${StreamName}.events`

export const getTestServerPoolConfig = (): PoolConfig =>
  getPoolConfig('postgres')

export const getTestDatabasePoolConfig = (database: string): PoolConfig =>
  getPoolConfig(database)

const getPoolConfig = (database: string): PoolConfig => {
  return {
    host: 'localhost',
    port: 5435,
    database,
    user: 'postgres',
    password: '123456'
  }
}

export const createTestDatabaseName = () => {
  const id = Math.random().toString(36).substring(7)
  const databaseName = `test_db_${id}`
  return databaseName
}

export const createTestDatabase = async (db: PoolClient) => {
  const databaseName = createTestDatabaseName()
  await createDatabase(db, databaseName)
  return databaseName
}
