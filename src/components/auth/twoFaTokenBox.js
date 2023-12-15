import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, Text } from '@chakra-ui/react'
import { checkTwoFaToken } from 'modules/auth'
import { errorMessage } from 'utils/helpers'

const TwoFaTokenBox = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const {
    twoFaMeta: { twoFaCode, isRemember },
    isError,
    isLoading,
    error,
  } = useSelector((state) => state.auth)

  const onSubmit = (values) => {
    dispatch(checkTwoFaToken({ token: values.token, twoFaCode, isRemember }))
  }

  return (
    <Box py={{ base: '6', md: '8' }} px={{ base: '4', sm: '4' }}>
      <Stack spacing='8'>
        <Stack spacing='6'>
          <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
            <Heading size={{ base: 'xs', md: 'sm' }}>{t('login_modal#modal_title_signin')}</Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '6' }}
          px={{ base: '4', sm: '10' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing='6'>
              <Stack spacing='4'>
                <Stack>
                  <Text> {t('two_fa#code_verify_login_text')}</Text>
                  <FormControl isInvalid={errors.token}>
                    <FormLabel htmlFor='name'>{t('two_fa#token')}</FormLabel>
                    <Input
                      type='text'
                      {...register('token', {
                        required: t('login_modal#validation_required_field'),
                        pattern: {
                          value: /^[0-9]{6,6}$/,
                          message: 'you should enter 6 digits',
                        },
                      })}
                    />
                    <FormErrorMessage>{errors?.token?.message}</FormErrorMessage>
                  </FormControl>
                </Stack>
                <FormControl isInvalid={isError}>
                  <FormErrorMessage>{errorMessage(error, t)}</FormErrorMessage>
                </FormControl>
                <Button type='submit' isLoading={isLoading} size='md'>
                  {t('login_modal#signin')}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Box>
  )
}

export default TwoFaTokenBox
