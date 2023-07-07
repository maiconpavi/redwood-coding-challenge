import React, { useState, ChangeEvent } from 'react'

import { faClose, faFile, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
  Loader,
} from './modalStyles'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, description?: string, data?: Blob) => Promise<void>
  fileUpload?: boolean
  fileId?: number
  existingName?: string
  existingDescription?: string
}

const FileModal: React.FC<ModalProps> = (props) => {
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState(props.existingName)
  const [description, setDescription] = useState(props.existingDescription)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const isUploadDisabled = !name || (!file && props.fileUpload)

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
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target
    if (files && files.length > 0) {
      setFile(files[0])
    }
  }
  if (isUploading) {
    return (
      <ModalOverlay style={{ display: props.isOpen ? 'block' : 'none' }}>
        <ModalContent>
          <Loader />
          <ModalTitle>Uploading...</ModalTitle>
        </ModalContent>
      </ModalOverlay>
    )
  }

  return (
    <ModalOverlay style={{ display: props.isOpen ? 'block' : 'none' }}>
      <ModalContent>
        <ModalTitle>
          {props.fileUpload ? 'Upload a new' : 'Edit file'}
          {props.fileId ? ` version` : ''}
        </ModalTitle>
        {props.fileUpload ? (
          <>
            <FileUploadContainer
              isDragging={isDragging}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={(e: { preventDefault: () => void }) =>
                e.preventDefault()
              }
              onDrop={handleDrop}
            >
              <UploadIcon icon={faUpload} />
              <DragDropText>Drag and drop a file here or</DragDropText>
              <InputLabel htmlFor="fileInput">Browse your File</InputLabel>
              <FormField
                type="file"
                id="fileInput"
                onChange={handleFileChange}
              />
            </FileUploadContainer>
            <FilePreviewContainer>
              {file && (
                <>
                  <DocumentIcon icon={faFile} />
                  <span>{file.name}</span>
                </>
              )}
            </FilePreviewContainer>
          </>
        ) : (
          <></>
        )}
        <ModalInput
          placeholder="Name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <ModalInput
          placeholder="Description"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />
        <UploadFileBtn
          disabled={isUploadDisabled}
          onClick={async () => {
            setIsUploading(true)
            await props.onSave(name, description, file)
            setIsUploading(false)
          }}
        >
          Save
        </UploadFileBtn>
        <ModalCloseButton onClick={props.onClose}>
          <FontAwesomeIcon icon={faClose} />
        </ModalCloseButton>
      </ModalContent>
    </ModalOverlay>
  )
}

export default FileModal
