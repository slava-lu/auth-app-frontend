import { ERROR_CODES } from 'config/consts'

export const errorMessage = (error, t) => {
  if (error?.errorCode === ERROR_CODES.LOGIN_FAILED) {
    return t('login_modal#wrong_username')
  }
  if (error?.errorCode === ERROR_CODES.ACCOUNT_DEACTIVATED) {
    return t('login_modal#account_deactivated')
  }
  if (error?.errorCode === ERROR_CODES.USER_BANNED) {
    return t('login_modal#user_banned')
  }
  if (error?.errorCode === ERROR_CODES.PASSWORD_CHANGE_REQUIRED) {
    return t('login_modal#password_change_required')
  }
  if (error?.errorCode === ERROR_CODES.EMAIL_EXISTS) {
    return t('login_modal#email_exists')
  }
  if (error?.errorCode === ERROR_CODES.WRONG_CODE) {
    return t('login_modal#wrong_code')
  }
  if (error?.errorCode === ERROR_CODES.TOKEN_NOT_FOUND) {
    return t('login_modal#token_not_found')
  }
  if (error?.errorCode === ERROR_CODES.NEW_LOGIN_REQUIRED) {
    return t('login_modal#new_login_required')
  }
  return t('generic#request_failed')
}

export const capitalizeWord = (word) => {
  if (word && typeof word === 'string') {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }
  return word
}
