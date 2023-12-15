import { Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { Link } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'
import Trans from 'next-translate/Trans'
import AllFeatures from 'components/home/allFeatures'
import signIn from './images/sign_in.png'
import topMenu from './images/top.png'
import leftMenu from './images/left_menu.png'
import userProfile from './images/userProfile.png'
import autoLogout from './images/auto_logout.png'
import admin from './images/admin.png'
import ExtraFeatures from 'components/workspace/extraFeatures'
import { GITHUB_URL, MEDIUM_ARTICLE } from 'config/consts'

const Workspace = () => {
  const { t } = useTranslation('common')

  return (
    <Flex w='100%' direction='column' mb='60px'>
      <Text
        align='center'
        fontWeight={700}
        mt='40px'
        mb='40px'
        fontSize={{ base: '24px', md: '32px', xl: '36px' }}
        lineHeight={{ base: '26px', md: '36px', xl: '40px' }}>
        {t('workspace_page#workspace_title')}
      </Text>
      <Text mb='20px' fontSize={{ base: '12px', md: '14px', xl: '16px' }}>
        {t('workspace_page#intro_text_1')}
      </Text>
      <Text mb='20px' fontSize={{ base: '12px', md: '14px', xl: '16px' }}>
        <Trans
          i18nKey='common:workspace_page#intro_text_2'
          components={[<Link fontWeight={700} color='teal.600' isExternal href={GITHUB_URL} key='0'></Link>]}
        />
      </Text>
      <Text mb='20px' fontSize={{ base: '12px', md: '14px', xl: '16px' }}>
        <Trans
          i18nKey='common:workspace_page#intro_text_3'
          components={[<Link fontWeight={700} color='teal.600' isExternal href={MEDIUM_ARTICLE} key='0'></Link>]}
        />
      </Text>
      <Flex w='100%' mb='80px'>
        <AllFeatures ordered />
      </Flex>
      <Flex direction={{ base: 'column', md: 'row' }} w='100%' justifyContent='space-around'>
        <Flex direction='column' alignContent='flex-start'>
          <Text mb='20px' fontWeight={500} fontSize='24px' align='center'>
            {t('workspace_page#sign_in_title')}
          </Text>
          <Image src={signIn} alt='signIn' width={360} />
        </Flex>
        <Flex direction='column'>
          <Text mb='20px' fontWeight={500} fontSize='24px' align='center'>
            {t('workspace_page#top_menu_title')}
          </Text>
          <Image src={topMenu} alt='topMenu' width={250} />
          <Text fontWeight={500} fontSize='24px' align='center'>
            {t('workspace_page#left_menu_title')}
          </Text>
          <Image src={leftMenu} alt='leftMenu' width={250} />
        </Flex>
      </Flex>

      <Flex direction={{ base: 'column', md: 'row' }} w='100%' justifyContent='space-around' mt='40px'>
        <Flex direction='column'>
          <Text mb='20px' fontWeight={500} fontSize='24px' align='center'>
            {t('workspace_page#profile_title')}
          </Text>
          <Image src={userProfile} alt='profile' width={450} />
        </Flex>
        <Flex direction='column' alignContent='flex-end'>
          <Text fontWeight={500} fontSize='24px' align='center'>
            {t('workspace_page#auto_logout_title')}
          </Text>
          <Image src={autoLogout} alt='logout' width={250} />
          <Flex />
        </Flex>
      </Flex>
      <Flex w='100%' justifyContent='center' mt='80px'>
        <Flex direction='column'>
          <Text mb='20px' fontWeight={500} fontSize='24px' align='center'>
            {t('workspace_page#admin_title')}
          </Text>
          <Image src={admin} alt='admin' width={900} />
        </Flex>
      </Flex>
      <Flex mt='60px' direction='column' w='100%'>
        <Text as='span' fontSize={{ base: '20px', lg: '26px' }} fontWeight={500} mb='20px' align='center'>
          {t('workspace_page#feature_list_title')}
        </Text>
        <ExtraFeatures />
      </Flex>
      <Flex mt='40px' direction='column' w='100%'>
        <Text as='span' fontSize={{ base: '20px', lg: '26px' }} fontWeight={500} mb='20px' align='center'>
          {t('workspace_page#flicence_title')}
        </Text>
        <Text mb='4px' fontSize={{ base: '12px', md: '14px', xl: '16px' }}>
          {t('workspace_page#flicence_text_1')}
        </Text>
        <Text fontSize={{ base: '12px', md: '14px', xl: '16px' }}>{t('workspace_page#flicence_text_2')}</Text>
      </Flex>
    </Flex>
  )
}

Workspace.getInitialProps = async () => {
  return {
    title: 'title#workspace_page',
  }
}

export default Workspace
