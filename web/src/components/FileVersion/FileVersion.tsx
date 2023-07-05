import graphql from 'types/graphql'

import { useQuery } from '@redwoodjs/web'

interface FileVersionProps {
  fileId: number
  versionId: string
  exists: boolean
}

const QUERY = gql`
  query FileVersionQuery($fileId: Int!, $versionId: String!) {
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

const FileVersion = (props: FileVersionProps) => {
  const { loading, error, data } = useQuery<
    graphql.Query,
    graphql.QueryfileVersionArgs
  >(QUERY, {
    variables: { fileId: props.fileId, versionId: props.versionId },
  })
  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (loading) {
    return <div>Loading...</div>
  }
  const date = new Date(data.fileVersion?.createdAt)
  return (
    <div>
      {props.exists ? (
        <p> The file that you upload is equal to this version bellow: </p>
      ) : (
        <></>
      )}
      <h2>{data.fileVersion?.name}</h2>
      <p>{data.fileVersion?.description ?? 'No Description'}</p>
      <p>Created at: {date.toLocaleDateString()}</p>
    </div>
  )
}

export default FileVersion
