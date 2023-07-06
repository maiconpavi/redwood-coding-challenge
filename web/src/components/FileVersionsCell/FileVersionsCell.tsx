import {
  faDownload,
  faTrash,
  faPencil,
} from '@fortawesome/free-solid-svg-icons'
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
import { GET_SIGNED_URL } from 'src/lib/uploader'
import { DeleteBtn, DownloadBtn } from 'src/pages/HomePage/HomeStyles'

import DeleteModal from '../DeleteModal/DeleteModal'
import FileModal from '../FileModal/FileModal'

export const QUERY = gql`
  query FilesVersionsQuery($id: Int!) {
    file(id: $id) {
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
    <h5>No versions yet</h5>
  </div>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const DELETE_FILE_VERSION_MUTATION = gql`
  mutation DeleteFileVersionMutation($fileId: Int!, $versionId: String!) {
    deleteFileVersion(fileId: $fileId, versionId: $versionId) {
      fileId
      versionId
      hash
      name
      description
      createdAt
    }
  }
`
const UPDATE_FILE_VERSION_MUTATION = gql`
  mutation UpdateFileVersionMutation(
    $fileId: Int!
    $versionId: String!
    $input: UpdateFileVersionInput!
  ) {
    updateFileVersion(fileId: $fileId, versionId: $versionId, input: $input) {
      fileId
      versionId
      hash
      name
      description
      createdAt
    }
  }
`

export const Success = (props: CellSuccessProps<graphql.Query>) => {
  const [getSignedUrl] = useMutation<
    graphql.Mutation,
    graphql.MutationgetSignedUrlArgs
  >(GET_SIGNED_URL)

  const [deleteFileVersionMutation] = useMutation<
    graphql.Mutation,
    graphql.MutationdeleteFileVersionArgs
  >(DELETE_FILE_VERSION_MUTATION)

  const [updateFileVersionMutation] = useMutation<
    graphql.Mutation,
    graphql.MutationupdateFileVersionArgs
  >(UPDATE_FILE_VERSION_MUTATION)
  const [versions, setVersions] = React.useState(
    NewRowInfos(props.file.versions)
  )

  const getSignedUrlForDownload = async (
    versionId: string
  ): Promise<string> => {
    return (
      await getSignedUrl({
        variables: {
          fileId: props.file.id,
          versionId: versionId,
        },
      })
    ).data?.getSignedUrl
  }

  const deleteFileVersion = async (versionId: string): Promise<void> => {
    await deleteFileVersionMutation({
      variables: {
        fileId: props.file.id,
        versionId: versionId,
      },
    })
    setVersions(filterRowInfos(versions, (row) => row.versionId !== versionId))
  }

  const updateFileVersion = async (
    versionId: string,
    name: string,
    description: string
  ) => {
    await updateFileVersionMutation({
      variables: {
        fileId: props.file.id,
        versionId: versionId,
        input: {
          name: name,
          description: description,
        },
      },
    })
    setVersions(
      mapRowInfos(versions, (row) => {
        if (row.versionId !== versionId) {
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
  if (versions.length === 0) {
    return <Empty />
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Version Name</th>
            <th>Version Description</th>
            <th>Crated At</th>
            <th>Download</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {versions.map(({ row, editModalIsOpen, deleteModalIsOpen }) => {
            return (
              <tr key={row.versionId}>
                <td>{row.name}</td>
                <td>{row.description ?? 'No description'}</td>
                <td>{new Date(row.createdAt).toLocaleString()}</td>
                <td>
                  <DownloadBtn
                    onClick={async () => {
                      window.open(await getSignedUrlForDownload(row.versionId))
                    }}
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </DownloadBtn>
                </td>
                <td>
                  <DownloadBtn
                    onClick={async () => {
                      setVersions(
                        setEditModalIsOpenForRowInfo(
                          versions,
                          (v) => v.versionId === row.versionId,
                          true
                        )
                      )
                    }}
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </DownloadBtn>
                  <FileModal
                    isOpen={editModalIsOpen}
                    onClose={() =>
                      setVersions(
                        setEditModalIsOpenForRowInfo(
                          versions,
                          (v) => v.versionId === row.versionId,
                          false
                        )
                      )
                    }
                    fileId={props.file.id}
                    onSave={async (name, description, _) => {
                      await updateFileVersion(row.versionId, name, description)
                    }}
                    existingName={row.name}
                    existingDescription={row.description}
                  />
                </td>
                <td>
                  <DeleteBtn
                    onClick={async () => {
                      setVersions(
                        setDeleteModalIsOpenForRowInfo(
                          versions,
                          (v) => v.versionId === row.versionId,
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
                      setVersions(
                        setDeleteModalIsOpenForRowInfo(
                          versions,
                          (v) => v.versionId === row.versionId,
                          false
                        )
                      )
                    }
                    onSubmit={async () =>
                      await deleteFileVersion(row.versionId)
                    }
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
