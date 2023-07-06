import { MetaTags } from '@redwoodjs/web'

import FileUpload from 'src/components/fileUpload/fileUpload.component'

import { Container, Title } from './HomePageStyles'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" />
      <Container>
        <Title>My Files</Title>
        <FileUpload />
      </Container>
    </>
  )
}

export default HomePage
