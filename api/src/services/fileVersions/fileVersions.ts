import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import type {
  QueryResolvers,
  MutationResolvers,
  FileVersionRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

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

export const signedUrl: QueryResolvers['putSignedUrl'] = async ({
  fileId,
  hash,
  contentType,
}) => {
  const existingFileVersion = await db.fileVersion.findFirst({
    where: { fileId, hash },
  })
  if (existingFileVersion) {
    return {
      signedUrl: null,
      versionId: existingFileVersion.versionId,
    }
  }

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: fileId.toString(),
    ContentType: contentType,
  })
  return {
    signedUrl: await getSignedUrl(client, command, { expiresIn: 3600 }),
  }
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
