import { Flex, Text } from '@chakra-ui/react'

const WarningBlock = ({ message }) => {
  return (
    <Flex w='100%' justify={{ base: 'center%', md: 'left' }} alignItems='center' h='200px'>
      <Flex w={{ base: '90%', md: '75%' }} h='80px' border='2px solid #ED8936' alignItems='center' justify='center'>
        <Text fontSize={{ base: '14px', md: '18px', xl: '22px' }}>{message}</Text>
      </Flex>
    </Flex>
  )
}

export default WarningBlock
