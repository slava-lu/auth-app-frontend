import NextLink from 'next/link'
import { useBreakpointValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Stack, StackDivider, Text } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import { useSelector, useDispatch } from 'react-redux'
import { toggleLeftMenuMobile } from 'modules/ui'

const LeftMenu = () => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const router = useRouter()
  const { isLoggedIn } = useSelector((state) => state.auth)
  const isVisible = useBreakpointValue({ base: true, md: false }, { ssr: false })

  const path = router.pathname

  return (
    <Stack
      onClick={() => dispatch(toggleLeftMenuMobile(false))}
      minW='180px'
      spacing='3'
      fontSize='14px'
      divider={<StackDivider borderColor='gray.300' />}>
      {isVisible && (
        <NextLink href='/' passHref>
          <Text fontWeight={path === '/' ? 700 : 400}>{t('menu_left#home')}</Text>
        </NextLink>
      )}
      {isVisible && (
        <NextLink href='/workspace' passHref>
          <Text fontWeight={path === '/workspace' ? 700 : 400}>{t('menu_left#workspace')}</Text>
        </NextLink>
      )}
      {isLoggedIn && (
        <NextLink href='/user/profile' passHref>
          <Text fontWeight={path === '/user/profile' ? 700 : 400}>{t('menu_left#profile')}</Text>
        </NextLink>
      )}
      <NextLink href='/protected' passHref>
        <Text fontWeight={path === '/protected' ? 700 : 400}>{t('menu_left#private')}</Text>
      </NextLink>
      <NextLink href='/protectedEmail' passHref>
        <Text fontWeight={path === '/protectedEmail' ? 700 : 400}>{t('menu_left#private_email')}</Text>
      </NextLink>
      <NextLink href='/protectedTwoFa' passHref>
        <Text fontWeight={path === '/protectedTwoFa' ? 700 : 400}>{t('menu_left#private_2fa')}</Text>
      </NextLink>
      <NextLink href='/admin/dashboard' passHref>
        <Text fontWeight={path === '/admin/dashboard' ? 700 : 400}>{t('menu_left#admin_menu')}</Text>
      </NextLink>
    </Stack>
  )
}

export default LeftMenu
