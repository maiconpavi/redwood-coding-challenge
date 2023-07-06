import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import * as presigner from '@aws-sdk/s3-request-presigner'
import type {
  QueryResolvers,
  MutationResolvers,
  FileVersionRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { CLIENT, BUCKET, deleteFileVersionObject } from 'src/lib/s3'

export const fileVersions: QueryResolvers['fileVersions'] = () => {
  return db.fileVersion.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export const fileVersion: QueryResolvers['fileVersion'] = ({
  fileId,
  versionId,
}) => {
  return db.fileVersion.findUnique({
    where: { fileId_versionId: { fileId, versionId } },
  })
}

export const getSignedUrl: MutationResolvers['getSignedUrl'] = ({
  fileId,
  versionId,
}) => {
  return presigner.getSignedUrl(
    CLIENT,
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: fileId.toString(),
      VersionId: versionId,
    }),
    {
      expiresIn: 3600,
    }
  )
}

export const putSignedUrl: MutationResolvers['putSignedUrl'] = async ({
  input: { fileId, hash, contentType },
}) => {
  const existingFileVersion = await db.fileVersion.findUnique({
    where: { fileId_hash: { fileId, hash } },
  })

  if (existingFileVersion) {
    return {
      putSignedUrl: null,
      fileVersion: existingFileVersion,
    }
  }

  return presigner
    .getSignedUrl(
      CLIENT,
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: fileId.toString(),
        ContentType: contentType,
      }),
      {
        expiresIn: 3600,
      }
    )
    .then((putSignedUrl) => {
      return {
        putSignedUrl,
        fileVersion: null,
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

export const deleteFileVersion: MutationResolvers['deleteFileVersion'] =
  async ({ fileId, versionId }) => {
    const fileVersion = await db.fileVersion.delete({
      where: { fileId_versionId: { fileId, versionId } },
    })
    await deleteFileVersionObject(fileVersion)

    return fileVersion
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
