import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from '@chakra-ui/react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'

export const PasswordField = React.forwardRef((props, ref) => {
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = React.useRef(null)
  const mergeRef = useMergeRefs(inputRef, ref)
  const { t } = useTranslation('common')
  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({
        preventScroll: true,
      })
    }
  }

  return (
    <FormControl isInvalid={props.error}>
      <FormLabel htmlFor='password'>{t(props.text || 'login_modal#password_field')}</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant='link'
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input id='password' ref={mergeRef} name='password' type={isOpen ? 'text' : 'password'} {...props} />
      </InputGroup>
      <FormErrorMessage>{props.error?.message}</FormErrorMessage>
    </FormControl>
  )
})

export default PasswordField
