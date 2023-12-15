import { Flex, Spinner, Text } from '@chakra-ui/react'

const InfoBlock = ({ message, spinner }) => {
  return (
    <Flex w='100%' justify={{ base: 'center%', md: 'left' }} alignItems='center' h='200px'>
      <Flex w={{ base: '90%', md: '75%' }} h='80px' border='2px solid #38B2AC' alignItems='center' justify='center'>
        {spinner && <Spinner mr={6} thickness='2px' speed='0.65s' emptyColor='gray.200' color='teal.500' size='lg' />}
        <Text fontSize={{ base: '14px', md: '18px', xl: '22px' }}>{message}</Text>
      </Flex>
    </Flex>
  )
}

export default InfoBlock
