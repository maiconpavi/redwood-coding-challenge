import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { FileVersion } from 'types/graphql'

export const CLIENT = new S3Client({ region: 'us-east-1' })

export const BUCKET = process.env.BUCKET_NAME
  ? process.env.BUCKET_NAME
  : 'redwood-coding-challenge'

export const deleteFileVersionObject = async (
  fileVersion: FileVersion
): Promise<void> => {
  CLIENT.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: fileVersion.fileId.toString(),
      VersionId: fileVersion.versionId,
    })
  )
}

export const deleteFileVersionObjects = async (
  fileVersions: FileVersion[]
): Promise<void> => {
  await Promise.all(
    fileVersions.map((fileVersion) => {
      return deleteFileVersionObject(fileVersion)
    })
  )
}
