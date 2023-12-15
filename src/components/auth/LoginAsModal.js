import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
  Stack,
  Heading,
  HStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import useTranslation from 'next-translate/useTranslation'
import { useSelector, useDispatch } from 'react-redux'
import { triggerLoginAs } from 'modules/auth'

const LoginAsModal = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const { isOpen, onClose } = props
  const { t } = useTranslation('common')
  const { isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const onSubmit = (values) => {
    dispatch(triggerLoginAs(values))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box py={{ base: '6', md: '8' }} px={{ base: '4', sm: '4' }}>
            <Stack spacing='8'>
              <Stack spacing='6'>
                <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                  <Heading size={{ base: 'xs', md: 'sm' }}>{t('login_modal#login_as_title')}</Heading>
                  <HStack spacing='1' justify='center'>
                    <Text color='muted'>{t('login_modal#login_as_description')}</Text>
                  </HStack>
                </Stack>
              </Stack>
              <Box
                py={{ base: '0', sm: '8' }}
                px={{ base: '4', sm: '10' }}
                boxShadow={{ base: 'none', sm: 'md' }}
                borderRadius={{ base: 'none', sm: 'xl' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing='6'>
                    <Stack spacing='5'>
                      <FormControl isInvalid={errors.email}>
                        <FormLabel htmlFor='email'> {t('login_modal#email_field')}</FormLabel>
                        <Input
                          type='email'
                          {...register('email', { required: t('login_modal#validation_required_field') })}
                        />
                        <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                      </FormControl>
                    </Stack>
                    <Stack spacing='6'>
                      <Button variant='primary' type='submit' isLoading={isLoading}>
                        {t('login_modal#login_as_button')}
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </Box>
            </Stack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default LoginAsModal
