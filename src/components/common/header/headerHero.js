import { Text, Flex, Button, Box } from '@chakra-ui/react'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import me from '../images/me_nobg.png'
import Trans from 'next-translate/Trans'
import { GITHUB_URL, MEDIUM_ARTICLE } from 'config/consts'

const HeaderHero = () => {
  const { t } = useTranslation('common')

  return (
    <Flex h={{ base: '350px', sm: '500px' }} justifyContent='space-between' mt='20px'>
      <Flex direction='column' mr={{ base: '10px', sm: '40px', lg: '100px', xl: '120px' }}>
        <Text
          fontWeight={700}
          fontSize={{ base: '24px', md: '30px', lg: '50px' }}
          lineHeight={{ base: '40px', md: '52px', lg: '66px' }}
          mt={{ base: 0, sm: '30px', xl: '60px' }}>
          {t('index_page#hero_title')}
        </Text>
        <Text fontSize={{ base: '18px', md: '20px', lg: '24px' }} mt='30px'>
          <Trans i18nKey='common:index_page#hero_subtitle' components={[<Text key='0' as='span' fontWeight={700} />]} />
        </Text>
        <Flex
          maxW={480}
          justifyContent='space-between'
          mt={{ base: '20px', sm: '40px', xl: '60px' }}
          direction={{ base: 'column', lg: 'row' }}>
          <Button w={190} size='md' mb='20px' onClick={() => window.open(MEDIUM_ARTICLE, '_blank')}>
            {t('index_page#hero_blog_button')}
          </Button>
          <Button w={190} size='md' onClick={() => window.open(GITHUB_URL, '_blank')}>
            {t('index_page#hero_code_button')}
          </Button>
        </Flex>
      </Flex>
      {/*  <Flex flexShrink={0} display={{ base: 'none', sm: 'flex' }}>
        <Image src={me} alt='logo' />
      </Flex>*/}
    </Flex>
  )
}

export default HeaderHero
