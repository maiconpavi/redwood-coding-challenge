import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled, { keyframes } from 'styled-components'

export const FileUploadContainer = styled.section`
  position: relative;
  margin: 25px 0 15px;
  padding: 35px 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #202324;
`

export const InputLabel = styled.label`
  top: -21px;
  font-size: 13px;
  color: rgb(232, 230, 227);
  font-weight: bold;
  left: 0;
  position: absolute;
`

export const DragDropText = styled.p`
  color: rgb(232, 230, 227);
  font-weight: bold;
  letter-spacing: 2.2px;
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
`

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(32, 33, 36, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(32, 33, 36, 0.3);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(32, 33, 36, 0.3);
  }
`

export const UploadFileBtn = styled.button`
  box-sizing: border-box;
  padding: 1rem;
  appearance: none;
  background-color: transparent;
  border: 2px solid rgb(55, 60, 62);
  cursor: pointer;
  line-height: 1;
  text-align: center;
  font-weight: 700;
  border-radius: 50%;
  color: rgb(232, 230, 227);
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 250ms ease-in-out;
  font-family: 'Open Sans', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
  }

  @media only screen and (max-width: 500px) {
  }

  @media only screen and (max-width: 350px) {
    padding: 1em;
  }

  &:hover {
    color: #fff;
    outline: 0;
    border-color: #202124;
    background: #474e68;
    animation: ${pulseAnimation} 1s infinite;
  }

  &:disabled {
    opacity: 0.4;
    filter: grayscale(100%);
    pointer-events: none;
  }
`

export const FilePreviewContainer = styled.table`
  margin-top: 20px;
  display: flex;
  border-collapse: collapse;
  color: white;

  th,
  td {
    padding: 10px;
  }
`

export const PreviewList = styled.section`
  color: #474e68;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px auto;

  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
`

export const FileMetaData = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  background-color: rgba(64, 66, 88, 0.75);

  aside {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
  }
`

export const RemoveFileIcon = styled(FontAwesomeIcon)`
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
    color: red;
    cursor: pointer;
  }
`

export const PreviewContainer = styled.section`
  padding: 0.2rem;
  margin: 0.2rem;
  min-width: 210px;
  width: 10%;
  height: 120px;
  border-radius: 6px;
  box-sizing: border-box;
  background: rgb(24, 26, 27);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  &:hover {
    ${FileMetaData} {
      display: flex;
    }
  }

  & > div:first-of-type {
    height: 100%;
    position: relative;
  }

  @media only screen and (max-width: 750px) {
    width: 25%;
  }

  @media only screen and (max-width: 500px) {
    width: 50%;
  }

  @media only screen and (max-width: 400px) {
    width: 100%;
    padding: 0 0 0.4em;
  }
`

export const ImagePreview = styled.img`
  border-radius: 6px;
  width: 100%;
  height: 100%;
`

export const DocumentIcon = styled(FontAwesomeIcon)`
  font-size: 50px;
  color: #ccc;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

export const SubmitButton = styled.button`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 50px;
  background-color: #474e68;
  color: rgb(232, 230, 227);
  font-size: 1rem;
  font-weight: bold;
  padding: 1em 2em;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 250ms ease-in-out;

  &:hover {
    background-color: #59627a;
  }

  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`
