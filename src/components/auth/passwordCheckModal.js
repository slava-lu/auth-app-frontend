import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Stack,
  FormErrorMessage,
  Box,
  FormControl,
  Button,
} from '@chakra-ui/react'
import { closePasswordCheckModal, startPasswordCheck } from 'modules/ui'
import { useDispatch, useSelector } from 'react-redux'
import PasswordField from './passwordField'
import { useForm } from 'react-hook-form'
import useTranslation from 'next-translate/useTranslation'
import { ERROR_CODES } from '../../config/consts'

const PasswordCheckModa = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const { isError, isLoading, error } = useSelector((state) => state.ui)
  const { isPasswordCheckModalOpen, passwordCheckMeta } = useSelector((state) => state.ui)
  const dispatch = useDispatch()
  const { t } = useTranslation('common')

  const errorMessage = () => {
    if (error?.errorCode === ERROR_CODES.PASSWORD_CHECK_FAILED) {
      return t('confirm_password#password_check_faled')
    }
    return error.message
  }

  const onSubmit = ({ password }) => {
    dispatch(startPasswordCheck())
    const { passwordValidationActionName, data } = passwordCheckMeta
    const payload = { ...data, password }
    dispatch({ type: passwordValidationActionName, payload })
  }

  return (
    <Modal
      size='lg'
      closeOnOverlayClick={false}
      isOpen={isPasswordCheckModalOpen}
      onClose={() => dispatch(closePasswordCheckModal())}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            my={{ base: '8', sm: '8' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing='4'>
                <Stack spacing='4'>
                  <PasswordField
                    text='confirm_password#confirmation_text'
                    {...register('password', { required: t('login_modal#validation_required_field') })}
                    error={errors.password}
                  />
                  <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
                </Stack>
                <Stack>
                  <Box mb={4}>
                    <FormControl isInvalid={isError}>
                      <FormErrorMessage>{errorMessage()}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Button variant='primary' type='submit' isLoading={isLoading}>
                    {t('confirm_password#password')}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default PasswordCheckModa
