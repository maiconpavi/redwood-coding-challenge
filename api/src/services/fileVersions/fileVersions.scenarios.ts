import type { Prisma, FileVersion } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FileVersionCreateArgs>({
  fileVersion: {
    one: { data: { versionId: 'String', hash: 'String', name: 'String' } },
    two: { data: { versionId: 'String', hash: 'String', name: 'String' } },
  },
})

export type StandardScenario = ScenarioData<FileVersion, 'fileVersion'>
