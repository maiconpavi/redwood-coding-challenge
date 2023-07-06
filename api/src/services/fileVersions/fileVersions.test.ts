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
      const result = await fileVersion({
        fileId: scenario.fileVersion.one.fileId,
        versionId: scenario.fileVersion.one.versionId,
      })

      expect(result).toEqual(scenario.fileVersion.one)
    }
  )

  scenario('creates a fileVersion', async () => {
    const result = await createFileVersion({
      input: { fileId: 1, versionId: '2', hash: 'String', name: 'String' },
    })

    expect(result.versionId).toEqual('2')
    expect(result.hash).toEqual('String')
    expect(result.name).toEqual('String')
  })

  scenario('updates a fileVersion', async (scenario: StandardScenario) => {
    const original = (await fileVersion({
      fileId: scenario.fileVersion.one.fileId,
      versionId: scenario.fileVersion.one.versionId,
    })) as FileVersion
    const result = await updateFileVersion({
      fileId: scenario.fileVersion.one.fileId,
      versionId: scenario.fileVersion.one.versionId,
      input: { name: original.name + '2' },
    })

    expect(result.name).toEqual(original.name + '2')
  })

  scenario('deletes a fileVersion', async (scenario: StandardScenario) => {
    const original = await deleteFileVersion({
      fileId: scenario.fileVersion.one.fileId,
      versionId: scenario.fileVersion.one.versionId,
    })
    expect(original).not.toEqual(null)
    const result = await fileVersion({
      fileId: scenario.fileVersion.one.fileId,
      versionId: scenario.fileVersion.one.versionId,
    })

    expect(result).toEqual(null)
  })
})
