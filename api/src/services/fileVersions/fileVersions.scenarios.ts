import type { Prisma, FileVersion } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FileVersionCreateArgs>({
  fileVersion: {
    one: {
      data: {
        versionId: '1',
        hash: '1',
        name: '1',
        description: '1',
        File: {
          create: {
            id: 1,
            name: '1',
            description: '1',
          },
        },
      },
    },
    two: {
      data: {
        versionId: '2',
        hash: '2',
        name: '2',
        description: '2',
        File: {
          create: {
            id: 2,
            name: '2',
            description: '2',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<FileVersion, 'fileVersion'>
