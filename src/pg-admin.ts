import { Pool } from 'pg'
import dropDatabase from './postgres/drop-database'
import createDatabase from './postgres/create-database'
import databaseExists from './postgres/database-exists'

export const pgAdmin = (db: Pool) => {
  return {
    createDatabase: async function (databaseName: string) {
      await createDatabase(db, databaseName)
    },
    databaseExists: async function (db: Pool, databaseName: string) {
      return await databaseExists(db, databaseName)
    },
    dropDatabase: async function (table: string) {
      await dropDatabase(db, table)
    }
  }
}
