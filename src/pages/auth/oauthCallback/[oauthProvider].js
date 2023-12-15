import { useEffect } from 'react'
import { getOauthIdToken } from 'modules/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { errorMessage } from 'utils/helpers'
import { Box, Heading, Stack, Flex, Spinner } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import WarningBlock from 'components/common/warningBlock'
import InfoBlock from 'components/common/infoBlock'
import { capitalizeWord } from 'utils/helpers'

// Facebook redirects to this page
const OauthProvider = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { code, state = {}, oauthProvider } = router.query
  const { twoFaMeta, twoFaTokenRequired, isError, isLoggedIn, error } = useSelector((state) => state.auth)
  const { isRemember } = JSON.parse(state)
  const { t } = useTranslation('common')

  useEffect(() => {
    if (isError) {
      const id = setTimeout(() => window.close(), 4000)
    }
  }, [isError])

  useEffect(() => {
    if (code) {
      dispatch(getOauthIdToken(code, isRemember, oauthProvider))
    } else {
      window.close()
    }
  }, [])
  useEffect(() => {
    const channel = new BroadcastChannel('oauth')
    if (isLoggedIn) {
      channel.postMessage('login')
      window.close()
    }
    if (twoFaTokenRequired) {
      channel.postMessage({ twoFaMeta, twoFa: true })
      window.close()
    }
  }, [isLoggedIn, twoFaTokenRequired])

  return (
    <Box as='section' p={{ base: '4', md: '8' }} w='100%'>
      <Stack spacing='1' w='100%'>
        <Heading size={{ base: 'xs', md: 'sm' }} fontWeight='medium'>
          {t('auth#oauth_sigin_in_title', { oauthProvider: capitalizeWord(oauthProvider) })}
        </Heading>
        <>
          {!isError && <InfoBlock spinner message={t('auth#oauth_sigin_in_text')} />}
          {isError && <WarningBlock message={errorMessage(error, t)} />}
        </>
      </Stack>
    </Box>
  )
}

export default OauthProvider
