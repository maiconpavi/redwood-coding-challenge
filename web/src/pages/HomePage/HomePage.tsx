import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import graphql from 'types/graphql'

import { MetaTags, useMutation } from '@redwoodjs/web'

import FileModal from 'src/components/FileModal/FileModal'
import FilesCell from 'src/components/FilesCell'
import {
  createFileVersion,
  getPutSignedUrlMutation,
  getcreateFileVersionMutation,
} from 'src/lib/uploader'

import {
  FileUploadContainer,
  DragDropText,
  FilePreviewContainer,
  UploadFileBtn,
} from '../../pages/HomePage/HomeStyles'

import { Container, Title } from './HomeStyles'
import Header from 'src/components/Header/Header'

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

const HomePage = () => {
  const [modalOpen, setModalOpen] = React.useState(false)
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
  const onSaveFile = async (
    name: string,
    description?: string,
    data?: Blob
  ) => {
    const currentFileId = (await createFile(name, description)).id

    await createFileVersion(
      putSignedUrl,
      createFileVersionMutation,
      currentFileId,
      data,
      name,
      description
    )
    setModalOpen(false)

    window.location.pathname = `/files/${currentFileId}`
  }
  return (
    <>
      <MetaTags title="Home" />
      <Container>
        <Header />
        <Title>My Files</Title>
        <FileModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={onSaveFile}
          fileUpload
        />
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
      </Container>
    </>
  )
}

export default HomePage
