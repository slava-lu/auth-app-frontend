import { Button, Flex, Box, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

const UserSearch = ({ handleUserSearch, searchTerm }) => {
  const { handleSubmit, register } = useForm()
  return (
    <form onSubmit={handleSubmit(handleUserSearch)}>
      <Flex>
        <Input width='250px' mr='16px' defaultValue={searchTerm} type='text' size='sm' {...register('term')} />
        <Button type='submit' colorScheme='teal' size='sm'>
          Search User
        </Button>
      </Flex>
    </form>
  )
}

export default UserSearch
