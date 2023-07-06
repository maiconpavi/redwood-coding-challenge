import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

export const DragDropText = styled.p`
  font-size: 16px;
  font-weight: bold;
`

type FileUploadContainerProps = {
  isDragging: boolean
}

export const FileUploadContainer = styled.div<FileUploadContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
`

export const UploadFileBtn = styled.button`
  border-radius: 3px;
  float: right;
  padding: 5px;
  color: 333;
  background-color: white;
  border: none;
  font-size: 15px;
  cursor: pointer;
`

export const FilePreviewContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 15px;
`

export const DocumentIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  margin-right: 5px;
`

export const UploadIcon = styled(FontAwesomeIcon)`
  border-radius: 50%;
  margin-bottom: 10px;
  background-color: #ccc;
  padding: 10px;
  color: #333;
  font-size: 20px;
  margin-right: 5px;
`

export const PreviewList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 10px;
`

export const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`

export const FileMetaData = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 14px;
`

export const RemoveFileIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  color: red;
  cursor: pointer;
`

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`

export const ModalContent = styled.div`
  background-color: rgb(32, 35, 36);
  color: #fff;
  padding: 20px;
  border-radius: 4px;
  width: 400px;
  max-width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
`

export const ModalTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
`

export const ModalInput = styled.input`
  background-color: transparent;
  color: #fff;
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const FormField = styled.input`
  &:label {
    background-color: #ccc;
    color: #fff;
  }

  &[type='file'] {
    display: none;
  }
`

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`

export const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
`

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  color: #fff;
  border: none;
  font-size: 24px;
  cursor: pointer;
`

export const ModalCloseIcon = styled(FontAwesomeIcon)`
  color: #fff;
`
