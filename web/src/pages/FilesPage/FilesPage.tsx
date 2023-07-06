import React, { useState } from 'react'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { MetaTags } from '@redwoodjs/web'

import FileCell from 'src/components/FileCell'
import FileModal from 'src/components/FileModal/FileModal'
import {
  DragDropText,
  FilePreviewContainer,
  FileUploadContainer,
  UploadFileBtn,
} from 'src/components/fileUpload/fileUploadStyles'

import { BackBtn, Container, Title } from '../HomePage/HomePageStyles'

const FilesPage = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <MetaTags title="Files" description="Files page" />
      <Container>
        <FileModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          fileId={parseInt(window.location.pathname.split('/').pop())}
        />
        <BackBtn
          type="button"
          onClick={() => {
            window.location.href = '/'
          }}
        >
          Voltar
        </BackBtn>
        <Title>File&apos;s Versions</Title>
        <FileUploadContainer>
          <DragDropText>Add a new file version</DragDropText>
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
          <FileCell
            file={undefined}
            fileVersion={undefined}
            fileVersions={[]}
            redwood={undefined}
          />
        </FilePreviewContainer>
      </Container>
    </>
  )
}

export default FilesPage
