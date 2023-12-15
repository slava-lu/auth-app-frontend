import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { confirmEmail, emailBroadcastChannel, getUserInfo } from 'modules/auth'
import { ERROR_CODES } from 'config/consts'
import { useEffect } from 'react'
import WarningBlock from 'components/common/warningBlock'
import InfoBlock from 'components/common/infoBlock'

// This page is routed to by the email verification link
export const EmailVerification = () => {
  const { isEmailConfirmed, error } = useSelector((state) => state.auth)
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  useEffect(() => {
    if (isEmailConfirmed) {
      emailBroadcastChannel.postMessage('confirmed')
      dispatch(getUserInfo())
    }
  }, [])

  const errorMessage = () => {
    if (error?.errorCode === ERROR_CODES.VERIFICATION_CODE_NOT_FOUND) {
      return t('auth#email_confirmation_code_not_found')
    }
    if (error?.errorCode === ERROR_CODES.VERIFICATION_CODE_IS_NOT_CORRECT) {
      return t('auth#email_confirmation_code_not_correct')
    }
    return t('auth#email_confirmation_not_confirmed')
  }

  return (
    <Box as='section' p={{ base: '4', md: '8' }} w='100%'>
      <Stack spacing='1' w='100%'>
        <Heading size={{ base: 'xs', md: 'sm' }} fontWeight='medium'>
          {t('auth#email_confirmation_title')}
        </Heading>
        <>
          {isEmailConfirmed && <InfoBlock message={t('auth#email_confirmation_confirmed')} />}
          {!isEmailConfirmed && <WarningBlock message={errorMessage()} />}
        </>
      </Stack>
    </Box>
  )
}

EmailVerification.getInitialProps = async ({ store, query }) => {
  store.dispatch(confirmEmail(query))
  return {
    title: 'title#email_confirmation_page',
  }
}

export default EmailVerification
