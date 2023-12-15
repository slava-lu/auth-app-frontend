import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import LoginBox from './loginBox'
import PasswordResetBox from './passwordResetBox'
import TwoFaTokenBox from './twoFaTokenBox'

const LoginModal = (props) => {
  const { isPasswordResetMode, twoFaTokenRequired } = useSelector((state) => state.auth)
  const { isOpen, onClose, t } = props

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        {twoFaTokenRequired && (
          <ModalBody>
            <TwoFaTokenBox />
          </ModalBody>
        )}
        {!twoFaTokenRequired && <ModalBody>{!isPasswordResetMode ? <LoginBox /> : <PasswordResetBox />}</ModalBody>}
      </ModalContent>
    </Modal>
  )
}

export default LoginModal
