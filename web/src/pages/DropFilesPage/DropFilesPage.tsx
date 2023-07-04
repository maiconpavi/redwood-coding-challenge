import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'

import FileUpload from 'src/components/fileUpload/fileUpload.component'

import { Container } from './DropFilesPageStyles'

const MyPagePage = () => {
  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: [],
  })

  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files })

  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   //logic to create new user...
  // }

  return (
    <>
      <MetaTags title="MyPage" description="MyPage page" />
      <Container>
        <FileUpload
          accept=".jpg,.png,.jpeg,.pdf"
          label="Files to upload"
          multiple
          updateFilesCb={updateUploadedFiles}
        />
      </Container>
    </>
  )
}

export default MyPagePage
