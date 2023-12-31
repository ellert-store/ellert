export type EventData = Record<string | number, unknown> | unknown[] | string
export type Metadata =
  | ({ correlation?: string; causation?: string } & Record<
      string | number,
      unknown
    >)
  | unknown[]
  | string

export type Event<
  Type extends string = string,
  DataType extends EventData = EventData,
  MetadataType extends Metadata = Metadata
> = {
  id?: string
  version?: number
  streamId?: string
  timestamp?: number
  type: Type
  data: DataType
  metadata?: MetadataType
}
