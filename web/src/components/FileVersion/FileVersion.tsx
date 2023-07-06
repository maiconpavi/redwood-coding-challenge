import graphql from 'types/graphql'

import { useMutation, useQuery } from '@redwoodjs/web'

import { GET_SIGNED_URL } from 'src/lib/uploader'

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
  const [getSignedUrl] = useMutation<
    graphql.Mutation,
    graphql.MutationgetSignedUrlArgs
  >(GET_SIGNED_URL)

  const getSignedUrlForDownload = async (): Promise<string> => {
    return (
      await getSignedUrl({
        variables: {
          fileId: props.fileId,
          versionId: props.versionId,
        },
      })
    ).data?.getSignedUrl
  }

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
      <p>Hash: {data.fileVersion?.hash}</p>
      <button
        onClick={async (_) => {
          window.open(await getSignedUrlForDownload())
        }}
      >
        Download
      </button>
    </div>
  )
}

export default FileVersion
