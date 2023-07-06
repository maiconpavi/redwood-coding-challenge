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
  const [selectedFile, setSelectedFile] = useState<graphql.File | null>(null)

  const handleFileClick = (key: string) => {
    window.location.pathname = `/files/${key}`
  }

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
        {files.map((item) => {
          return (
            <tr
              key={item.id}
              onClick={() => handleFileClick(item.id.toString())}
            >
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>
                {item.versions && item.versions.length > 0
                  ? new Date(item.versions[0].createdAt).toLocaleString()
                  : 'No version'}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
