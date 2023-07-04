import type { FileVersion } from '@prisma/client'

import {
  fileVersions,
  fileVersion,
  createFileVersion,
  updateFileVersion,
  deleteFileVersion,
} from './fileVersions'
import type { StandardScenario } from './fileVersions.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('fileVersions', () => {
  scenario('returns all fileVersions', async (scenario: StandardScenario) => {
    const result = await fileVersions()

    expect(result.length).toEqual(Object.keys(scenario.fileVersion).length)
  })

  scenario(
    'returns a single fileVersion',
    async (scenario: StandardScenario) => {
      const result = await fileVersion({ id: scenario.fileVersion.one.id })

      expect(result).toEqual(scenario.fileVersion.one)
    }
  )

  scenario('creates a fileVersion', async () => {
    const result = await createFileVersion({
      input: { versionId: 'String', hash: 'String', name: 'String' },
    })

    expect(result.versionId).toEqual('String')
    expect(result.hash).toEqual('String')
    expect(result.name).toEqual('String')
  })

  scenario('updates a fileVersion', async (scenario: StandardScenario) => {
    const original = (await fileVersion({
      id: scenario.fileVersion.one.id,
    })) as FileVersion
    const result = await updateFileVersion({
      id: original.id,
      input: { versionId: 'String2' },
    })

    expect(result.versionId).toEqual('String2')
  })

  scenario('deletes a fileVersion', async (scenario: StandardScenario) => {
    const original = (await deleteFileVersion({
      id: scenario.fileVersion.one.id,
    })) as FileVersion
    const result = await fileVersion({ id: original.id })

    expect(result).toEqual(null)
  })
})
