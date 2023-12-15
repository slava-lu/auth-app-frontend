import NextLink from 'next/link'
import { Box, MenuItem, MenuList, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { openChangePasswordModal, triggerLogout, openLoginAsModal } from 'modules/auth'
import { useDispatch, useSelector } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import DeleteAlert from './deleteAlert'
import { USER_ROLES, LOGIN_PROVIDERS } from 'config/consts'

const TopMenu = ({ userInfo }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const { impersonationMode, lastLoginProvider } = useSelector((state) => state.auth.userInfo)
  const useRoles = useSelector((state) => state.auth.userInfo.roles) || []
  const { isOpen, onOpen, onClose } = useDisclosure()
  const canLoginAs = useRoles.includes(USER_ROLES.IMPERSONATION_ROLE)

  const handlePasswordChange = () => {
    dispatch(openChangePasswordModal())
  }
  const handleLogout = () => {
    dispatch(triggerLogout())
  }

  const triggerLoginAsModal = () => {
    dispatch(openLoginAsModal())
  }

  return (
    <>
      <DeleteAlert isOpen={isOpen} onClose={onClose} />
      <MenuList minWidth={{ base: '100vw', sm: '120px' }}>
        <Box px='3' py='2' borderBottomWidth={1}>
          <VStack align='stretch' spacing='2px'>
            <Box>
              <Text as='b'>{`${userInfo?.firstName ?? ''} ${userInfo?.lastName ?? ''}`}</Text>
            </Box>
            <Box>
              <Text fontSize='sm'>{userInfo?.email}</Text>
            </Box>
          </VStack>
        </Box>
        <NextLink href='/user/profile' passHref>
          <MenuItem>{t('menu#profile')}</MenuItem>
        </NextLink>
        <MenuItem onClick={handleLogout}>{t('menu#logout')}</MenuItem>
        {!impersonationMode && lastLoginProvider === LOGIN_PROVIDERS.LOCAL && (
          <MenuItem onClick={handlePasswordChange}>{t('menu#change_password')}</MenuItem>
        )}
        {!impersonationMode && <MenuItem onClick={onOpen}>{t('menu#delete_account')}</MenuItem>}
        {canLoginAs && <MenuItem onClick={triggerLoginAsModal}>{t('menu#login_as')}</MenuItem>}
      </MenuList>
    </>
  )
}

export default TopMenu
