import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { FormattedRelativeTime } from 'react-intl'
import { Flex, Text } from '@chakra-ui/react'
import { triggerLogout } from 'modules/auth'
import { useDispatch, useSelector } from 'react-redux'

const AutoLogout = () => {
  const { autoLogout } = useSelector((state) => state.system.config)
  const { timeout, warningTime } = autoLogout
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const [time, setTime] = useState(timeout)
  const logout = () => {
    dispatch(triggerLogout())
  }

  const { getRemainingTime } = useIdleTimer({
    stopOnIdle: true,
    timeout: timeout * 1000,
    onIdle: logout,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Math.ceil(getRemainingTime() / 1000))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  if (time > warningTime) return null

  return (
    <Flex
      position={'fixed'}
      left={0}
      bottom={0}
      width='300px'
      height='250px'
      direction='column'
      justifyContent='flex-end'
      alignItems='left'
      p={8}
      gap={2}
      paddingBottom='60px'
      boxShadow={`rgba(0, 0, 0, 0.60) 0px 0px 15px`}
      borderTopRightRadius={'100%'}
      bgColor={'orange.300'}>
      <Text fontWeight={'semibold'} fontSize={'xl'}>
        {t('login#auto_logout')}
      </Text>
      <Text fontWeight={'semibold'} fontSize={'xl'}>
        <FormattedRelativeTime value={time} numeric='auto' unit={'second'} />
      </Text>
    </Flex>
  )
}

export default AutoLogout
