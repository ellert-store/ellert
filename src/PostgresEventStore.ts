import { Pool, PoolConfig } from 'pg'

import { Event } from './Event'
import { EventStore } from './EventStore'

type PostgresEventStoreOptions = {
  poolConfig?: PoolConfig
}

type Projector = {
  projectionType: string
  project<Projection, EventsOfStream extends Event>(
    currentState: Partial<Projection>,
    event: EventsOfStream
  ): Partial<Projection>
}

/**
 * @param options
 * @param {Projector[]} [projectors] - projections to be built
 * */
const PostgresEventStore = async <T extends Event>(
  options: PostgresEventStoreOptions,
  projectors: Projector[] = []
): Promise<EventStore<T>> => {
  console.log('initializing event store')

  const pool = new Pool(options.poolConfig)
  const db = await pool.connect()

  await db.query(
    `CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY, 
        streamId VARCHAR(255), 
        version INT, 
        type VARCHAR(255), 
        data JSONB, 
        metadata JSONB, 
        timestamp BIGINT
  )`
  )

  const store = {
    readStream: async (streamId: string): Promise<Event[]> => {
      const query = {
        text: `SELECT * FROM events WHERE streamId = $1 ORDER BY version ASC`,
        values: [streamId]
      }

      const { rows } = await db.query(query)

      return rows.map((row) => ({
        type: row.type,
        data: row.data,
        metadata: row.metadata,
        timestamp: row.timestamp,
        version: row.version
      }))
    },
    getLastEvent: async (streamId: string): Promise<Event> => {
      const query = {
        text: `SELECT * FROM events WHERE streamId = $1 ORDER BY version DESC LIMIT 1`,
        values: [streamId]
      }
      const { rows } = await db.query<Event>(query)

      return rows[0]
    },
    async appendToStream(streamId: string, events: T[]) {
      const lastEvent = await this.getLastEvent(streamId)
      const version = lastEvent ? lastEvent.version : 0

      const values = events
        .map((event, index) => [
          streamId,
          version + index + 1,
          event.type,
          JSON.stringify(event.data),
          JSON.stringify(event.metadata),
          Date.now()
        ])
        .join(',')
        .split(',')

      const query = {
        text: `INSERT INTO events(streamId, version, type, data, metadata, timestamp) VALUES($1, $2, $3, $4, $5, $6)`,
        values
      }

      await db.query(query)

      return this.readStream(streamId)
    }
  }

  return store
}

export type Projection = { type: string; id: string } & Record<
  string | number,
  unknown
>

export default PostgresEventStore
