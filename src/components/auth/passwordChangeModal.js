import { Modal, ModalOverlay, ModalContent, ModalCloseButton, AlertIcon, Alert } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, FormControl, FormErrorMessage, Heading, Stack } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import { PasswordField } from 'components/auth/passwordField'
import { ERROR_CODES, MIN_PASSWORD_LENGTH } from 'config/consts'
import { changePassword } from 'modules/auth'

const PasswordChangeModal = (props) => {
  const { isOpen, onClose } = props
  const { isError, isLoading, error, isPasswordChanged } = useSelector((state) => state.auth)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const onSubmit = (values) => {
    dispatch(changePassword(values))
  }

  const errorMessage = () => {
    if (error?.errorCode === ERROR_CODES.OLD_PASSWORD_IS_NOT_CORRECT) {
      return t('password_change_modal#old_password_is_not_correct')
    }
    return t('password_change_modal#change_password_error_message')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <Box py={{ base: '6', md: '8' }} px={{ base: '4', sm: '4' }}>
          <Stack spacing='8'>
            <Stack spacing='6'>
              <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                <Heading size={{ base: 'xs', md: 'sm' }}>{t('password_change_modal#title')}</Heading>
              </Stack>
            </Stack>
            <Box
              py={{ base: '0', sm: '8' }}
              px={{ base: '4', sm: '10' }}
              boxShadow={{ base: 'none', sm: 'md' }}
              borderRadius={{ base: 'none', sm: 'xl' }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing='4'>
                  <Stack spacing='4'>
                    <PasswordField
                      text='password_change_modal#old_password'
                      {...register('oldPassword', { required: t('login_modal#validation_required_field') })}
                      error={errors.oldPassword}
                    />
                    <FormErrorMessage>{errors?.oldPassword?.message}</FormErrorMessage>
                    <PasswordField
                      text='password_change_modal#new_password'
                      hint='login_modal#password_field_with_hint'
                      {...register('newPassword', {
                        required: t('login_modal#validation_required_field'),
                        minLength: {
                          value: MIN_PASSWORD_LENGTH,
                          message: t('login_modal#validation_password_length', { value: MIN_PASSWORD_LENGTH }),
                        },
                        pattern: {
                          value: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
                          message: t('login_modal#validation_pattern'),
                        },
                      })}
                      error={errors.newPassword}
                    />
                  </Stack>
                  <Stack>
                    <Box mb={4}>
                      <FormControl isInvalid={isError}>
                        <FormErrorMessage>{errorMessage()}</FormErrorMessage>
                      </FormControl>
                      {isPasswordChanged && (
                        <Alert status='success'>
                          <AlertIcon />
                          {t('password_change_modal#password_changed')}
                        </Alert>
                      )}
                    </Box>
                    <Button variant='primary' type='submit' isLoading={isLoading}>
                      {t('password_change_modal#button')}
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default PasswordChangeModal
