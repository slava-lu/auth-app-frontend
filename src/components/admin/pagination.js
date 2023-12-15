import { Button, Flex, Box, Input } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useForm } from 'react-hook-form'

const Pagination = ({ currentPage, pageSize, handlePageChange, handlePageSizeChange, totalPages }) => {
  // Determine the range of pages to show
  const paginationRange = [...Array(totalPages).keys()].map((num) => num + 1)
  const { handleSubmit, register } = useForm()
  return (
    <Box>
      <Flex align='center' justify='center' m='16px'>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          leftIcon={<ChevronLeftIcon />}
          mr={2}>
          Prev
        </Button>
        {paginationRange.map((pageNumber) => (
          <Button
            key={pageNumber}
            colorScheme={pageNumber === currentPage ? 'gray' : 'teal'}
            isDisabled={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
            mx={1}>
            {pageNumber}
          </Button>
        ))}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          rightIcon={<ChevronRightIcon />}
          ml={2}>
          Next
        </Button>
      </Flex>
      <form onSubmit={handleSubmit(handlePageSizeChange)}>
        <Flex>
          <Input width='80px' mr='16px' type='number' defaultValue={pageSize} {...register('pageSize')} />
          <Button type='submit' colorScheme='teal' size='md'>
            Set Page size
          </Button>
        </Flex>
      </form>
    </Box>
  )
}

export default Pagination
