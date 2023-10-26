import { describe, expect, it } from 'vitest'
import Ellert from '../src/PostgresEventStore'
import { getTestPoolConfig } from './Constants'

describe('', (): void => {
  it('should ', async () => {
    const poolConfig = getTestPoolConfig()
    const store = await Ellert({ poolConfig }, [])

    await store.appendToStream('test', [
      { type: 'test', data: {}, metadata: {} }
    ])

    const newVar = await store.getLastEvent('test')
    expect(newVar).toBeDefined()
    expect(newVar.type).toBe('test')
    expect(newVar.data).toEqual({})
    expect(newVar.metadata).toEqual({})
  })
})
