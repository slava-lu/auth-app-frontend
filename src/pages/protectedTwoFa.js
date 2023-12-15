import { Flex, Text } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import Trans from 'next-translate/Trans'
import { USER_ROLES } from 'config/consts'
import NextLink from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import WarningBlock from 'components/common/warningBlock'
import InfoBlock from 'components/common/infoBlock'
import { getUserInfo } from 'modules/auth'
import { useEffect } from 'react'

const ProtectedWithTwoFa = () => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const {
    isLoggedIn,
    userInfo: { roles },
  } = useSelector((state) => state.auth)
  const userRoles = roles?.join(', ')
  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  if (!isLoggedIn) {
    return <WarningBlock message={t('generic#not_auth_to_view')} />
  }
  if (isLoggedIn && !roles?.includes(USER_ROLES.TWO_FA_ROLE)) {
    return (
      <Flex direction='column' w='100%' mt='40px'>
        <Flex width='100%' direction='column'>
          <Text fontSize={{ base: '12px', md: '16px', xl: '20px' }}>
            <Trans
              i18nKey='common:profile#user_roles_text'
              components={[<Text key='0' as='span' fontWeight={500} />]}
              values={{ userRoles }}
            />
          </Text>

          <Text fontSize={{ base: '12px', md: '14px', xl: '18px' }}>
            {t('pages#enable_2fa')}
            <Text as='span' borderBottom='1px solid grey'>
              <NextLink href='/user/profile' passHref>
                {t('pages#user_profile')}
              </NextLink>
            </Text>
          </Text>
        </Flex>
        <WarningBlock message={t('pages#roles_missing')} />
      </Flex>
    )
  }

  return (
    <Flex direction='column' w='100%' mt='40px'>
      <Flex width='100%'>
        <Text fontSize={{ base: '12px', md: '16px', xl: '20px' }}>
          <Trans
            i18nKey='common:profile#user_roles_text'
            components={[<Text key='0' as='span' fontWeight={500} />]}
            values={{ userRoles }}
          />
        </Text>
      </Flex>
      <InfoBlock message={t('generic#auth_to_view')} />
    </Flex>
  )
}

ProtectedWithTwoFa.getInitialProps = async ({ store }) => {
  return {
    title: 'title#protected_with_2fa_page',
  }
}

export default ProtectedWithTwoFa
