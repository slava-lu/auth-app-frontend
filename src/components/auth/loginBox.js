import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/fa'
import useTranslation from 'next-translate/useTranslation'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { PasswordField } from './passwordField'
import { triggerLogin, triggerSignUp, setPasswordResetMode, resetError } from 'modules/auth'
import { MIN_PASSWORD_LENGTH, LOGIN_PROVIDERS } from 'config/consts'
import { getOauthCode } from 'config/oauth'
import { errorMessage } from 'utils/helpers'

const LoginBox = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const { isError, isLoading, error } = useSelector((state) => state.auth)
  const [loginMode, setLoginMode] = useState('signIn')
  const [isRememberMeChecked, setRememberMeChecked] = useState(true)

  const onSubmit = (values) => {
    if (loginMode === 'signUp') {
      values.password = values.password_signup
    }
    loginMode === 'signIn' ? dispatch(triggerLogin(values)) : dispatch(triggerSignUp(values))
  }

  const handleModeChange = (mode) => {
    setLoginMode(mode)
    dispatch(resetError())
  }

  const handleChange = (e) => {
    setRememberMeChecked(e.target.checked)
  }

  const handleOauthClick = (provider) => {
    const url = getOauthCode(isRememberMeChecked, provider)
    window.open(url, '_blank')
  }

  return (
    <Box py={{ base: '6', md: '8' }} px={{ base: '4', sm: '4' }}>
      <Stack spacing='8'>
        <Stack spacing='6'>
          <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
            <Heading size={{ base: 'xs', md: 'sm' }}>
              {loginMode === 'signIn' ? t('login_modal#modal_title_signin') : t('login_modal#modal_title_signup')}
            </Heading>
            {loginMode === 'signIn' && (
              <HStack spacing='1' justify='center'>
                <Text fontSize='18px' color='muted'>
                  {t('login_modal#do_not_have_an_account')}
                </Text>
                <Button onClick={() => handleModeChange('signUp')} variant='link'>
                  <Text fontSize='18px' fontWeight={700}>
                    {t('login_modal#signup')}
                  </Text>
                </Button>
              </HStack>
            )}
            {loginMode === 'signUp' && (
              <HStack spacing='1' justify='center'>
                <Text fontSize='18px' color='muted'>
                  {t('login_modal#have_an_account')}
                </Text>
                <Button onClick={() => handleModeChange('signIn')} variant='link'>
                  <Text fontSize='18px' fontWeight={700}>
                    {t('login_modal#signin')}
                  </Text>
                </Button>
              </HStack>
            )}
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
                {loginMode === 'signUp' && (
                  <>
                    <FormControl isInvalid={errors.firstName}>
                      <FormLabel htmlFor='name'>{t('login_modal#first_name_field')}</FormLabel>
                      <Input
                        type='text'
                        {...register('firstName', { required: t('login_modal#validation_required_field') })}
                      />
                      <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.lastName}>
                      <FormLabel htmlFor='name'>{t('login_modal#last_name_field')}</FormLabel>
                      <Input
                        type='text'
                        {...register('lastName', { required: t('login_modal#validation_required_field') })}
                      />
                      <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
                    </FormControl>
                  </>
                )}
                <FormControl isInvalid={errors.email}>
                  <FormLabel htmlFor='email'> {t('login_modal#email_field')}</FormLabel>
                  <Input
                    type='email'
                    {...register('email', { required: t('login_modal#validation_required_field') })}
                  />
                  <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                </FormControl>

                {loginMode === 'signUp' && (
                  <PasswordField
                    {...register('password_signup', {
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
                    error={errors.password_signup}
                  />
                )}
                {loginMode === 'signIn' && (
                  <PasswordField
                    {...register('password', {
                      required: t('login_modal#validation_required_field'),
                    })}
                    error={errors.password}
                  />
                )}
              </Stack>
              <HStack justify='space-between'>
                <Checkbox
                  defaultChecked
                  {...register('isRemember', {
                    onChange: (e) => {
                      handleChange(e)
                    },
                  })}>
                  {t('login_modal#remember_me')}
                </Checkbox>
                <Button onClick={() => dispatch(setPasswordResetMode())} variant='link' size='sm'>
                  {t('login_modal#forget_password')}
                </Button>
              </HStack>
              <Stack spacing='5'>
                <FormControl isInvalid={isError}>
                  <FormErrorMessage>{errorMessage(error, t)}</FormErrorMessage>
                </FormControl>
                <Button type='submit' isLoading={isLoading} size='md'>
                  {loginMode === 'signUp' ? t('login_modal#signup') : t('login_modal#signin')}
                </Button>
                <HStack>
                  <Divider />
                  <Text fontSize='sm' color='muted'>
                    {t('login_modal#or')}
                  </Text>
                  <Divider />
                </HStack>
                {/* <Button
                  size='md'
                  onClick={() => handleOauthClick(LOGIN_PROVIDERS.FACEBOOK)}
                  leftIcon={<FaFacebook />}
                  iconSpacing='3'
                  colorScheme='facebook'>
                  {t('login_modal#with_facebook')}
                </Button>*/}
                <Button
                  size='md'
                  onClick={() => handleOauthClick(LOGIN_PROVIDERS.GOOGLE)}
                  leftIcon={<FaGoogle />}
                  iconSpacing='3'
                  colorScheme='messenger'>
                  {t('login_modal#with_google')}
                </Button>
                <Button
                  size='md'
                  onClick={() => handleOauthClick(LOGIN_PROVIDERS.LINKEDIN)}
                  leftIcon={<FaLinkedin />}
                  iconSpacing='3'
                  colorScheme='linkedin'>
                  {t('login_modal#with_linkedin')}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Box>
  )
}

export default LoginBox
