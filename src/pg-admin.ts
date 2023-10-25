import { PoolClient } from 'pg'
import dropDatabase from './postgres/drop-database'
import createDatabase from './postgres/create-database'
import databaseExists from './postgres/database-exists'

export const pgAdmin = (db: PoolClient) => {
  return {
    async createDatabase(databaseName: string) {
      await createDatabase(db, databaseName)
    },
    async dropDatabase(table: string) {
      await dropDatabase(db, table)
    },
    async databaseExists(db: PoolClient, databaseName: string) {
      return await databaseExists(db, databaseName)
    }
  }
}
