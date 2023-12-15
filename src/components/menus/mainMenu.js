import { Flex, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

const MainMenu = () => {
  const BORDER_COLOR = '#38B2AC'
  const border = `2px solid ${BORDER_COLOR}`
  const { t } = useTranslation('common')
  const router = useRouter()
  const isHome = router.pathname === '/'
  const isWorkspace = router.pathname === '/workspace'

  return (
    <Flex ml='60px' alignItems='center' mt='10px'>
      <Flex mr='30px' borderBottom={isHome && border} boxSizing='border-box' h='30px'>
        <NextLink href='/' passHref>
          <Text fontSize='16px' fontWeight={500}>
            {t('menu_top#home')}
          </Text>
        </NextLink>
      </Flex>
      <Flex borderBottom={isWorkspace && border} boxSizing='border-box' h='30px'>
        <NextLink href='/workspace' passHref>
          <Text fontSize='16px' fontWeight={500}>
            {t('menu_top#workspace')}
          </Text>
        </NextLink>
      </Flex>
    </Flex>
  )
}

export default MainMenu
