import { Box, Button, FormControl, FormErrorMessage, Heading, Stack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import NextLink from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { changePasswordWithCode, checkPasswordResetLink } from 'modules/auth'
import { ERROR_CODES, MIN_PASSWORD_LENGTH } from 'config/consts'
import PasswordField from 'components/auth/passwordField'
import WarningBlock from 'components/common/warningBlock'
import InfoBlock from 'components/common/infoBlock'

// This page is routed to by the email password reset link
export const PasswordReset = ({ query }) => {
  const { isPasswordResetLinkValid, isPasswordResetWithCodeOk, isError, isLoading, error } = useSelector(
    (state) => state.auth
  )
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const onSubmit = ({ password }) => {
    dispatch(changePasswordWithCode({ password, ...query }))
  }

  const errorMessage = () => {
    if (error?.errorCode === ERROR_CODES.PASSWORD_RESET_LINK_INVALID) {
      return t('login#password_reset_link_invalid')
    }
    if (error?.errorCode === ERROR_CODES.PASSWORD_RESET_LINK_EXPIRED) {
      return t('login#password_reset_link_expired')
    }
    return t('generic#request_failed')
  }
  return (
    <Box as='section' p={{ base: '4', md: '8' }} w='100%'>
      <Stack spacing='1' w='100%'>
        <Heading size={{ base: 'xs', md: 'sm' }} fontWeight='medium'>
          {t('auth#password_reset_title')}
        </Heading>
        {!isPasswordResetLinkValid && !isPasswordResetWithCodeOk && (
          <WarningBlock message={t('login_modal#password_reset_link_invalid')} />
        )}
        {isPasswordResetLinkValid && !isPasswordResetWithCodeOk && (
          <Box maxW={400}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing='6'>
                <Stack spacing='5'>
                  <PasswordField
                    {...register('password', {
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
                    error={errors.password}
                  />
                </Stack>
                <Stack spacing='6'>
                  <FormControl isInvalid={isError}>
                    <FormErrorMessage>{errorMessage()}</FormErrorMessage>
                  </FormControl>
                  <Button variant='primary' type='submit' isLoading={isLoading}>
                    {t('login#change_password_button')}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        )}
        {isPasswordResetWithCodeOk && (
          <Box>
            <Stack spacing='12'>
              <InfoBlock message={t('login_modal#password_changed_alert')} />
              <NextLink href='/' passHref>
                <Button size='sm'>{t('login_modal#password_changed_go_home')}</Button>
              </NextLink>
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  )
}

PasswordReset.getInitialProps = async ({ store, query }) => {
  store.dispatch(checkPasswordResetLink(query))
  return {
    title: 'title#password_reset_form',
    query,
  }
}

export default PasswordReset
