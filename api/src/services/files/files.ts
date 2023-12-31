import type {
  QueryResolvers,
  MutationResolvers,
  FileRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { deleteFileVersionObjects } from 'src/lib/s3'

export const files: QueryResolvers['files'] = () => {
  return db.file.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export const file: QueryResolvers['file'] = ({ id }) => {
  return db.file.findUnique({
    where: { id },
  })
}

export const createFile: MutationResolvers['createFile'] = ({ input }) => {
  return db.file.create({
    data: input,
  })
}

export const updateFile: MutationResolvers['updateFile'] = ({ id, input }) => {
  return db.file.update({
    data: input,
    where: { id },
  })
}

export const deleteFile: MutationResolvers['deleteFile'] = async ({ id }) => {
  const versions = await db.file.findUnique({ where: { id } }).versions()
  await db.fileVersion.deleteMany({ where: { fileId: id } })
  try {
    await deleteFileVersionObjects(versions)
  } catch (error) {
    logger.warn(error)
  }

  return db.file.delete({
    where: { id },
  })
}

export const File: FileRelationResolvers = {
  versions: (_obj, { root }) => {
    return db.file.findUnique({ where: { id: root?.id } }).versions({
      orderBy: { createdAt: 'desc' },
    })
  },
}
