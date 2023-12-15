import queryString from 'query-string'
import { DOMAIN, LOGIN_PROVIDERS, FACEBOOK_CLIENT_ID, GOOGLE_CLIENT_ID, LINKEDIN_CLIENT_ID } from 'config/consts'

const FACEBOOK_REDIRECT_URI_LOCAL = 'http://localhost:4000/auth/oauthCallback/facebook'
const FACEBOOK_REDIRECT_URI_PROD = `https://${DOMAIN}/auth/oauthCallback/facebook`

const GOOGLE_REDIRECT_URI_LOCAL = 'http://localhost:4000/auth/oauthCallback/google'
const GOOGLE_REDIRECT_URI_PROD = `https://${DOMAIN}/auth/oauthCallback/google`

const LINKEDIN_REDIRECT_URI_LOCAL = 'http://localhost:4000/auth/oauthCallback/linkedin'
const LINKEDIN_REDIRECT_URI_PROD = `https://${DOMAIN}/auth/oauthCallback/linkedin`

export const getOauthCode = (isRemember, provider) => {
  if (provider === LOGIN_PROVIDERS.FACEBOOK) {
    return getFacebookCode(isRemember)
  }
  if (provider === LOGIN_PROVIDERS.GOOGLE) {
    return getGoogleCode(isRemember)
  }
  if (provider === LOGIN_PROVIDERS.LINKEDIN) {
    return getLinkedInCode(isRemember)
  }
}

const getFacebookCode = (isRemember) => {
  const facebookUrl = 'https://www.facebook.com/v18.0/dialog/oauth'
  const facebookOption = queryString.stringify({
    client_id: FACEBOOK_CLIENT_ID,
    scope: 'openid email public_profile',
    redirect_uri: process.env.NODE_ENV === 'development' ? FACEBOOK_REDIRECT_URI_LOCAL : FACEBOOK_REDIRECT_URI_PROD,
    response_type: 'code',
    state: JSON.stringify({ isRemember }),
  })
  return `${facebookUrl}?${facebookOption}`
}

const getGoogleCode = (isRemember) => {
  const facebookUrl = 'https://accounts.google.com/o/oauth2/auth'
  const facebookOption = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    scope: 'openid email profile',
    access_type: 'offline',
    redirect_uri: process.env.NODE_ENV === 'development' ? GOOGLE_REDIRECT_URI_LOCAL : GOOGLE_REDIRECT_URI_PROD,
    response_type: 'code',
    state: JSON.stringify({ isRemember }),
  })
  return `${facebookUrl}?${facebookOption}`
}

const getLinkedInCode = (isRemember) => {
  const linkedInUrl = 'https://www.linkedin.com/oauth/v2/authorization'
  const linkedInOption = queryString.stringify({
    client_id: LINKEDIN_CLIENT_ID,
    scope: 'openid email profile',
    redirect_uri: process.env.NODE_ENV === 'development' ? LINKEDIN_REDIRECT_URI_LOCAL : LINKEDIN_REDIRECT_URI_PROD,
    response_type: 'code',
    state: JSON.stringify({ isRemember }),
  })
  return `${linkedInUrl}?${linkedInOption}`
}
