import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center
  align-items: center;
  padding: 10px 20px;
  background-color: rgb(107, 114, 142);
  width: 100%;
  font-size: 20px;
  color:white;

& a {
  color: white;
  text-decoration: none;
  display: flex;

  &:hover {
    opacity: 0.5;
  }
}
`

export const LogoTitle = styled.h1`
  display: flex;
  align-items: center;
  font-size: 18px;
`
