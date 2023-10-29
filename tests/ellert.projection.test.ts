import { describe, expect, it } from 'vitest'
import { Event } from '../src'

type ProjectKickedOffEvent = Event<`ProjectKickedOffEvent`, { name: string }>

type Project = {
  id: string
  name: string
}

type ProjectEvent = ProjectKickedOffEvent

const projectProjection = (
  currentState: Partial<Project>,
  event: ProjectEvent
): Partial<Project> => {
  switch (event.type) {
    case 'ProjectKickedOffEvent': {
      return {
        id: event.streamId,
        name: event.data.name
      }
    }
    default:
      return currentState
  }
}

describe('projection', (): void => {
  describe('when being built from event', (): void => {
    it('should ', () => {
      const event: ProjectKickedOffEvent = {
        type: 'ProjectKickedOffEvent',
        data: {
          name: 'Ellert'
        },
        metadata: {}
      }

      const project = projectProjection({}, event)

      expect(project).toBeDefined()
      expect(project.id).toBe(event.streamId)
      expect(project.name).toBe('Ellert')
    })
  })
})
