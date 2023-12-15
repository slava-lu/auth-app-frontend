import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Flex,
  OrderedList,
  ListItem,
  Image,
  Text,
  Box,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { close2FaSetupModal, confirm2FaSetup } from 'modules/auth'
import useTranslation from 'next-translate/useTranslation'

const TwoFaActivation = (props) => {
  const { t } = useTranslation('common')
  const {
    isLoading,
    is2FaSetupModalOpen,
    twoFA: { secret, imageUrl },
  } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = (token) => {
    dispatch(confirm2FaSetup(token))
  }

  return (
    <Modal closeOnOverlayClick={false} isOpen={is2FaSetupModalOpen} onClose={() => dispatch(close2FaSetupModal())}>
      <ModalOverlay />
      <ModalContent p='14px'>
        <ModalHeader>{t('two_fa#modal_title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection='column'>
            <OrderedList mb='20px'>
              <ListItem>{t('two_fa#first_item_text')}</ListItem>
              <ListItem>
                {t('two_fa#second_item_text')} <b>{secret}</b>
              </ListItem>
            </OrderedList>
            <Flex justify='center' mb='12px'>
              <Image src={imageUrl} alt='QR code' />
            </Flex>
            <Flex flexDirection='column'>
              <Text fontWeight='semibold' mb='8px'>
                {t('two_fa#code_verify_title')}
              </Text>
              <Text> {t('two_fa#code_verify_text')}</Text>
              <Box mt='12px'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl isInvalid={errors.token}>
                    <Input
                      w='50%'
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
                  <Flex justifyContent='space-between' mt='18px'>
                    <Button type='submit' isLoading={isLoading}>
                      {t('profile#2fa_enable')}
                    </Button>
                    <Button variant='ghost' onClick={() => dispatch(close2FaSetupModal())}>
                      {t('generic#modal_close')}
                    </Button>
                  </Flex>
                </form>
              </Box>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default TwoFaActivation
