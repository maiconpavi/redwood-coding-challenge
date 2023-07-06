import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { HeaderContainer } from './HeaderStyle'

const Header = () => {
  return (
    <HeaderContainer>
      <FontAwesomeIcon icon={faFile} />
      <h1>DropFiles</h1>
    </HeaderContainer>
  )
}

export default Header
