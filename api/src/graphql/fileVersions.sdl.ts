export const schema = gql`
  type FileVersion {
    id: Int!
    versionId: String!
    hash: String!
    name: String!
    description: String
    createdAt: DateTime!
    File: File
    fileId: Int
  }

  type Query {
    fileVersions: [FileVersion!]! @skipAuth
    fileVersion(id: Int!): FileVersion @skipAuth
    fileVersionByVersionId(fileId: Int!, versionId: String!): FileVersion
      @skipAuth
  }

  input CreateFileVersionInput {
    versionId: String!
    hash: String!
    name: String!
    description: String
    fileId: Int
  }

  input UpdateFileVersionInput {
    versionId: String
    hash: String
    name: String
    description: String
    fileId: Int
  }

  input PutSignedUrlInput {
    fileId: Int!
    hash: String!
    contentType: String!
  }

  type PutSignedUrl {
    signedUrl: String
    versionId: String
  }

  type Mutation {
    createFileVersion(input: CreateFileVersionInput!): FileVersion! @skipAuth
    updateFileVersion(id: Int!, input: UpdateFileVersionInput!): FileVersion!
      @skipAuth
    deleteFileVersion(id: Int!): FileVersion! @skipAuth
    putSignedUrl(input: PutSignedUrlInput!): PutSignedUrl @skipAuth
  }
`
