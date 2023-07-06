import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { DeleteBtn } from 'src/pages/HomePage/HomeStyles'

import {
  DeleteModalContent,
  ModalOverlay,
  ModalTitle,
  ModalCloseButton,
  ModalButton,
} from '../FileModal/modalStyles'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => Promise<void>
}

const DeleteModal = (props: DeleteModalProps) => {
  return (
    <ModalOverlay style={{ display: props.isOpen ? 'block' : 'none' }}>
      <DeleteModalContent>
        <ModalTitle>Are you sure you want to delete this?</ModalTitle>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ModalButton onClick={props.onClose} style={{ width: '60px' }}>
            No
          </ModalButton>
          <DeleteBtn onClick={props.onSubmit} style={{ width: '60px' }}>
            Yes
          </DeleteBtn>
        </div>

        <ModalCloseButton onClick={props.onClose}>
          <FontAwesomeIcon icon={faClose} />
        </ModalCloseButton>
      </DeleteModalContent>
    </ModalOverlay>
  )
}

export default DeleteModal
