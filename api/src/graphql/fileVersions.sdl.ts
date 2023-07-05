export const schema = gql`
  type FileVersion {
    fileId: Int!
    versionId: String!
    hash: String!
    name: String!
    description: String
    createdAt: DateTime!
    File: File
  }

  type Query {
    fileVersions: [FileVersion!]! @skipAuth
    fileVersion(fileId: Int!, versionId: String!): FileVersion @skipAuth
  }

  input CreateFileVersionInput {
    fileId: Int!
    versionId: String!
    hash: String!
    name: String!
    description: String
  }

  input UpdateFileVersionInput {
    fileId: Int
    versionId: String
    hash: String
    name: String
    description: String
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
    updateFileVersion(
      fileId: Int!
      versionId: String!
      input: UpdateFileVersionInput!
    ): FileVersion! @skipAuth
    deleteFileVersion(fileId: Int!, versionId: String!): FileVersion! @skipAuth
    putSignedUrl(input: PutSignedUrlInput!): PutSignedUrl @skipAuth
  }
`
