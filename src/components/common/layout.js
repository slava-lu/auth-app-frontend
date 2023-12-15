import Head from 'next/head'
import Footer from './footer'
import useTranslation from 'next-translate/useTranslation'
import { Container, Flex, useToast } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { dispatchResetError, dispatchResetInfoMessage } from 'modules/ui'
import { ERROR_CODES, CONTAINER_SIZE } from 'config/consts'
import { useRouter } from 'next/router'
import { loginBroadcastChannel, setLoginStatus, triggerLogout } from 'modules/auth'
import { errorMessage } from 'utils/helpers'
import PasswordCheckModal from 'components/auth/passwordCheckModal'
import AutoLogout from 'components/auth/AutoLogout'
import Header from './header/header'
import HeaderLeft from './header/headerLeft'

const Layout = (props) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { children, title } = props
  const { infoMessage } = useSelector((state) => state.ui)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const { isError: isAuthError, error: authError } = useSelector((state) => state.auth)
  const { isError: isUserError, error: userError } = useSelector((state) => state.user)
  const { isError: isAdminError, error: adminError } = useSelector((state) => state.admin)
  const { autoLogout } = useSelector((state) => state.system.config)
  const { isEnabled } = autoLogout

  const isError = isAuthError || isUserError || isAdminError
  const error = authError || userError || adminError
  const errorCodesToRedirect = [
    ERROR_CODES.NEW_LOGIN_REQUIRED,
    ERROR_CODES.TOKEN_NOT_FOUND,
    ERROR_CODES.USER_BANNED,
    ERROR_CODES.ACCOUNT_DEACTIVATED,
  ]

  const dispatch = useDispatch()

  const isAdminRoute = router.pathname.includes('/admin')
  const isOauthRoute = router.pathname.includes('/auth/oauthCallback')
  const showLeftMenu = !isAdminRoute && !isOauthRoute

  const toast = useToast()
  useEffect(() => {
    if (isError && errorCodesToRedirect.includes(error.errorCode)) {
      loginBroadcastChannel.postMessage('logout')
      dispatch(triggerLogout())
      dispatch(setLoginStatus(false))
      const id = error.errorCode
      if (error.errorCode !== ERROR_CODES.TOKEN_NOT_FOUND && !toast.isActive(id)) {
        toast({
          id,
          duration: 10000,
          title: errorMessage(error, t),
          status: 'error',
          isClosable: true,
          position: 'top-right',
        })
      }
      dispatch(dispatchResetError())
    }

    if (isError && !error.errorCode) {
      console.log('error', error)
      toast({
        duration: 10000,
        title: error.message,
        status: 'error',
        isClosable: true,
        position: 'top-right',
      })
      dispatch(dispatchResetError())
    }
  }, [isError, error])

  useEffect(() => {
    if (infoMessage) {
      toast({
        title: t(infoMessage),
        status: 'success',
        isClosable: true,
        position: 'top-right',
      })
      dispatch(dispatchResetInfoMessage())
    }
  }, [infoMessage])

  return (
    <>
      <Head>
        <title>{t(title)}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Flex direction='column' minH='100vh'>
        <Header />
        <Container maxW={CONTAINER_SIZE} mb='auto' bg='white' position='relative'>
          <Flex as='main' width='100%'>
            {showLeftMenu && <HeaderLeft />}
            {children}
          </Flex>
        </Container>
        <Footer />
        <PasswordCheckModal />
        {isEnabled && isLoggedIn && <AutoLogout />}
      </Flex>
    </>
  )
}

export default Layout
