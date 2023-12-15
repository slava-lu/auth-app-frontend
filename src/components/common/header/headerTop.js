import { useEffect } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  Text,
  IconButton,
  AvatarBadge,
  Tooltip,
} from '@chakra-ui/react'
import {
  closeLoginModal,
  closeLoginAsModal,
  openLoginModal,
  setLoginStatus,
  setTwoFaStatus,
  closePasswordChangeModal,
  getUserInfo,
  loginBroadcastChannel,
  emailBroadcastChannel,
} from 'modules/auth'
import LoginModal from 'components/auth/loginModal'
import PasswordChangeModal from 'components/auth/passwordChangeModal'
import LangSwitcher from 'components/menus/langSwitcher'
import LoginAsModal from 'components/auth/LoginAsModal'
import MainMenu from 'components/menus/mainMenu'
import TopMenu from 'components/menus/topMenu'
import { toggleLeftMenuMobile } from 'modules/ui'
import { WORKSPACE_ROUTE } from 'config/consts'
import logo from '../images/logo.svg'
import logo_mobile from '../images/logo_mobile.svg'

const HeaderTop = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t, lang } = useTranslation('common')
  const { isLoginModalOpen, isLoginAsModalOpen, isLoggedIn, isPasswordChangeModalOpen, userInfo, oauthProfile } =
    useSelector((state) => state.auth)
  const isMenuOpen = useSelector((state) => state.ui.isLeftMenuOpen)
  const avatarBadgeBg = userInfo?.isEmailVerified ? 'green.500' : 'orange.500'
  const profilePictureSrc = oauthProfile.picture ? `data:image/jpeg;base64,${oauthProfile.picture}` : null
  const ignoreFallback = !!profilePictureSrc

  useEffect(() => {
    loginBroadcastChannel.onmessage = (e) => {
      if (e.data.twoFa) {
        dispatch(setTwoFaStatus(e.data.twoFaMeta))
      }
      if (e.data === 'login') {
        dispatch(closeLoginModal())
        dispatch(setLoginStatus(true))
        dispatch(getUserInfo())
      }
      if (e.data === 'logout') {
        dispatch(setLoginStatus(false))
      }
    }
  }, [])

  useEffect(() => {
    emailBroadcastChannel.onmessage = (e) => {
      if (e.data === 'confirmed') {
        dispatch(getUserInfo())
      }
    }
  }, [])

  const handleLoginClick = () => {
    dispatch(openLoginModal())
  }

  return (
    <Box as='nav' py={2} borderBottom='1px solid lightgrey'>
      <Flex alignItems='center'>
        <Flex display={{ base: 'none', md: 'flex' }}>
          <NextLink href='/' passHref>
            <Image src={logo} alt='logo' width={150} />
          </NextLink>
          <MainMenu />
        </Flex>
        <Flex display={{ base: 'flex', md: 'none' }} alignItems='center' mr='12px'>
          <NextLink href='/' passHref>
            <Image src={logo_mobile} alt='logo' width={45} />
          </NextLink>
        </Flex>
        <IconButton
          colorScheme='teal'
          aria-label='Open Menu'
          size='lg'
          mt={2}
          mb={2}
          icon={<HamburgerIcon />}
          onClick={() => dispatch(toggleLeftMenuMobile(!isMenuOpen))}
          display={{ base: 'flex', md: 'none' }}
        />
        <HStack spacing='4' ml='auto'>
          <LangSwitcher t={t} lang={lang} />
          {!isLoggedIn && (
            <Button size='sm' onClick={handleLoginClick}>
              {t('menu#login')}
            </Button>
          )}
          <LoginModal isOpen={isLoginModalOpen} onClose={() => dispatch(closeLoginModal())} />
          <LoginAsModal isOpen={isLoginAsModalOpen} onClose={() => dispatch(closeLoginAsModal())} />
          <PasswordChangeModal
            isOpen={isPasswordChangeModalOpen}
            onClose={() => dispatch(closePasswordChangeModal())}
          />
          {isLoggedIn && (
            <div>
              <Menu>
                <Tooltip
                  isDisabled={userInfo?.isEmailVerified}
                  hasArrow
                  placement='bottom-start'
                  bg='orange.400'
                  label={t('header#email_not_verified')}>
                  <MenuButton>
                    <HStack>
                      <Avatar bg='teal.500' src={profilePictureSrc} ignoreFallback={ignoreFallback}>
                        <AvatarBadge boxSize='1em' bg={avatarBadgeBg} />
                      </Avatar>
                      <Text
                        fontStyle={userInfo?.isEmailVerified ? 'normal' : 'italic'}
                        color={userInfo?.isEmailVerified ? 'inherit' : 'gray.400'}
                        fontSize='sm'
                        noOfLines={1}
                        maxWidth='120px'
                        whiteSpace='nowrap'
                        textAlign='left'
                        display={{ base: 'none', md: 'block' }}>
                        {userInfo?.email}
                      </Text>
                    </HStack>
                  </MenuButton>
                </Tooltip>
                <TopMenu userInfo={userInfo} />
              </Menu>
            </div>
          )}
        </HStack>
      </Flex>
    </Box>
  )
}

export default HeaderTop
