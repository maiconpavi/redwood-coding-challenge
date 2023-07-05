import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type {
  QueryResolvers,
  MutationResolvers,
  FileVersionRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

const client = new S3Client({ region: 'us-east-1' })
const bucket = 'redwood-coding-challenge'

export const fileVersions: QueryResolvers['fileVersions'] = () => {
  return db.fileVersion.findMany()
}

export const fileVersion: QueryResolvers['fileVersion'] = ({
  fileId,
  versionId,
}) => {
  return db.fileVersion.findUnique({
    where: { fileId_versionId: { fileId, versionId } },
  })
}

export const putSignedUrl: MutationResolvers['putSignedUrl'] = async ({
  input: { fileId, hash, contentType },
}) => {
  logger.info(`fileId ${fileId}`)
  const existingFileVersion = await db.fileVersion.findUnique({
    where: { fileId_hash: { fileId, hash } },
  })
  logger.info(`existingFileVersion ${JSON.stringify(existingFileVersion)}`)

  if (existingFileVersion) {
    return {
      signedUrl: null,
      versionId: existingFileVersion.versionId,
    }
  }

  return getSignedUrl(
    client,
    new PutObjectCommand({
      Bucket: bucket,
      Key: fileId.toString(),
      ContentType: contentType,
    }),
    {
      expiresIn: 3600,
    }
  ).then((signedUrl) => {
    logger.info(`signedUrl ${signedUrl}`)
    return {
      signedUrl,
    }
  })
}

export const createFileVersion: MutationResolvers['createFileVersion'] = ({
  input,
}) => {
  return db.fileVersion.create({
    data: input,
  })
}

export const updateFileVersion: MutationResolvers['updateFileVersion'] = ({
  fileId,
  versionId,
  input,
}) => {
  return db.fileVersion.update({
    data: input,
    where: { fileId_versionId: { fileId, versionId } },
  })
}

export const deleteFileVersion: MutationResolvers['deleteFileVersion'] = ({
  fileId,
  versionId,
}) => {
  return db.fileVersion.delete({
    where: { fileId_versionId: { fileId, versionId } },
  })
}

export const FileVersion: FileVersionRelationResolvers = {
  File: (_obj, { root }) => {
    return db.fileVersion
      .findUnique({
        where: {
          fileId_versionId: {
            fileId: root?.fileId,
            versionId: root?.versionId,
          },
        },
      })
      .File()
  },
}
