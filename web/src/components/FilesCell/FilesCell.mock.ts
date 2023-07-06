import type graphql from 'types/graphql'

// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  files: [
    { id: 42, name: 'String', createdAt: '2021-01-01T12:34:56Z' },
    { id: 43, name: 'String', createdAt: '2021-01-01T12:34:56Z' },
    { id: 44, name: 'String', createdAt: '2021-01-01T12:34:56Z' },
  ] as graphql.File[],
})
