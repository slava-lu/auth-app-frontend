import { Flex, Text, Box, Icon } from '@chakra-ui/react'

const FeatureCard = ({ icon, title, text }) => {
  const iconColor = 'teal.500'
  const iconSize = 8

  return (
    <Flex
      direction='column'
      padding='34px'
      w={350}
      h={250}
      border='1px solid rgba(0, 0, 0, 0.1)'
      borderRadius='8px'
      boxShadow='rgba(0, 0, 0, 0.05) 0px 2px 4px -1px'>
      <Box mb='2px'>
        <Icon as={icon} color={iconColor} boxSize={iconSize} />
      </Box>
      <Text mb='20px' fontSize='24px' fontWeight={700}>
        {title}
      </Text>
      <Text fontSize='18px'>{text}</Text>
    </Flex>
  )
}

export default FeatureCard
