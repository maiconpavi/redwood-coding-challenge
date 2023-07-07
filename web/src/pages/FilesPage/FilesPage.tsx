import React, { useState } from 'react'

import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import graphql from 'types/graphql'

import { MetaTags, useQuery } from '@redwoodjs/web'

import FileModal from 'src/components/FileModal/FileModal'
import FileVersionsCell from 'src/components/FileVersionsCell'
import Header from 'src/components/Header/Header'
import {
  createFileVersion,
  getPutSignedUrlMutation,
  getcreateFileVersionMutation,
} from 'src/lib/uploader'
import {
  DragDropText,
  FilePreviewContainer,
  FileUploadContainer,
  UploadFileBtn,
} from 'src/pages/HomePage/HomeStyles'

import { Container, Title, SubTitle, Description } from '../HomePage/HomeStyles'

const FILE_QUERY_WO_VERSIONS = gql`
  query FileQuery($id: Int!) {
    file(id: $id) {
      id
      name
      description
      createdAt
    }
  }
`

const FilesPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const id = parseInt(window.location.pathname.split('/').pop())
  const { loading, error, data } = useQuery<
    graphql.Query,
    graphql.QueryfileArgs
  >(FILE_QUERY_WO_VERSIONS, {
    variables: { id: id },
  })

  const putSignedUrl = getPutSignedUrlMutation()
  const createFileVersionMutation = getcreateFileVersionMutation()
  const onSaveFileVersion = async (
    name: string,
    description?: string,
    data?: Blob
  ) => {
    await createFileVersion(
      putSignedUrl,
      createFileVersionMutation,
      id,
      data,
      name,
      description
    )
    setModalOpen(false)
    window.location.pathname = `/files/${id}`
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (loading) {
    return <div>Loading...</div>
  }
  const file = data.file
  const date = new Date(file.createdAt).toLocaleString()

  return (
    <>
      <MetaTags title="Files" description="Files page" />
      <Header />
      <Container>
        <FileModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          fileId={id}
          onSave={onSaveFileVersion}
          fileUpload
        />

        <Title>
          File - {file.name} ({date})
        </Title>
        <Description>{file.description}</Description>
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
        <SubTitle>File Versions</SubTitle>
        <FilePreviewContainer>
          <FileVersionsCell id={id} />
        </FilePreviewContainer>
      </Container>
    </>
  )
}

export default FilesPage
