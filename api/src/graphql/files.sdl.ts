export const schema = gql`
  type File {
    id: Int!
    name: String!
    description: String
    createdAt: DateTime!
    versions: [FileVersion]!
  }

  type Query {
    files: [File!]! @skipAuth
    file(id: Int!): File @skipAuth
  }

  input CreateFileInput {
    name: String!
    description: String
  }

  input UpdateFileInput {
    name: String
    description: String
  }

  type Mutation {
    createFile(input: CreateFileInput!): File! @skipAuth
    updateFile(id: Int!, input: UpdateFileInput!): File! @skipAuth
    deleteFile(id: Int!): File! @skipAuth
  }
`
