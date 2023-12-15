import { Box, Text, Heading, Flex, Divider } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const Settings = () => {
  const { oneLoginOnly, autoLogout, socialLoginNotAllowed, roleDependencies } = useSelector(
    (state) => state.system.config
  )
  const isTimeoutEnabled = autoLogout?.isEnabled
  const rolesWithDependencies = Object.keys(roleDependencies) || []

  const rolesSection = rolesWithDependencies.map((role, index) => {
    return (
      <Flex key={index}>
        <Text mr={2} fontWeight={500}>
          {role}
        </Text>
        <Text mr={2}>requires also the role(s): </Text>
        <Text fontWeight={500}>{roleDependencies[role].join(', ')}</Text>
      </Flex>
    )
  })

  return (
    <Box>
      <Heading size='xs' mb={6}>
        Site settings
      </Heading>
      <Flex direction='column'>
        <Text fontSize='lg' fontWeight={500} mb={2}>
          Auto logout
        </Text>
        <Flex>
          <Text mr={2}>Status: </Text>
          <Text mr={6} fontWeight={500} color={isTimeoutEnabled ? 'green.600' : 'red.600'}>
            {isTimeoutEnabled ? 'Enabled' : 'Disabled'}
          </Text>
          <Text mr={2}>Timeout, sec: </Text>
          <Text mr={6}>{autoLogout?.timeout}</Text>
          <Text mr={2}>Warning, sec: </Text>
          <Text mr={6}>{autoLogout?.warningTime}</Text>
        </Flex>
        <Divider my={6} />
        <Text fontSize='lg' fontWeight={500} mb={2}>
          One login only
        </Text>
        <Flex>
          <Text mr={2}>Status: </Text>
          <Text mr={6} fontWeight={500} color={oneLoginOnly ? 'green.600' : 'red.600'}>
            {oneLoginOnly ? 'Enabled' : 'Disabled'}
          </Text>
        </Flex>
        <Divider my={6} />
        <Text fontSize='lg' fontWeight={500} mb={2}>
          Groups, excluded from OAuth
        </Text>
        <Flex>
          <Text mr={2}>{socialLoginNotAllowed.join(', ')}</Text>
        </Flex>
        <Divider my={6} />
        <Text fontSize='lg' fontWeight={500} mb={2}>
          Role Dependencies
        </Text>
        <Flex direction='column'>
          <Text mr={2}>{rolesSection}</Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Settings
