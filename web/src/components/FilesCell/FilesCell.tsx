import { faTrash, faEye, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import graphql from 'types/graphql'

import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'

import {
  NewRowInfos,
  mapRowInfos,
  setEditModalIsOpenForRowInfo,
  setDeleteModalIsOpenForRowInfo,
  filterRowInfos,
} from 'src/lib/modal'
import { DeleteBtn, DownloadBtn } from 'src/pages/HomePage/HomeStyles'

import DeleteModal from '../DeleteModal/DeleteModal'
import FileModal from '../FileModal/FileModal'

export const QUERY = gql`
  query FilesQuery {
    files {
      id
      name
      description
      createdAt
      versions {
        fileId
        versionId
        name
        description
        hash
        createdAt
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <div
    style={{
      display: 'block',
      justifyContent: 'center',
      textAlign: 'center',
      marginTop: '20px',
    }}
  >
    <img src="/dropFiles.svg" alt="not file" width={150} />
    <h5>No files yet</h5>
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const DELETE_FILE_MUTATION = gql`
  mutation DeleteMutation($id: Int!) {
    deleteFile(id: $id) {
      id
      name
      description
      createdAt
    }
  }
`

const UPDATE_FILE_MUTATION = gql`
  mutation UpdateFileMutation($id: Int!, $input: UpdateFileInput!) {
    updateFile(id: $id, input: $input) {
      id
      name
      description
      createdAt
    }
  }
`

export const Success = (props: CellSuccessProps<graphql.Query>) => {
  const [deleteFileMutation] = useMutation<
    graphql.Mutation,
    graphql.MutationdeleteFileArgs
  >(DELETE_FILE_MUTATION)
  const [updateFileMutation] = useMutation<
    graphql.Mutation,
    graphql.MutationupdateFileArgs
  >(UPDATE_FILE_MUTATION)
  const [files, setFiles] = React.useState(NewRowInfos(props.files))

  const deleteFile = async (id: number) => {
    await deleteFileMutation({
      variables: { id },
    })
    setFiles(filterRowInfos(files, (row) => row.id !== id))
  }

  const handleFileClick = (key: string) => {
    window.location.pathname = `/files/${key}`
  }

  const updateFile = async (id: number, name: string, description: string) => {
    await updateFileMutation({
      variables: {
        id: id,
        input: {
          name: name,
          description: description,
        },
      },
    })
    setFiles(
      mapRowInfos(files, (row) => {
        if (row.id !== id) {
          return row
        }
        return {
          ...row,
          name: name,
          description: description,
        }
      })
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Created at</th>
          <th>Last version at</th>
          <th>Edit</th>
          <th>Delete</th>

          <th>Open Versions</th>
        </tr>
      </thead>
      <tbody>
        {files.map(
          ({ row, editModalIsOpen: modalIsOpen, deleteModalIsOpen }) => {
            return (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>
                  {row.description == null || row.description == ''
                    ? 'No description'
                    : row.description}
                </td>
                <td>{new Date(row.createdAt).toLocaleString()}</td>
                <td>
                  {row.versions && row.versions.length > 0
                    ? new Date(row.versions[0].createdAt).toLocaleString()
                    : 'No version'}
                </td>
                <td>
                  <DownloadBtn
                    onClick={async () => {
                      setFiles(
                        setEditModalIsOpenForRowInfo(
                          files,
                          (f) => f.id === row.id,
                          true
                        )
                      )
                    }}
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </DownloadBtn>
                  <FileModal
                    isOpen={modalIsOpen}
                    onClose={() =>
                      setFiles(
                        setEditModalIsOpenForRowInfo(
                          files,
                          (f) => f.id === row.id,
                          false
                        )
                      )
                    }
                    fileId={row.id}
                    onSave={async (name, description, _) => {
                      await updateFile(row.id, name, description)
                    }}
                    existingName={row.name}
                    existingDescription={row.description}
                  />
                </td>
                <td>
                  <DeleteBtn
                    onClick={async () => {
                      setFiles(
                        setDeleteModalIsOpenForRowInfo(
                          files,
                          (f) => f.id === row.id,
                          true
                        )
                      )
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </DeleteBtn>
                  <DeleteModal
                    isOpen={deleteModalIsOpen}
                    onClose={() =>
                      setFiles(
                        setDeleteModalIsOpenForRowInfo(
                          files,
                          (f) => f.id === row.id,
                          false
                        )
                      )
                    }
                    onSubmit={async () => {
                      await deleteFile(row.id)
                    }}
                  />
                </td>

                <td>
                  <DownloadBtn
                    onClick={() => handleFileClick(row.id.toString())}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </DownloadBtn>
                </td>
              </tr>
            )
          }
        )}
      </tbody>
    </table>
  )
}
