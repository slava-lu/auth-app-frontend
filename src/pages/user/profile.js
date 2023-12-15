import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  Flex,
  Box,
  Button,
  Editable,
  LinkBox,
  LinkOverlay,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  FormControl,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useEditableControls,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { EditIcon, CheckIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { getUserProfile, updateUserProfile } from 'modules/user'
import useTranslation from 'next-translate/useTranslation'
import ErrorPage from 'components/common/ErrorPage'
import TwoFaActivation from 'components/auth/twoFaActivation'
import OauthLogoutSection from 'components/auth/oauthLogoutSection'
import { init2FaSetup, disable2Fa, triggerLogoutAll, triggerOauthLogout } from 'modules/auth'
import ProfileLoginInfo from 'components/user/profileLoginInfo'
import { LOGIN_PROVIDERS } from 'config/consts'

const validateURl = (url) => {
  if (!url) return true
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

const UserProfile = () => {
  const { profile, isLoading: isLoadingUser, isUpdated, pageError, error, isError } = useSelector(({ user }) => user)
  const {
    isTwoFaEnabled,
    isLoadingLogoutAll,
    isLoadingTwoFa,
    isLoggedIn,
    userInfo: { lastLoginProvider },
  } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const { t } = useTranslation('common')
  const toast = useToast()
  const {
    handleSubmit,
    register,
    reset,
    formState: { isDirty, errors },
  } = useForm()
  const [showLink, setShowLink] = useState(true)
  const [firstName, setFirstName] = useState(profile.firstName)
  const [lastName, setLastName] = useState(profile.lastName)
  const [linkedInUrl, setLinkedInUrl] = useState(profile.linkedInUrl)
  const [bio, setBio] = useState(profile.bio)
  const [gender, setGender] = useState(profile.gender)

  useEffect(() => {
    if (isUpdated || isError) {
      setFirstName(profile.firstName)
      setLastName(profile.lastName)
      setLinkedInUrl(profile.linkedInUrl)
      setBio(profile.bio)
      setGender(profile.gender)
      reset()
    }
  }, [isUpdated, isError])

  if (!isLoggedIn) return null

  function EditableControls() {
    const { isEditing, getEditButtonProps, getSubmitButtonProps } = useEditableControls()

    return !isEditing ? (
      <IconButton variant='link' size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
    ) : (
      <IconButton variant='link' size='sm' icon={<CheckIcon />} {...getSubmitButtonProps()} />
    )
  }

  const onSubmit = (values) => {
    let updatedValues = {}
    for (const key in values) {
      if (values[key] !== profile[key]) {
        updatedValues[key] = values[key]
      }
    }
    if (Object.keys(updatedValues).length !== 0) {
      dispatch(updateUserProfile(updatedValues))
      // to make them prestine
      // reset(values)
    } else {
      toast({
        title: 'No changes have been made',
        status: 'warning',
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  if (pageError) {
    return <ErrorPage message={error.message} />
  }

  return (
    <Flex direction='column' w={{ base: '100%', md: '500px' }}>
      <TwoFaActivation />
      <Text fontWeight='500' fontSize='1.5rem' mt='24px' mb='18px'>
        {t('profile#page_heading')}
      </Text>

      <Box mb='44px'>
        <ProfileLoginInfo />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction={{ base: 'column', md: 'row' }} justifyContent='space-between'>
            <Box mb={{ base: '24px', md: '40px' }} w={{ base: '100%', md: 300 }}>
              <FormControl isInvalid={errors.firstName}>
                <FormLabel htmlFor='firstName'>{t('login_modal#first_name_field')}</FormLabel>
                <Editable
                  defaultValue={profile.firstName}
                  maxW={300}
                  value={firstName || ''}
                  onChange={(val) => setFirstName(val)}>
                  <Flex justifyContent='space-between'>
                    <EditablePreview w='100%' />
                    <EditableInput
                      {...register('firstName', {
                        required: t('generic#validation_required_field'),
                      })}
                    />
                    <EditableControls />
                  </Flex>
                </Editable>
                <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
              </FormControl>
              <FormControl mt='24px' isInvalid={errors.lastName}>
                <FormLabel htmlFor='lastName'>{t('login_modal#last_name_field')}</FormLabel>
                <Editable
                  defaultValue={profile.lastName}
                  maxW={300}
                  value={lastName || ''}
                  onChange={(val) => setLastName(val)}>
                  <Flex justifyContent='space-between'>
                    <EditablePreview w='100%' />
                    <EditableInput
                      {...register('lastName', {
                        required: t('generic#validation_required_field'),
                      })}
                    />
                    <EditableControls />
                  </Flex>
                </Editable>
                <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel htmlFor='lastName'>{t('profile#gender')}</FormLabel>
                <RadioGroup
                  defaultValue={profile.gender || 'none'}
                  value={gender || 'none'}
                  onChange={(val) => setGender(val)}>
                  <Stack direction='column' spacing='1'>
                    <Radio value='male' {...register('gender')}>
                      {t('profile#gender_male')}
                    </Radio>
                    <Radio value='female' {...register('gender')}>
                      {t('profile#gender_female')}
                    </Radio>
                    <Radio value='none' {...register('gender')}>
                      {t('profile#gender_not_selected')}
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Box>
          </Flex>
          <FormControl mt='24px' isInvalid={errors.linkedInUrl}>
            <FormLabel htmlFor='linkedInUrl'>{t('profile#linkedIn')}</FormLabel>
            <Editable
              value={linkedInUrl || ''}
              isPreviewFocusable={false}
              onEdit={() => setShowLink(false)}
              onSubmit={() => setShowLink(true)}
              onChange={(val) => setLinkedInUrl(val)}>
              <Flex justifyContent='space-between'>
                {showLink && (
                  <LinkBox w='100%'>
                    {linkedInUrl && <LinkOverlay href={linkedInUrl} isExternal />}
                    <EditablePreview w='100%' />
                  </LinkBox>
                )}
                <EditableInput {...register('linkedInUrl', { validate: (v) => validateURl(v) })} />
                <EditableControls />
              </Flex>
            </Editable>
            <FormErrorMessage>{errors?.linkedInUrl && t('form_validation#url_invalid')}</FormErrorMessage>
          </FormControl>
          <FormControl mt='24px'>
            <FormLabel htmlFor='Bio'>{t('profile#bio')}</FormLabel>
            <Editable defaultValue={profile.bio} value={bio || ''} onChange={(val) => setBio(val)}>
              <Flex justifyContent='space-between'>
                <EditablePreview w='100%' />
                <EditableTextarea {...register('bio')} />
                <EditableControls />
              </Flex>
            </Editable>
          </FormControl>
          <Button
            variant='primary'
            rightIcon={isUpdated ? <CheckIcon /> : <ArrowForwardIcon />}
            type='submit'
            mt='44px'
            isLoading={isLoadingUser}
            isDisabled={!isDirty}>
            {t('profile#submit_button')}
          </Button>
        </form>
      </Box>

      <Flex direction='column'>
        <Text fontWeight='semibold' mb='8px'>
          {t('profile#2fa_title')}
        </Text>
        <Flex>
          <Text maxW='300px' mr='auto' pr='16px' mb='28px'>
            {t('profile#2fa_text')}
          </Text>
          {!isTwoFaEnabled && (
            <Button isLoading={isLoadingTwoFa} onClick={() => dispatch(init2FaSetup())}>
              {t('profile#2fa_enable')}
            </Button>
          )}
          {isTwoFaEnabled && (
            <Button isLoading={isLoadingTwoFa} onClick={() => dispatch(disable2Fa())}>
              {t('profile#2fa_disable')}
            </Button>
          )}
        </Flex>
        <Text fontWeight='semibold' mb='8px'>
          {t('profile#logout_all_title')}
        </Text>
        <Flex mb={6}>
          <Text maxW='300px' mr='auto' pr='16px'>
            {t('profile#logout_all_text')}
          </Text>
          <Button isLoading={isLoadingLogoutAll} onClick={() => dispatch(triggerLogoutAll())}>
            {t('profile#logout_all_button')}
          </Button>
        </Flex>
        {lastLoginProvider !== LOGIN_PROVIDERS.LOCAL && <OauthLogoutSection provider={lastLoginProvider} />}
      </Flex>
    </Flex>
  )
}

UserProfile.getInitialProps = async ({ store }) => {
  store.dispatch(getUserProfile())
  return {
    navigateAfterSaga: true,
    selector: (state) => state.user.isLoaded === true,
    title: 'title#profile_page',
  }
}

export default UserProfile
