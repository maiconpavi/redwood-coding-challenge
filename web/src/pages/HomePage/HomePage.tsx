import { MetaTags } from '@redwoodjs/web'

import FileUpload from 'src/components/fileUpload/fileUpload.component'

import { Container } from './HomePageStyles'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" />
      <Container>
        <FileUpload />
      </Container>
    </>
  )
}

export default HomePage
