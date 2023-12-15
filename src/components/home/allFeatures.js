import { Flex, Box, Text, List, ListItem, ListIcon } from '@chakra-ui/react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import useTranslation from 'next-translate/useTranslation'

const FeatureItem = ({ text, index, ordered }) => {
  if (!ordered) {
    return (
      <ListItem>
        <Flex alignItems='center'>
          <ListIcon as={AiOutlineCheckCircle} color='teal.500' boxSize={6} />
          <Text fontSize='18px' fontWeight={500}>
            {text}
          </Text>
        </Flex>
      </ListItem>
    )
  }
  if (ordered) {
    return (
      <ListItem mb={2}>
        <Box
          as='span'
          borderRadius='full'
          border='2px solid'
          borderColor='teal.500'
          width='24px'
          height='24px'
          display='inline-flex'
          alignItems='center'
          justifyContent='center'
          mr={2}>
          <Text fontSize='12px' fontWeight={700} color='teal.500'>
            {index}
          </Text>
        </Box>
        <Text as='span' fontSize='16px' fontWeight={500}>
          {text}
        </Text>
      </ListItem>
    )
  }
}

const AllFeatures = ({ ordered }) => {
  const { t } = useTranslation('common')

  return (
    <Flex mt='30px' justifyContent='space-between' w='100%' direction={{ base: 'column', lg: 'row' }}>
      <Box mb={{ base: '40px', lg: 0 }}>
        <Text mb='20px' fontWeight={500} fontSize={ordered ? '28px' : '34px'}>
          {t('index_page#all_features_subtitle_basic')}
        </Text>
        <List spacing={3}>
          <FeatureItem text={t('index_page#basic_feature_create_user')} ordered={ordered} index={1} />
          <FeatureItem text={t('index_page#basic_feature_local_login_email')} ordered={ordered} index={2} />
          <FeatureItem text={t('index_page#basic_feature_remeber_me')} ordered={ordered} index={3} />
          <FeatureItem text={t('index_page#basic_feature_logout')} ordered={ordered} index={4} />
          <FeatureItem text={t('index_page#basic_feature_delete_user')} ordered={ordered} index={5} />
          <FeatureItem text={t('index_page#basic_feature_oauth')} ordered={ordered} index={6} />
          <FeatureItem text={t('index_page#basic_feature_email_verification')} ordered={ordered} index={7} />
          <FeatureItem text={t('index_page#basic_feature_email_rbac')} ordered={ordered} index={8} />
          <FeatureItem text={t('index_page#basic_feature_password_change')} ordered={ordered} index={9} />
          <FeatureItem text={t('index_page#basic_feature_password_reset')} ordered={ordered} index={10} />
          <FeatureItem text={t('index_page#basic_feature_request_password_change')} ordered={ordered} index={11} />
          <FeatureItem text={t('index_page#basic_feature_ban_user')} ordered={ordered} index={12} />
          <FeatureItem text={t('index_page#basic_feature_new_login')} ordered={ordered} index={13} />
        </List>
      </Box>
      <Box>
        <Text mb='20px' fontWeight={500} fontSize={ordered ? '28px' : '34px'}>
          {t('index_page#all_features_subtitle_advanced')}
        </Text>
        <List spacing={3}>
          <FeatureItem text={t('index_page#advanced_feature_restore_account')} ordered={ordered} index={1} />
          <FeatureItem text={t('index_page#advanced_feature_link_oauth')} ordered={ordered} index={2} />
          <FeatureItem text={t('index_page#advanced_feature_prevent_oauth')} ordered={ordered} index={3} />
          <FeatureItem text={t('index_page#advanced_feature_oauth_logout')} ordered={ordered} index={4} />
          <FeatureItem text={t('index_page#advanced_feature_2fa_oauth')} ordered={ordered} index={5} />
          <FeatureItem text={t('index_page#advanced_feature_prolong_jwt')} ordered={ordered} index={6} />
          <FeatureItem text={t('index_page#advanced_feature_auto_logout')} ordered={ordered} index={7} />
          <FeatureItem text={t('index_page#advanced_feature_rbac')} ordered={ordered} index={8} />
          <FeatureItem text={t('index_page#advanced_feature_one_login')} ordered={ordered} index={9} />
          <FeatureItem text={t('index_page#advanced_feature_logout_all')} ordered={ordered} index={10} />
          <FeatureItem text={t('index_page#advanced_feature_impersonation')} ordered={ordered} index={11} />
          <FeatureItem text={t('index_page#advanced_feature_require_password')} ordered={ordered} index={12} />
          <FeatureItem text={t('index_page#advanced_feature_cross_tab_auth')} ordered={ordered} index={13} />
        </List>
      </Box>
    </Flex>
  )
}

export default AllFeatures
