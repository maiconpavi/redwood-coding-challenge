import { HeaderContainer, LogoTitle } from './HeaderStyle'

const Header = () => {
  return (
    <HeaderContainer>
      <a href="/">
        <img src="/favicon.svg" alt="dropfiles" width={40} />
        <LogoTitle>DropFiles</LogoTitle>
      </a>
    </HeaderContainer>
  )
}

export default Header
