import { PoolConfig } from 'pg'

export const StreamName = 'Test'
export const StreamCollection = `${StreamName}.events`

export const getTestPoolConfig = (): PoolConfig => {
  return {
    host: 'localhost',
    port: 5435,
    database: 'postgres',
    user: 'postgres',
    password: '123456'
  }
}
