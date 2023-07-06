import type graphql from 'types/graphql'

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  file: {
    id: 42,
    name: 'MyFile',
    createdAt: '2021-01-01T12:34:56Z',
    versions: [
      {
        fileId: 42,
        versionId: '1',
        name: '1',
        hash: '1',
        createdAt: '2021-01-01T12:34:56Z',
      },
      {
        fileId: 42,
        versionId: '2',
        name: '1',
        hash: '2',
        createdAt: '2021-01-01T12:34:56Z',
      },
      {
        fileId: 42,
        versionId: '3',
        name: '1',
        hash: '3',
        createdAt: '2021-01-01T12:34:56Z',
      },
    ],
  } as graphql.File,
})
