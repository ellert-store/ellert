import { Event } from './Event'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type EventStore<T extends Event> = {
  appendToStream: (
    streamId: string,
    eventData: Event | Event[],
    options?: { expectedVersion?: number }
  ) => Promise<Event[]>
  getLastEvent: (streamId: string) => Promise<Event>
  release: () => void
}
