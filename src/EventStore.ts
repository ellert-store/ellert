import { Event } from './Event'
import { EventStream } from './EventStream'

export type EventStore<T extends Event> = {
  appendToStream: (
    streamId: string,
    eventData: Event | Event[],
    options?: { expectedVersion?: number }
  ) => Promise<Event[]>
  getLastEvent: (streamId: string) => Promise<Event>
  release: () => void
}
