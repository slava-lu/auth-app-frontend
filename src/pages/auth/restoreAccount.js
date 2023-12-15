import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { restoreAccount } from 'modules/auth'
import WarningBlock from 'components/common/warningBlock'
import InfoBlock from 'components/common/infoBlock'
import { ERROR_CODES } from 'config/consts'

// This page is routed to by account restore link
export const RestoreAccount = () => {
  const { isAccountRestored, error } = useSelector((state) => state.auth)
  const { t } = useTranslation('common')

  const errorMessage = () => {
    if (error?.errorCode === ERROR_CODES.ACCOUNT_RESTORE_LINK_INVALID) {
      return t('auth#account_restore_link_invalid')
    }
    return t('auth#account_restore_failed')
  }

  return (
    <Box as='section' p={{ base: '4', md: '8' }} w='100%'>
      <Stack spacing='1' w='100%'>
        <Heading size={{ base: 'xs', md: 'sm' }} fontWeight='medium'>
          {t('auth#restore_accoun_title')}
        </Heading>
        <>
          {isAccountRestored && <InfoBlock message={t('auth#account_restored')} />}
          {!isAccountRestored && <WarningBlock message={errorMessage()} />}
        </>
      </Stack>
    </Box>
  )
}

RestoreAccount.getInitialProps = async ({ store, query }) => {
  store.dispatch(restoreAccount(query))
  return {
    title: 'title#restore_account_page',
  }
}

export default RestoreAccount
