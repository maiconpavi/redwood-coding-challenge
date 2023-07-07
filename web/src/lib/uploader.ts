import { Buffer } from 'buffer'

import sha256 from 'fast-sha256'
import graphql from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

export const putObject = async (
  putSignedUrl: string,
  body: Blob
): Promise<string> => {
  return fetch(putSignedUrl, {
    body,
    headers: {
      'Content-Type': body.type,
    },
    method: 'PUT',
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.headers.get('x-amz-version-id')
  })
}

export const getObject = async (getSignedUrl: string): Promise<Blob> => {
  return fetch(getSignedUrl).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.blob()
  })
}

export const PUT_SIGNED_URL = gql`
  mutation PutSignedUrlQuery($input: PutSignedUrlInput!) {
    putSignedUrl(input: $input) {
      putSignedUrl
      fileVersion {
        fileId
        versionId
        hash
        name
        description
        createdAt
      }
    }
  }
`

export const GET_SIGNED_URL = gql`
  mutation GetSignedUrlQuery($fileId: Int!, $versionId: String!) {
    getSignedUrl(fileId: $fileId, versionId: $versionId)
  }
`

const CREATE_FILE_VERSION_MUTATION = gql`
  mutation CreateFileVersionMutation($input: CreateFileVersionInput!) {
    createFileVersion(input: $input) {
      fileId
      versionId
      hash
      name
      description
      createdAt
    }
  }
`

export const getFileHash = async (file: Blob): Promise<string> => {
  return Buffer.from(
    sha256((await file.stream().getReader().read()).value)
  ).toString('hex')
}

export const getCreateFileVersionMutations = async () => {
  const [putSignedUrl] = useMutation<
    graphql.Mutation,
    graphql.PutSignedUrlQueryVariables
  >(PUT_SIGNED_URL)
  const [createFileVersionMutation] = useMutation<
    graphql.Mutation,
    graphql.MutationcreateFileVersionArgs
  >(CREATE_FILE_VERSION_MUTATION)
  return [putSignedUrl, createFileVersionMutation]
}

export const getPutSignedUrlMutation = () => {
  const [putSignedUrl] = useMutation<
    graphql.Mutation,
    graphql.PutSignedUrlQueryVariables
  >(PUT_SIGNED_URL)
  return async (fileId: number, hash: string, contentType: string) => {
    return (
      await putSignedUrl({
        variables: {
          input: {
            fileId,
            hash,
            contentType,
          },
        },
      })
    ).data?.putSignedUrl
  }
}

export const getcreateFileVersionMutation = () => {
  const [createFileVersionMutation] = useMutation<
    graphql.Mutation,
    graphql.MutationcreateFileVersionArgs
  >(CREATE_FILE_VERSION_MUTATION)
  return async (
    fileId: number,
    versionId: string,
    hash: string,
    name: string,
    description: string
  ) => {
    return (
      await createFileVersionMutation({
        variables: {
          input: {
            fileId,
            versionId,
            hash,
            name,
            description,
          },
        },
      })
    ).data?.createFileVersion
  }
}

export const createFileVersion = async (
  putSignedUrl: (
    fileId: number,
    hash: string,
    contentType: string
  ) => Promise<graphql.PutSignedUrl>,
  createFileVersionMutation: (
    fileId: number,
    versionId: string,
    hash: string,
    name: string,
    description: string
  ) => Promise<graphql.FileVersion>,
  fileId: number,
  data: Blob,
  name: string,
  description?: string
): Promise<graphql.FileVersion> => {
  const hash = await getFileHash(data)
  const response = await putSignedUrl(fileId, hash, data.type)
  if (response.putSignedUrl) {
    const versionId = await putObject(response.putSignedUrl, data)
    return await createFileVersionMutation(
      fileId,
      versionId,
      hash,
      name,
      description
    )
  } else if (response.fileVersion) {
    // TODO: make a toast
    return response.fileVersion
  }
}
