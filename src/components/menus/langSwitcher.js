import { Menu, MenuButton, MenuItem, MenuList, Button, forwardRef } from '@chakra-ui/react'

import { useRouter } from 'next/router'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { useEffect } from 'react'

const langEnum = {
  en: 'EN',
  de: 'DE',
}

// max exp date for cookie
const setExpDate = () => {
  const date = new Date()
  const expireMs = 400 * 24 * 60 * 60 * 1000 // 400 days, max
  date.setTime(date.getTime() + expireMs)
  return date
}

const persistLocaleCookie = (locale) => {
  const date = setExpDate()
  document.cookie = `locale=${locale};expires=${date.toUTCString()};path=/`
}

const getCookie = (name) => {
  let cookies = document.cookie.split('; ')
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    let [cookieName, cookieValue] = cookie.split('=')
    if (cookieName === name) {
      return decodeURIComponent(cookieValue)
    }
  }
  return null
}

const StyledButton = forwardRef((props, ref) => <Button variant='ghost' ref={ref} {...props} />)

const LangSwitcher = ({ lang, t }) => {
  const router = useRouter()
  const { pathname, asPath, query } = router

  const changeLanguage = (locale) => {
    persistLocaleCookie(locale)
    if (lang !== locale) {
      router.push({ pathname, query }, asPath, { locale })
    }
  }

  useEffect(() => {
    // extend lifetime of the cookie as 400 days is the max
    const locale = getCookie('locale')
    if (locale) {
      const date = setExpDate()
      document.cookie = `locale=${locale};expires=${date.toUTCString()};path=/`
    }
  }, [])
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton isActive={isOpen} as={StyledButton} rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}>
            {langEnum[lang]}
          </MenuButton>
          <MenuList minWidth='80px'>
            <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
            <MenuItem onClick={() => changeLanguage('de')}>Deutsch</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  )
}

export default LangSwitcher
