import sha256 from 'fast-sha256'

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
export const getFileHash = async (file: Blob): Promise<string> => {
  return Buffer.from(
    sha256((await file.stream().getReader().read()).value)
  ).toString('hex')
}
