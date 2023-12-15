import { Flex, Button, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { LOGIN_PROVIDERS } from 'config/consts'
import { triggerOauthLogout } from 'modules/auth'
import useTranslation from 'next-translate/useTranslation'

const OauthLogoutSection = ({ provider }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const {
    isLoadingLogoutOauth,
    oauthProfile: { user_id: userId },
  } = useSelector((state) => state.auth)

  const titles = {
    [LOGIN_PROVIDERS.FACEBOOK]: 'profile#logout_facebook_title',
    [LOGIN_PROVIDERS.GOOGLE]: 'profile#logout_google_title',
    [LOGIN_PROVIDERS.LINKEDIN]: 'profile#logout_linkedin_title',
  }

  const texts = {
    [LOGIN_PROVIDERS.FACEBOOK]: 'profile#logout_facebook_text',
    [LOGIN_PROVIDERS.GOOGLE]: 'profile#logout_google_text',
    [LOGIN_PROVIDERS.LINKEDIN]: 'profile#logout_linkedin_text',
  }

  const buttons = {
    [LOGIN_PROVIDERS.FACEBOOK]: 'profile#logout_facebook_button',
    [LOGIN_PROVIDERS.GOOGLE]: 'profile#logout_google_button',
    [LOGIN_PROVIDERS.LINKEDIN]: 'profile#logout_linkedin_button',
  }

  return (
    <>
      <Text fontWeight='semibold' mb='8px'>
        {t(titles[provider])}
      </Text>
      <Flex>
        <Text maxW='300px' mr='auto' pr='16px'>
          {t(texts[provider])}
        </Text>
        <Button isLoading={isLoadingLogoutOauth} onClick={() => dispatch(triggerOauthLogout(userId, provider))}>
          {t(buttons[provider])}
        </Button>
      </Flex>
    </>
  )
}

export default OauthLogoutSection
