import { useSelector, useDispatch } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import Trans from 'next-translate/Trans'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { USER_ROLES } from 'config/consts'
import { getUserInfo, makeAdmin } from 'modules/auth'
import { useEffect } from 'react'

const ProfileLoginInfo = () => {
  const { t } = useTranslation('common')
  const {
    isMakeAdminLoading,
    userInfo: { impersonationMode, lastLoginAt, lastLoginProvider, roles = [] },
  } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const isAdmin = roles.includes(USER_ROLES.ADMIN_ROLE)

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  if (!lastLoginProvider) return null

  const loginDate = format(new Date(lastLoginAt), 'dd/MMM/yyyy')

  const loginTime = format(new Date(lastLoginAt), 'HH:mm')

  const userRoles = roles.join(', ')
  const onMakeAdmin = () => {
    dispatch(makeAdmin())
  }

  return (
    <Flex direction='column' mb='36px'>
      <Text fontStyle='oblique' mb='4px'>
        <Trans
          i18nKey='common:profile#last_login_text'
          components={[<Text key='0' as='span' fontWeight={500} />]}
          values={{ loginDate, loginTime, lastLoginProvider }}
        />
      </Text>
      <Text fontStyle='oblique'>
        {roles.length > 0 && (
          <Trans
            i18nKey='common:profile#user_roles_text'
            components={[<Text key='0' as='span' fontWeight={500} />]}
            values={{ userRoles }}
          />
        )}
        {roles.length === 0 && t('profile#user_has_no_roles')}
      </Text>
      {!impersonationMode && !isAdmin && (
        <Box mt={4}>
          <Text fontStyle='oblique' mb='6px'>
            {t('profile#make_admin_desciption')}
          </Text>
          <Button isLoading={isMakeAdminLoading} onClick={onMakeAdmin}>
            {t('profile#make_admin_button')}
          </Button>
        </Box>
      )}
    </Flex>
  )
}

export default ProfileLoginInfo
