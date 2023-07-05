import { sha1 } from 'object-hash'

export const putObject = async (
  signedUrl: string,
  body: Blob
): Promise<string> => {
  return fetch(signedUrl, {
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

export const PUT_SIGNED_URL = gql`
  mutation PutSignedUrlQuery($input: PutSignedUrlInput!) {
    putSignedUrl(input: $input) {
      signedUrl
      versionId
    }
  }
`
export const getFileHash = (file: Blob): string => {
  return sha1(file)
}
