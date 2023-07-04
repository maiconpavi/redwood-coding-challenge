import React, { useRef, useState, ChangeEvent } from 'react'

import { faTrashAlt, faUpload, faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  FileUploadContainer,
  FormField,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  InputLabel,
  DocumentIcon,
} from './fileUploadStyles'

interface FileObject {
  file: File
}

interface FileUploadProps {
  label: string
  updateFilesCb: (files: File[]) => void
  maxFileSizeInBytes?: number
  multiple?: boolean
  [x: string]: any
}

const KILO_BYTES_PER_BYTE = 1000
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000

const convertNestedObjectToArray = (nestedObj: { [x: string]: any }): any[] =>
  Object.keys(nestedObj).map((key) => nestedObj[key])

const convertBytesToKB = (bytes: number): number =>
  Math.round(bytes / KILO_BYTES_PER_BYTE)

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  ...otherProps
}) => {
  const fileInputField = useRef<HTMLInputElement | null>(null)
  const [files, setFiles] = useState<{ [key: string]: File }>({})

  const handleUploadBtnClick = (): void => {
    fileInputField.current?.click()
  }

  const addNewFiles = (newFiles: FileList | null): { [key: string]: File } => {
    if (newFiles) {
      let updatedFiles = { ...files }
      for (const file of newFiles) {
        if (file.size <= maxFileSizeInBytes) {
          if (!otherProps.multiple) {
            updatedFiles = { file }
            break
          }
          if (!updatedFiles[file.name]) {
            updatedFiles[file.name] = file
          }
        }
      }
      return updatedFiles
    }
    return { ...files }
  }

  const callUpdateFilesCb = (
    files: { [key: string]: File } | FileObject[]
  ): void => {
    const filesAsArray = convertNestedObjectToArray(files)
    updateFilesCb(filesAsArray)
  }

  const handleNewFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const { files: newFiles } = e.target
    const updatedFiles = addNewFiles(newFiles)
    setFiles(updatedFiles)
    callUpdateFilesCb(updatedFiles)
  }

  const removeFile = (fileName: string): void => {
    const updatedFiles = { ...files }
    delete updatedFiles[fileName]
    setFiles(updatedFiles)
    callUpdateFilesCb(updatedFiles)
  }

  return (
    <>
      <FileUploadContainer>
        <InputLabel>{label}</InputLabel>
        <DragDropText>Drag and drop your files anywhere or</DragDropText>
        <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
          <FontAwesomeIcon icon={faUpload} className="upload-icon" />
          <span>Upload {otherProps.multiple ? 'files' : 'a file'}</span>
        </UploadFileBtn>
        <FormField
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          {...otherProps}
        />
      </FileUploadContainer>
      <FilePreviewContainer>
        <PreviewList>
          {Object.keys(files).map((fileName, index) => {
            const file = files[fileName]
            const isImageFile = file.type.split('/')[0] === 'image'
            const fileIcon = isImageFile ? (
              <ImagePreview
                src={URL.createObjectURL(file)}
                alt={`file preview ${index}`}
              />
            ) : (
              <DocumentIcon icon={faFile} />
            )
            return (
              <PreviewContainer key={fileName}>
                <div>
                  {fileIcon}
                  <FileMetaData>
                    <span>{file.name}</span>
                    <aside>
                      <span>{convertBytesToKB(file.size)} kb</span>
                      <RemoveFileIcon
                        icon={faTrashAlt}
                        onClick={() => removeFile(fileName)}
                      />
                    </aside>
                  </FileMetaData>
                </div>
              </PreviewContainer>
            )
          })}
        </PreviewList>
      </FilePreviewContainer>
    </>
  )
}

export default FileUpload
