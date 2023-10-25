import { PoolClient } from 'pg'

const dropDatabase = async (db: PoolClient, database: string) => {
  await db.query(`DROP DATABASE IF EXISTS ${database}`)
}

export default dropDatabase
