import React, { useState, ChangeEvent } from 'react'

import { faClose, faFile, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import graphql from 'types/graphql'

import { useMutation } from '@redwoodjs/web'

import {
  createFileVersion,
  getPutSignedUrlMutation,
  getcreateFileVersionMutation,
} from 'src/lib/uploader'

import {
  FormField,
  ModalOverlay,
  ModalContent,
  ModalInput,
  UploadFileBtn,
  ModalCloseButton,
  ModalTitle,
  FilePreviewContainer,
  DocumentIcon,
  UploadIcon,
  FileUploadContainer,
  DragDropText,
  InputLabel,
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
  const [isDragging, setIsDragging] = useState(false)

  const isUploadDisabled = !name || !file

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    setIsDragging(false)
    const { files } = e.dataTransfer
    if (files && files.length > 0) {
      setFile(files[0])
    }
  }

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
        <ModalTitle>
          {fileId ? 'Upload a new version' : 'Upload a new file'}
        </ModalTitle>
        <FileUploadContainer
          isDragging={isDragging}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={(e: { preventDefault: () => void }) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <UploadIcon icon={faUpload} />
          <DragDropText>Drag and drop a file here or</DragDropText>
          <InputLabel htmlFor="fileInput">Browse your File</InputLabel>
          <FormField type="file" id="fileInput" onChange={handleFileChange} />
        </FileUploadContainer>
        <FilePreviewContainer>
          {file && (
            <>
              <DocumentIcon icon={faFile} />
              <span>{file.name}</span>
            </>
          )}
        </FilePreviewContainer>
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
          disabled={isUploadDisabled}
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
