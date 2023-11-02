import { describe, expect, it } from 'vitest'
import { Event, Projection } from '../src'
import { StreamProjection } from '../src/PostgresEventStore'

type ProjectKickedOffEvent = Event<`ProjectKickedOffEvent`, { name: string }>

type Project = Projection & {
  id: string
  name: string
}

type ProjectEvent = ProjectKickedOffEvent

const ProjectProjection: StreamProjection = {
  projectionType: 'Project',
  project: (
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

      const project = ProjectProjection.project({}, event)

      expect(project).toBeDefined()
      expect(project.id).toBe(event.streamId)
      expect(project.name).toBe('Ellert')
    })
  })
})
