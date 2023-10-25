import { Event, EventData, Metadata } from './Event'
import { EventStore } from './EventStore'
import PostgresEventStore, { Projection } from './PostgresEventStore'

export { Event, EventData, EventStore, Metadata, Projection }
export default PostgresEventStore
