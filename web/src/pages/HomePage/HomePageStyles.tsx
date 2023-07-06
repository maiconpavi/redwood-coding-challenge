import styled from 'styled-components'

export const Container = styled.section`
  position: relative;
  padding: 35px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #6b728e, rgb(32, 35, 36));
`

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
`
export const BackBtn = styled.button`
  position: absolute;
  border: none;
  outline: none;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: rgb(32, 35, 36);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`
