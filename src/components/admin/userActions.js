import { Button, ButtonGroup, Box, Text } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { blockUser, forceRelogin, forceChangePassword } from 'modules/admin'

const UserActions = ({ userDetailed, loading }) => {
  const dispatch = useDispatch()
  const { accountId, isBanned, passwordChangeRequired } = userDetailed
  const { isLoadingBlockUser, isLoadingPasswordChange, isLoadingRelogin } = loading

  const onBlockUser = () => {
    dispatch(blockUser(accountId, !isBanned))
  }
  const onForceChangePassword = () => {
    dispatch(forceChangePassword(accountId, !passwordChangeRequired))
  }
  const onForceRelogin = () => {
    dispatch(forceRelogin(accountId))
  }
  return (
    <Box>
      <ButtonGroup gap='12' mt={4}>
        <Button
          w={200}
          size='md'
          colorScheme={!isBanned ? 'red' : 'orange'}
          onClick={onBlockUser}
          isLoading={isLoadingBlockUser}>
          {!isBanned ? 'Block User' : 'Unblock User'}
        </Button>
        <Button w={250} size='md' onClick={onForceChangePassword} isLoading={isLoadingPasswordChange}>
          {!passwordChangeRequired ? 'Set Change Password' : 'Remove Change Password'}
        </Button>
        <Button w={220} size='md' onClick={onForceRelogin} isLoading={isLoadingRelogin}>
          Request New Login
        </Button>
      </ButtonGroup>
      <Text mt='20px' fontSize='16px'>
        <b>N.B.</b> If you block the user, you will not be able to perform most actions, and you will have to wait{' '}
        <b>up to 15 minutes </b>for the account to be automatically unblocked.
      </Text>
    </Box>
  )
}

export default UserActions
