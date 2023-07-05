import React, { useRef, useState, ChangeEvent } from 'react'

import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import graphql from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

import { PUT_SIGNED_URL, getFileHash, putObject } from 'src/lib/uploader'

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

const CREATE_FILE_VERSION_MUTATION = gql`
  mutation CreateFileVersionMutation($input: CreateFileVersionInput!) {
    createFileVersion(input: $input) {
      fileId
      versionId
      hash
      name
      description
      createdAt
    }
  }
`

const FileModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const fileInputField = useRef<HTMLInputElement | null>(null)
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

  const [putSignedUrl] = useMutation<
    graphql.Mutation,
    graphql.PutSignedUrlQueryVariables
  >(PUT_SIGNED_URL)
  const [createFileVersionMutation] = useMutation<
    graphql.Mutation,
    graphql.MutationcreateFileVersionArgs
  >(CREATE_FILE_VERSION_MUTATION)

  const createFileVersion = async (
    file: graphql.File,
    data: Blob,
    name: string,
    description?: string
  ): Promise<graphql.FileVersion> => {
    const hash = await getFileHash(data)
    const response = (
      await putSignedUrl({
        variables: {
          input: {
            fileId: file.id,
            hash,
            contentType: data.type,
          },
        },
      })
    ).data?.putSignedUrl
    if (response.signedUrl) {
      const versionId = await putObject(response.signedUrl, data)
      return (
        await createFileVersionMutation({
          variables: {
            input: {
              fileId: file.id,
              versionId,
              hash,
              name,
              description,
            },
          },
        })
      ).data?.createFileVersion
    } else if (response.fileVersion) {
      // TODO: make a toast
      return response.fileVersion
    }
  }

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

        <UploadFileBtn
          type="button"
          onClick={() => fileInputField.current?.click()}
        >
          Choose File
        </UploadFileBtn>
        <ModalCloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faClose} />
        </ModalCloseButton>
      </ModalContent>
    </ModalOverlay>
  )
}

export default FileModal
