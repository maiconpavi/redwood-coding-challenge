import React, { useState, ChangeEvent } from 'react'

import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import graphql from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

import {
  createFileVersion,
  getPutSignedUrlMutation,
  getcreateFileVersionMutation,
} from 'src/lib/uploader'

import {
  ModalOverlay,
  ModalContent,
  ModalInput,
  UploadFileBtn,
  ModalCloseButton,
  ModalTitle,
} from './modalStyles'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  fileId?: number
}

const CREATE_FILE_MUTATION = gql`
  mutation CreateFileMutation($input: CreateFileInput!) {
    createFile(input: $input) {
      id
      name
      description
      createdAt
    }
  }
`

const FileModal: React.FC<ModalProps> = ({ isOpen, onClose, fileId }) => {
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const [createFileMutation] = useMutation<
    graphql.Mutation,
    graphql.MutationcreateFileArgs
  >(CREATE_FILE_MUTATION)

  const createFile = async (
    name: string,
    description?: string
  ): Promise<graphql.File> => {
    const response = await createFileMutation({
      variables: {
        input: {
          name,
          description,
        },
      },
    })
    return response.data?.createFile
  }

  const putSignedUrl = getPutSignedUrlMutation()
  const createFileVersionMutation = getcreateFileVersionMutation()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target
    if (files && files.length > 0) {
      setFile(files[0])
    }
  }

  return (
    <ModalOverlay style={{ display: isOpen ? 'block' : 'none' }}>
      <ModalContent>
        <ModalTitle>Upload File</ModalTitle>
        <input type="file" onChange={handleFileChange} />

        <ModalInput
          placeholder="Name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <ModalInput
          placeholder="Description"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />
        <UploadFileBtn
          onClick={async () => {
            const currentFileId =
              fileId ?? (await createFile(name, description)).id
            console.log(
              await createFileVersion(
                putSignedUrl,
                createFileVersionMutation,
                currentFileId,
                file,
                name,
                description
              )
            )
            window.location.pathname = `/files/${currentFileId}`
          }}
        >
          Upload
        </UploadFileBtn>

        <ModalCloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faClose} />
        </ModalCloseButton>
      </ModalContent>
    </ModalOverlay>
  )
}

export default FileModal
