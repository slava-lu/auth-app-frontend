import { Flex, Box, Text, List, ListItem } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'

const FeatureItem = ({ text, index }) => {
  return (
    <ListItem mb={2}>
      <Box
        as='span'
        borderRadius='full'
        border='2px solid'
        borderColor='red.500'
        bgColor='red.500'
        width='32px'
        height='32px'
        display='inline-flex'
        alignItems='center'
        justifyContent='center'
        mr={2}>
        <Text fontSize='12px' fontWeight={500} color='white'>
          {index}
        </Text>
      </Box>
      <Text as='span' fontSize={{ base: '14px', lg: '16px' }}>
        {text}
      </Text>
    </ListItem>
  )
}

const ExtraFeatures = ({ ordered }) => {
  const { t } = useTranslation('common')

  return (
    <Flex>
      <List spacing={3}>
        <FeatureItem text={t('workspace_page#feature_text_b7')} index='B7' />
        <FeatureItem text={t('workspace_page#feature_text_a1')} index='A1' />
        <FeatureItem text={t('workspace_page#feature_text_a2')} index='A2' />
        <FeatureItem text={t('workspace_page#feature_text_a3')} index='A3' />
        <FeatureItem text={t('workspace_page#feature_text_a6')} index='A6' />
        <FeatureItem text={t('workspace_page#feature_text_a9')} index='A9' />
        <FeatureItem text={t('workspace_page#feature_text_a12')} index='A12' />
        <FeatureItem text={t('workspace_page#feature_text_a13')} index='A13' />
      </List>
    </Flex>
  )
}

export default ExtraFeatures
