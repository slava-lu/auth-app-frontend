import { useSelector, useDispatch } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import WarningBlock from 'components/common/warningBlock'
import InfoBlock from 'components/common/infoBlock'
import { getUserInfo } from 'modules/auth'
import { useEffect } from 'react'

const ProtectedEmail = () => {
  const {
    isLoggedIn,
    userInfo: { email, isEmailVerified },
  } = useSelector((state) => state.auth)
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserInfo())
  }, [])
  if (!isLoggedIn) {
    return <WarningBlock message={t('generic#not_auth_to_view')} />
  }
  if (isLoggedIn && !isEmailVerified) {
    return <WarningBlock message={t('pages#need_email_verify')} />
  }

  return <InfoBlock message={t('pages#logged_with_email', { email })} />
}

ProtectedEmail.getInitialProps = async ({ store }) => {
  return {
    title: 'title#protected_with_email_page',
  }
}

export default ProtectedEmail
