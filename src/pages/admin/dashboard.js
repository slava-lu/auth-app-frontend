import { useState } from 'react'
import { Flex, Text, CircularProgress } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { getAllUsers } from 'modules/admin'
import { USER_ROLES } from 'config/consts'
import Users from 'components/admin/users'
import Settings from 'components/admin/settings'
import UserDetailed from 'components/admin/userDetailed'
import WarningBlock from 'components/common/warningBlock'
import useTranslation from 'next-translate/useTranslation'
import Trans from 'next-translate/Trans'

const PAGE_SIZE = 40

const Admin = () => {
  const { t } = useTranslation('common')
  const {
    isLoggedIn,
    userInfo: { roles },
  } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const userRoles = roles?.join(', ')
  const [tabIndex, setTabIndex] = useState(0)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const { userDetailed, isError, error, isLoading } = useSelector((state) => state.admin)
  const isAdmin = roles?.includes(USER_ROLES.ADMIN_ROLE)
  const isSuperAdmin = roles?.includes(USER_ROLES.SUPER_ADMIN_ROLE)
  const has2FA = roles?.includes(USER_ROLES.TWO_FA_ROLE)
  const handleTabsChange = (index) => {
    setTabIndex(index)
  }
  const is2FARequired = error?.message?.includes(USER_ROLES.TWO_FA_ROLE)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    dispatch(getAllUsers({ pageSize: pageSize, currentPage: pageNumber, searchTerm }))
  }

  const handleUserSearch = ({ term }) => {
    setSearchTerm(term)
    setCurrentPage(1)
    dispatch(getAllUsers({ pageSize: pageSize, currentPage: 1, searchTerm: term }))
  }

  const handlePageSizeChange = ({ pageSize }) => {
    setPageSize(pageSize)
    dispatch(getAllUsers({ pageSize: pageSize, currentPage: 1, searchTerm }))
  }

  if (!isLoggedIn) {
    return <WarningBlock message={t('generic#not_auth_to_view')} />
  }

  if (isLoggedIn && !isAdmin) {
    return (
      <Flex direction='column' w='100%' mt='40px'>
        <Flex width='100%' direction='column'>
          <Text fontSize={{ base: '12px', md: '16px', xl: '20px' }}>
            <Trans
              i18nKey='common:profile#user_roles_text'
              components={[<Text key='0' as='span' fontWeight={500} />]}
              values={{ userRoles }}
            />
          </Text>

          <Text fontSize={{ base: '12px', md: '14px', xl: '18px' }}>
            {t('pages#enable_admin_role')}
            <Text as='span' borderBottom='1px solid grey'>
              <NextLink href='/user/profile' passHref>
                {t('pages#user_profile')}
              </NextLink>
            </Text>
          </Text>
        </Flex>
        <WarningBlock message={t('pages#roles_missing')} />
      </Flex>
    )
  }

  if (isLoading && !userDetailed.email) {
    return <CircularProgress isIndeterminate color='green.300' />
  }

  if (is2FARequired && !has2FA) {
    return (
      <Flex direction='column' w='100%' mt='40px'>
        <Flex width='100%' direction='column'>
          <Text fontSize={{ base: '12px', md: '16px', xl: '20px' }}>
            <Trans
              i18nKey='common:profile#user_roles_text'
              components={[<Text key='0' as='span' fontWeight={500} />]}
              values={{ userRoles }}
            />
          </Text>

          <Text fontSize={{ base: '12px', md: '14px', xl: '18px' }}>
            {t('pages#enable_2fa_admin')}
            <Text as='span' borderBottom='1px solid grey'>
              <NextLink href='/user/profile' passHref>
                {t('pages#user_profile')}
              </NextLink>
            </Text>
          </Text>
        </Flex>
        <WarningBlock message={t('pages#roles_missing')} />
      </Flex>
    )
  }

  if (isLoggedIn && isAdmin) {
    return (
      <Tabs w='100%' variant='enclosed' index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab>Users</Tab>
          <Tab>Settings</Tab>
          {userDetailed.email && <Tab>{userDetailed.email}</Tab>}
        </TabList>
        <TabPanels>
          <TabPanel>
            <Users
              setTabIndex={setTabIndex}
              pageSize={pageSize}
              searchTerm={searchTerm}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              handlePageSizeChange={handlePageSizeChange}
              handleUserSearch={handleUserSearch}
              isSuperAdmin={isSuperAdmin}
            />
          </TabPanel>
          <TabPanel>
            <Settings />
          </TabPanel>
          <TabPanel>
            <UserDetailed />
          </TabPanel>
        </TabPanels>
      </Tabs>
    )
  }
}

Admin.getInitialProps = async ({ store }) => {
  store.dispatch(getAllUsers({ pageSize: PAGE_SIZE, currentPage: 1, searchTerm: '' }))
  return {
    title: 'title#admin_page',
  }
}

export default Admin
