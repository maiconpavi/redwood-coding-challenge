import React, { useState } from 'react'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import FilesCell from 'src/components/FilesCell'

import FileModal from '../FileModal/FileModal'

import {
  FileUploadContainer,
  DragDropText,
  FilePreviewContainer,
  UploadFileBtn,
} from './fileUploadStyles'

const FileUpload = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <FileModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <FileUploadContainer>
        <DragDropText>Add new file</DragDropText>
        <UploadFileBtn
          type="button"
          onClick={() => {
            setModalOpen(true)
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </UploadFileBtn>
      </FileUploadContainer>
      <FilePreviewContainer>
        <FilesCell />
      </FilePreviewContainer>
    </>
  )
}

export default FileUpload
