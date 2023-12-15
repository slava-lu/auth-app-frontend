import App from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import Head from 'next/head'
import { END } from 'redux-saga'
import { ChakraProvider } from '@chakra-ui/react'
import { wrapper } from 'redux/store'
import Layout from 'components/common/layout'
import 'focus-visible/dist/focus-visible'
import { axiosInstance } from '../utils/makeRequest'
import { getUserInfo, updateJwt } from 'modules/auth'
import { getSystemParams, getApiVersion } from 'modules/system'
import myTheme from 'theme'
import { Inter } from '@next/font/google'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { IntlProvider } from 'react-intl'
import GoogleAnalytics from 'components/common/googleAnalytics'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-balham.css'

require('axios-debug-log/enable')

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const ensureState = async (condition, store) => {
  const state = store.getState()
  if (condition(state)) {
    return state
  }
  return new Promise((resolve) => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState()
      if (condition(state)) {
        unsubscribe()
        resolve(state)
      }
    })
  })
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (context) => {
  const { ctx } = context

  if (ctx.req) {
    if (ctx.req.headers.cookie) {
      axiosInstance.defaults.headers.cookie = ctx.req.headers.cookie
      if (ctx.req?.cookies?.jwt) {
        store.dispatch(getUserInfo())
      }
    } else {
      delete axiosInstance.defaults.headers.cookie
    }
  }
  // 1. Wait for all page actions to dispatch
  const pageProps = {
    ...(await App.getInitialProps(context)).pageProps,
  }

  if (ctx.req) {
    //Stop the saga if on server
    store.dispatch(END)
    await store.sagaTask.toPromise()
    if (store.getState().auth?.isError) {
      // if something went wrong during SSR auth process, remove the jwt cookie to log out the user.
      ctx.res.setHeader('Set-Cookie', 'jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
    }
  }

  if (!ctx.req && pageProps.navigateAfterSaga && pageProps.selector) {
    // wait for data to be loaded before navigation on the client
    await ensureState(pageProps.selector, store)
  }

  // 3. Return props
  return {
    pageProps,
  }
})

function MyApp(props) {
  const { Component, pageProps } = props
  const { title } = pageProps
  const { isLoggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()
  const { locale } = router

  useEffect(() => {
    dispatch(getApiVersion())
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getSystemParams())
      dispatch(updateJwt())
    }
  }, [isLoggedIn])

  //console.log('theme', myTheme)
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-google-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
      <GoogleAnalytics />
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NextNProgress />
      <ChakraProvider theme={myTheme}>
        <IntlProvider locale={locale ?? 'default'} defaultLocale='default'>
          <Layout title={title}>
            <Component {...pageProps} />
          </Layout>
        </IntlProvider>
      </ChakraProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp)
