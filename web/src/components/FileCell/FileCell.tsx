import { useState } from 'react'

import graphql from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FilesQuery {
    files {
      id
      name
      description
      createdAt
      versions {
        fileId
        versionId
        name
        description
        hash
        createdAt
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ files }: CellSuccessProps<graphql.Query>) => {
  const [selectedRouteId, setSelectedRouteId] = useState(
    parseInt(window.location.pathname.split('/')[2])
  )

  const filteredFiles = files.filter((file) => file.id === selectedRouteId)

  if (filteredFiles.length === 0) {
    return <Empty />
  }

  const file = filteredFiles[0] // Assume que haverá apenas um arquivo com o ID filtrado

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Created at</th>
          <th>Last version at</th>
        </tr>
      </thead>
      <tbody>
        <tr key={file.id} onClick={() => handleFileClick(file.id)}>
          <td>{file.name}</td>
          <td>{file.description}</td>
          <td>{file.createdAt}</td>
          <td>{file.versions[0].createdAt}</td>
        </tr>
      </tbody>
    </table>
  )
}
