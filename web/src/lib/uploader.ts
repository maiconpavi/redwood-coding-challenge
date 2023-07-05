import { sha1 } from 'object-hash'

export const putObject = async (
  signedUrl: string,
  contentType: string,
  body: Blob
): Promise<string> => {
  return fetch(signedUrl, {
    body,
    headers: {
      'Content-Type': contentType,
    },
    method: 'PUT',
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.headers.get('x-amz-version-id')
  })
}

export const PUT_SIGNED_URL = gql`
  query PutSignedUrlQuery(
    $fileId: Int!
    $hash: String!
    $contentType: String!
  ) {
    putSignedUrl(fileId: $fileId, hash: $hash, contentType: $contentType) {
      signedUrl
      versionId
    }
  }
`
export const getFileHash = (file: Blob): string => {
  return sha1(file)
}
