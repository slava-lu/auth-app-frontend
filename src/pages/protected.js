import { useSelector, useDispatch } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import WarningBlock from 'components/common/warningBlock'
import InfoBlock from 'components/common/infoBlock'
import { useEffect } from 'react'
import { getUserInfo } from 'modules/auth'

const Protected = () => {
  const {
    isLoggedIn,
    userInfo: { email },
  } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { t } = useTranslation('common')

  useEffect(() => {
    dispatch(getUserInfo())
  }, [])

  if (!isLoggedIn) {
    return <WarningBlock message={t('generic#not_auth_to_view')} />
  }

  return <InfoBlock message={t('pages#logged_in', { email })} />
}

Protected.getInitialProps = async ({ store }) => {
  return {
    title: 'title#protected_page',
  }
}

export default Protected
