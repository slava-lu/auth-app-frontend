import { Alert, AlertIcon, AlertTitle, AlertDescription, Flex } from '@chakra-ui/react'
import useTranslation from 'next-translate/useTranslation'

// This is the Error component in case e.g. API response failed and the page can not be rendered properly
const ErrorPage = ({ message }) => {
  const { t } = useTranslation('common')

  return (
    <Flex w='100%' h='80px'>
      <Alert status='error' mt={4}>
        <AlertIcon />
        <AlertTitle mr={2}>{t('error#generic_title')}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Flex>
  )
}

export default ErrorPage
