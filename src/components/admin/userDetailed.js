import {
  Text,
  Heading,
  Flex,
  Divider,
  CircularProgress,
  CheckboxGroup,
  Stack,
  Checkbox,
  FormControl,
  Button,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import UserActions from './userActions'
import { useForm } from 'react-hook-form'
import useTranslation from 'next-translate/useTranslation'
import { assignRole } from 'modules/admin'

const UserDetailed = () => {
  const dispatch = useDispatch()
  const {
    userDetailed = {},
    isLoading,
    isLoadingBlockUser,
    isLoadingPasswordChange,
    isLoadingRelogin,
    isLoadingRoles,
  } = useSelector((state) => state.admin)
  const { roles: allRoles = [] } = useSelector((state) => state.system)

  const { t } = useTranslation('common')
  const {
    handleSubmit,
    register,
    reset,
    formState: { isDirty, errors },
  } = useForm()
  const formatDateToLocal = (date) => {
    const dateValue = new Date(date)
    return dateValue.toLocaleString()
  }

  const roleElements = allRoles.map((role) => {
    return (
      <Checkbox key={role.id} value={role.name} {...register(role.id.toString())}>
        {role.name}
      </Checkbox>
    )
  })
  const currentUserRoles = userDetailed.roles

  const onSubmit = (values) => {
    const { accountId } = userDetailed
    const rolesId = Object.keys(values)
      .filter((key) => values[key])
      .map(Number)
    dispatch(assignRole(accountId, rolesId))
    reset()
  }

  if (isLoading) {
    return <CircularProgress isIndeterminate color='green.300' />
  }
  return (
    <>
      {userDetailed.email && (
        <Flex direction='column'>
          <Heading size='xs' mb={6}>
            User Details
          </Heading>
          <Flex mb={6}>
            <Text fontWeight={500} mr={2}>
              First Name:
            </Text>
            <Text mr={8}>{userDetailed.firstName}</Text>
            <Text fontWeight={500} mr={2}>
              Last Name:
            </Text>
            <Text mr={8}>{userDetailed.lastName}</Text>
            <Text fontWeight={500} mr={2}>
              Email:
            </Text>
            <Text mr={8}>{userDetailed.email}</Text>
          </Flex>

          <Flex mb={6}>
            <Text fontWeight={500} mr={2}>
              Is Banned:
            </Text>
            <Text mr={8} color={userDetailed.isBanned ? 'red.600' : 'green.600'}>
              {userDetailed.isBanned ? 'Yes' : 'No'}
            </Text>
            <Text fontWeight={500} mr={2}>
              Password Change Required:
            </Text>
            <Text mr={8} color={userDetailed.passwordChangeRequired ? 'red.600' : 'green.600'}>
              {userDetailed.passwordChangeRequired ? 'Yes' : 'No'}
            </Text>
          </Flex>

          <Flex mb={6}>
            <Text fontWeight={500} mr={2}>
              Last Login At:
            </Text>
            <Text mr={8}>{formatDateToLocal(userDetailed.lastLoginAt)}</Text>
            <Text fontWeight={500} mr={2}>
              Last Login Provider:
            </Text>
            <Text mr={8}>{userDetailed.lastLoginProvider}</Text>
          </Flex>
          <Flex mb={6}>
            <Text fontWeight={500} mr={2}>
              Is Email Verified:
            </Text>
            <Text mr={8}>{userDetailed.isEmailVerified ? 'Yes' : 'No'}</Text>
            <Text fontWeight={500} mr={2}>
              Is 2 FA enabled:
            </Text>
            <Text mr={8}>{userDetailed.isTwoFaEnabled ? 'Yes' : 'No'}</Text>
          </Flex>
          <Divider my={2} mb={6} />
          <Flex mb={4}>
            <Text fontWeight={500} mr={2}>
              Current User Roles:
            </Text>
            <Text mr={8}>{currentUserRoles.length > 0 ? currentUserRoles.join(', ') : 'None'}</Text>
          </Flex>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <CheckboxGroup defaultValue={currentUserRoles}>
                <Stack direction='column' spacing='1'>
                  {roleElements}
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <Button type='submit' isDisabled={!isDirty} mt={4} isLoading={isLoadingRoles}>
              Change roles
            </Button>
          </form>
          <Divider my={4} mt={6} />
          <UserActions
            userDetailed={userDetailed}
            loading={{ isLoadingBlockUser, isLoadingPasswordChange, isLoadingRelogin }}
          />
        </Flex>
      )}
    </>
  )
}

export default UserDetailed
