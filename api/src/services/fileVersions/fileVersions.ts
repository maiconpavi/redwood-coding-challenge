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

export const fileVersion: QueryResolvers['fileVersion'] = ({ id }) => {
  return db.fileVersion.findUnique({
    where: { id },
  })
}

export const fileVersionByVersionId: QueryResolvers['fileVersionByVersionId'] =
  ({ fileId, versionId }) => {
    return db.fileVersion.findUnique({
      where: { fileId, versionId },
    })
  }

export const putSignedUrl: MutationResolvers['putSignedUrl'] = async ({
  input: { fileId, hash, contentType },
}) => {
  logger.info(`fileId ${fileId}`)
  const existingFileVersion = await db.fileVersion.findFirst({
    where: { fileId, hash },
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
  id,
  input,
}) => {
  return db.fileVersion.update({
    data: input,
    where: { id },
  })
}

export const deleteFileVersion: MutationResolvers['deleteFileVersion'] = ({
  id,
}) => {
  return db.fileVersion.delete({
    where: { id },
  })
}

export const FileVersion: FileVersionRelationResolvers = {
  File: (_obj, { root }) => {
    return db.fileVersion.findUnique({ where: { id: root?.id } }).File()
  },
}
