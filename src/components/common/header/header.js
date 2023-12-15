import { Box, Container, Text, Flex } from '@chakra-ui/react'
import { HEADER_BG_COLOR, CONTAINER_SIZE } from 'config/consts'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useSelector } from 'react-redux'
import HeaderTop from './headerTop'
import HeaderHero from './headerHero'

const HeaderImpersonation = () => {
  const { t } = useTranslation('common')
  return (
    <Flex justifyContent='center' alignItems='center' bg='orange.300' h='32px'>
      <Text color='red.800' fontSize='md' as='b'>
        {t('menu#impersonation_warning')}
      </Text>
    </Flex>
  )
}

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const router = useRouter()
  const isHome = router.pathname === '/'
  return (
    <Box bgColor={HEADER_BG_COLOR}>
      {userInfo?.impersonationMode && <HeaderImpersonation />}
      <Container maxW={CONTAINER_SIZE}>
        <HeaderTop />
      </Container>
      {isHome && (
        <Container maxW={CONTAINER_SIZE}>
          <HeaderHero />
        </Container>
      )}
    </Box>
  )
}

export default Header
