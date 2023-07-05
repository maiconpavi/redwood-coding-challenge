import graphql from 'types/graphql'

import { useQuery } from '@redwoodjs/web'

interface FileTableProps {
  fileId: number
  versionId: string
}

const QUERY = gql`
  query FileTableQuery($fileId: Int!, $versionId: String!) {
    fileVersion(fileId: $fileId, versionId: $versionId) {
      fileId
      versionId
      hash
      name
      description
      createdAt
    }
  }
`

const FileTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th>Type</th>
          <th>Description</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  )
}

export default FileTable
