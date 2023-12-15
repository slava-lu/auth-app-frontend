import { useRef } from 'react'
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react'
import { deleteCurrentUser } from 'modules/auth'
import { useDispatch } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'

const DeleteAlert = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const cancelRef = useRef()
  const { t } = useTranslation('common')

  const handleAccountDelete = () => {
    dispatch(deleteCurrentUser())
  }
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {t('menu_alert#delete_account_title')}
          </AlertDialogHeader>

          <AlertDialogBody> {t('menu_alert#delete_account_body')}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {t('menu_alert#delete_account_action_cancel')}
            </Button>
            <Button colorScheme='red' onClick={handleAccountDelete} ml={3}>
              {t('menu_alert#delete_account_action_delete')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteAlert
