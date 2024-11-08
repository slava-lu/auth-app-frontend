import { useSelector } from 'react-redux'
import { Flex, Text, Container, Icon } from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { FaLinkedinIn } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import useTranslation from 'next-translate/useTranslation'
import packageJson from '../../../package.json'
import { CONTAINER_SIZE, GITHUB_URL } from 'config/consts'

const Link = styled(ChakraLink)`
  &:hover {
    text-decoration: none;
  }
`
const iconColor = 'whiteAlpha.800'
const iconSize = 5

const Footer = () => {
  const { t } = useTranslation('common')
  const { apiVersion } = useSelector((state) => state.system)

  return (
    <Flex shrink={0} bg='gray.700' minH={16} align='center' color='white'>
      <Container maxW={CONTAINER_SIZE}>
        <Flex w='100%' direction='column' paddingTop='24px' paddingBottom='12px'>
          <Flex direction={{ base: 'column', md: 'row' }} justify='center' mb='8px'>
            <Flex mr='34px' mb={{ base: '16px', md: 0 }}>
              <Icon as={AiOutlineMail} color={iconColor} boxSize={iconSize} mr='6px' />
              <Flex alignItems='center' borderBottom='1px solid' borderColor='gray.400'>
                <Link href='mailto:slavalu74@gmail.com'>{t('footer#contact_email')}</Link>
              </Flex>
            </Flex>
            <Flex mr='34px'>
              <Icon as={FaLinkedinIn} color={iconColor} boxSize={iconSize} mr='6px' />
              <Flex alignItems='center' borderBottom='1px solid' borderColor='gray.400'>
                <Link isExternal href='https://www.linkedin.com/in/slaval/'>
                  {t('footer#contact_linkedin')}
                </Link>
              </Flex>
            </Flex>
          </Flex>
          <Flex justify='center' paddingY='8px' direction={{ base: 'column', md: 'row' }}>
            <Text mr={4}>{t('footer#copyright')}</Text>
            <Text mr={4} display={{ base: 'none', md: 'inline' }}>
              |
            </Text>
            <Text mr={4} paddingTop={{ base: '16px', md: 0 }}>
              {t('footer#app_text')}
            </Text>
            <Text mr={4} display={{ base: 'none', md: 'inline' }}>
              |
            </Text>
            <Text mr={4} paddingTop={{ base: '16px', md: 0 }}  whiteSpace="nowrap" >
              {t('footer#ui_version')} : {packageJson.version}
            </Text>
            <Text mr={4} display={{ base: 'none', md: 'inline' }}>
              |
            </Text>
            <Text   mr={4} paddingY={{ base: '16px', md: 0 }}  whiteSpace="nowrap" >
              {t('footer#api_version')} : {apiVersion}
            </Text>
            <Text mr={4} display={{ base: 'none', md: 'inline' }}>
              |
            </Text>
            <Flex mr={4}>
              <Flex alignItems='center' borderBottom='1px solid' borderColor='gray.400'>
                <Link isExternal href='/privacyPolicy'>
                  {t('footer#privacy_policy')}
                </Link>
              </Flex>
            </Flex>
            <Text mr={4} display={{ base: 'none', md: 'inline' }}>
              |
            </Text>
            <Flex paddingY={{ base: '16px', md: 0 }}>
              <Flex alignItems='center' borderBottom='1px solid' borderColor='gray.400'>
                <Link isExternal href={`${GITHUB_URL}/issues`}>
                  {t('footer#report_bug')}
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  )
}

export default Footer
