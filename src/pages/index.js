import { SimpleGrid, Box, Flex, Text } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import {
  AiOutlineStar,
  AiOutlineKey,
  AiOutlineFacebook,
  AiOutlinePhone,
  AiOutlineUser,
  AiOutlineUnlock,
} from 'react-icons/ai'
import FeatureCard from 'components/home/featureCard'
import AllFeatures from 'components/home/allFeatures'
import Image from 'next/image'
import security_small from '../components/common/images/security_small.jpg'

const Index = () => {
  const { t } = useTranslation('common')

  const jwtTitle = t('index_page#card_jwt_title')
  const oauthTitle = t('index_page#card_oauth_title')
  const twoFaTitle = t('index_page#card_2fa_title')
  const passwordTitle = t('index_page#card_password_title')
  const accountTitle = t('index_page#card_account_title')
  const advancedTitle = t('index_page#card_advanced_title')

  const jwtText = t('index_page#card_jwt_text')
  const oauthText = t('index_page#card_oauth_text')
  const twoFaText = t('index_page#card_2fa_text')
  const passwordText = t('index_page#card_password_text')
  const accountText = t('index_page#card_account_text')
  const advancedText = t('index_page#card_advanced_text')

  return (
    <Flex direction='column' alignItems={{ base: 'flexStart', lg: 'center' }} width='100%'>
      <Text mt={{ base: '40px', md: '80px' }} fontWeight={700} fontSize={{ base: '20px', md: '30px', lg: '44px' }}>
        {t('index_page#main_title')}
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={12} mt='40px' mb='40px' width='100%'>
        <FeatureCard icon={AiOutlineKey} title={jwtTitle} text={jwtText} />
        <FeatureCard icon={AiOutlineFacebook} title={oauthTitle} text={oauthText} />
        <FeatureCard icon={AiOutlinePhone} title={twoFaTitle} text={twoFaText} />
        <FeatureCard icon={AiOutlineUser} title={accountTitle} text={accountText} />
        <FeatureCard icon={AiOutlineUnlock} title={passwordTitle} text={passwordText} />
        <FeatureCard icon={AiOutlineStar} title={advancedTitle} text={advancedText} />
      </SimpleGrid>

      <Flex
        justifyContent='space-between'
        width='100%'
        mt='60px'
        mb='60px'
        alignItems={{ base: 'flexStart', lg: 'center' }}
        direction={{ base: 'column', lg: 'row' }}>
        <Flex borderRadius='12px' overflow='hidden' maxW={520} mb={{ base: '40px', lg: 0 }} mr='20px'>
          <Image src={security_small} alt='Security' w={520} />
        </Flex>
        <Flex direction='column' maxW={560}>
          <Text
            fontWeight={700}
            mb='20px'
            fontSize={{ base: '18px', md: '32px', xl: '40px' }}
            lineHeight={{ base: '22px', md: '36px', xl: '46px' }}>
            {t('index_page#security_section_title')}
          </Text>
          <Text fontSize={{ base: '16px', md: '18px', xl: '20px' }} mb='12px'>
            {t('index_page#security_section_text1')}
          </Text>
          <Text fontSize={{ base: '16px', md: '18px', xl: '20px' }}>{t('index_page#security_section_text2')}</Text>
        </Flex>
      </Flex>
      <Box w='100%' position='relative' bg='gray.100' zIndex='3' pt='20px'>
        <Box
          position='absolute'
          left='50%'
          width='100vw'
          transform='translateX(-50%)'
          bg='gray.100'
          height='100%'
          top={0}
          zIndex='-1'
        />
        <Text mt={{ base: '0px', md: '20px' }} fontWeight={700} fontSize='40px' align='center'>
          {t('index_page#all_features_title')}
        </Text>
        <Flex w='100%' mb='80px'>
          <AllFeatures />
        </Flex>
      </Box>
    </Flex>
  )
}

Index.getInitialProps = async ({ store }) => {
  return {
    title: 'title#index_page',
  }
}

export default Index
