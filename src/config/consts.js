export const DOMAIN = 'authdemoapp.com'

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : `https://api.${DOMAIN}`
export const API_URL = `${BASE_URL}/api/v1/`

export const FACEBOOK_CLIENT_ID = '779037066698895'
export const GOOGLE_CLIENT_ID = '713169728870-9pm3jcqislgc0pp88b6ut1v5c2tf6sdm.apps.googleusercontent.com'
export const LINKEDIN_CLIENT_ID = '78lpqvwqchjoas'

export const NETWORK_TIMEOUT = 6000
export const MIN_PASSWORD_LENGTH = 8

export const CONTAINER_SIZE = 1250
export const HEADER_BG_COLOR = '#e0ecf0'
export const TEXT_COLOR = '#023A51'
export const WORKSPACE_ROUTE = '/workspace'

export const GITHUB_URL = 'https://github.com/slava-lu/auth-app-backend'
export const MEDIUM_ARTICLE = 'https://javascript.plainenglish.io/all-inclusive-and-bulletproof-authentication-with-node-js-and-express-js-a-hardcore-style-243f65f16542'

export const RESULT_CODES = {
  SUCCESS: 'success',
  ERROR: 'error',
  OTP_REQUIRED: 'otpRequired',
  PASSWORD_VALIDATION_REQUIRED: 'PASSWORD_VALIDATION_REQUIRED',
}
export const LOGIN_PROVIDERS = {
  LOCAL: 'local',
  FACEBOOK: 'facebook',
  GOOGLE: 'google',
  LINKEDIN: 'linkedin',
}

export const ERROR_CODES = {
  TOKEN_NOT_FOUND: 'TOKEN_NOT_FOUND',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  PASSWORD_CHANGE_REQUIRED: 'PASSWORD_CHANGE_REQUIRED',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  MOBILE_NOT_VERIFIED: 'MOBILE_NOT_VERIFIED',
  USER_BANNED: 'USER_BANNED',
  NEW_LOGIN_REQUIRED: 'NEW_LOGIN_REQUIRED',
  LOGIN_FAILED: 'LOGIN_FAILED',
  WRONG_CODE: 'WRONG_CODE',
  EMAIL_EXISTS: 'EMAIL_EXISTS',
  MOBILE_EXISTS: 'MOBILE_EXISTS',
  PASSWORD_RESET_LINK_INVALID: 'PASSWORD_RESET_LINK_INVALID',
  PASSWORD_RESET_LINK_EXPIRED: 'PASSWORD_RESET_LINK_EXPIRED',
  VERIFICATION_CODE_NOT_FOUND: 'VERIFICATION_CODE_NOT_FOUND',
  VERIFICATION_CODE_IS_NOT_CORRECT: 'VERIFICATION_CODE_IS_NOT_CORRECT',
  OLD_PASSWORD_IS_NOT_CORRECT: 'OLD_PASSWORD_IS_NOT_CORRECT',
  ACCOUNT_DEACTIVATED: 'ACCOUNT_DEACTIVATED',
  PASSWORD_CHECK_FAILED: 'PASSWORD_CHECK_FAILED',
  ACCOUNT_RESTORE_LINK_INVALID: 'ACCOUNT_RESTORE_LINK_INVALID',
}

export const USER_ROLES = {
  ADMIN_ROLE: 'admin',
  TWO_FA_ROLE: '2fa',
  IMPERSONATION_ROLE: 'impersonation',
  SUPER_ADMIN_ROLE: 'superadmin',
}
