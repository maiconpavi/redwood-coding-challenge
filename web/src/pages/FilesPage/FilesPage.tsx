import { MetaTags } from '@redwoodjs/web'

import FileCell from 'src/components/FileCell'

const FilesPage = () => {
  return (
    <>
      <MetaTags title="Files" description="Files page" />

      <FileCell/>
    </>
  )
}

export default FilesPage
