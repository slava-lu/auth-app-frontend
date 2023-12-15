import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { triggerPasswordReset } from 'modules/auth'

const PasswordResetBox = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const { isPasswordResetLinkSent: isSent, isLoading } = useSelector((state) => state.auth)

  const onSubmit = (values) => {
    dispatch(triggerPasswordReset(values))
  }

  return (
    <Box py={{ base: '6', md: '8' }} px={{ base: '4', sm: '4' }}>
      <Stack spacing='8'>
        <Stack spacing='6'>
          <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
            <Heading size={{ base: 'xs', md: 'sm' }}>{t('login_modal#password_reset_title')}</Heading>
            <HStack spacing='1' justify='center'>
              <Text color='muted'>{t('login_modal#password_reset_description')}</Text>
            </HStack>
          </Stack>
        </Stack>
        {isSent && (
          <Alert status='success'>
            <AlertIcon />
            {t('login_modal#password_reset_alert')}
          </Alert>
        )}
        {!isSent && (
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
                    {t('login_modal#password_reset_button')}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        )}
      </Stack>
    </Box>
  )
}

export default PasswordResetBox
