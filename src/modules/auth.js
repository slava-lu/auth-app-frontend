import { all, put, call, takeLatest } from 'redux-saga/effects'
import router from 'next/router'
import {
  authOauthApi,
  changePasswordWithCodeApi,
  checkPasswordResetLinkApi,
  confirmEmailApi,
  loginUserApi,
  logoutApi,
  loginAsApi,
  logoutAllApi,
  passwordResetApi,
  signupUserApi,
  changePasswordUserApi,
  getUserInfoApi,
  deleteUserApi,
  init2FaSetupApi,
  confirm2FaSetupApi,
  disable2Api,
  checkTwoFaTokenApi,
  restoreAccountApi,
  oauthLogoutApi,
  updateJwtApi,
} from 'api/auth'
import { UPDATE_USER_PROFILE_SUCCESS } from './user'
import {
  PASSWORD_VALIDATION_FAILURE,
  PASSWORD_VALIDATION_MODAL_CLOSE,
  PASSWORD_VALIDATION_MODAL_OPEN,
  RESET_ERROR_GLOBAL,
  SHOW_INFO_MESSAGE_GLOBAL,
} from './ui'
import { RESULT_CODES, WORKSPACE_ROUTE } from 'config/consts'
import { makeAdminApi } from 'api/auth'

const moduleName = 'auth'

const LOGIN_TRIGGER = `${moduleName}/LOGIN_TRIGGER`
const LOGIN_REQUEST = `${moduleName}/LOGIN_REQUEST`
const LOGIN_SUCCESS = `${moduleName}/LOGIN_SUCCESS`
const LOGIN_FAILURE = `${moduleName}/LOGIN_FAILURE`

const LOGIN_AS_TRIGGER = `${moduleName}/LOGIN_AS_TRIGGER`
const LOGIN_AS_REQUEST = `${moduleName}/LOGIN_AS_REQUEST`
const LOGIN_AS_SUCCESS = `${moduleName}/LOGIN_AS_SUCCESS`
const LOGIN_AS_FAILURE = `${moduleName}/LOGIN_AS_FAILURE`

const LOGOUT_TRIGGER = `${moduleName}/LOGOUT_TRIGGER`
const LOGOUT_REQUEST = `${moduleName}/LOGOUT_REQUEST`
const LOGOUT_SUCCESS = `${moduleName}/LOGOUT_SUCCESS`
const LOGOUT_FAILURE = `${moduleName}/LOGOUT_FAILURE`

const OAUTH_LOGOUT_TRIGGER = `${moduleName}/OAUTH_LOGOUT_TRIGGER`
const OAUTH_LOGOUT_REQUEST = `${moduleName}/OAUTH_LOGOUT_REQUEST`
const OAUTH_LOGOUT_SUCCESS = `${moduleName}/OAUTH_LOGOUT_SUCCESS`
const OAUTH_LOGOUT_FAILURE = `${moduleName}/OAUTH_LOGOUT_FAILURE`

const LOGOUT_ALL_TRIGGER = `${moduleName}/LOGOUT_ALL_TRIGGER`
const LOGOUT_ALL_REQUEST = `${moduleName}/LOGOUT_ALL_REQUEST`
const LOGOUT_ALL_SUCCESS = `${moduleName}/LOGOUT_ALL_SUCCESS`
const LOGOUT_ALL_FAILURE = `${moduleName}/LOGOUT_ALL_FAILURE`

const SIGNUP_TRIGGER = `${moduleName}/SIGNUP_TRIGGER`
const SIGNUP_REQUEST = `${moduleName}/SIGNUP_REQUEST`
const SIGNUP_SUCCESS = `${moduleName}/SIGNUP_SUCCESS`
const SIGNUP_FAILURE = `${moduleName}/SIGNUP_FAILURE`

export const GET_MAIN_INFO_TRIGGER = `${moduleName}/GET_MAIN_INFO_TRIGGER`
const GET_MAIN_INFO_REQUEST = `${moduleName}/GET_MAIN_INFO_REQUEST`
const GET_MAIN_INFO_SUCCESS = `${moduleName}/GET_MAIN_INFO_SUCCESS`
const GET_MAIN_INFO_FAILURE = `${moduleName}/GET_MAIN_INFO_FAILURE`

const PASSWORD_RESET_TRIGGER = `${moduleName}/PASSWORD_RESET_TRIGGER`
const PASSWORD_RESET_REQUEST = `${moduleName}/PASSWORD_RESET_REQUEST`
const PASSWORD_RESET_SUCCESS = `${moduleName}/PASSWORD_RESET_SUCCESS`
const PASSWORD_RESET_FAILURE = `${moduleName}/PASSWORD_RESET_FAILURE`

const CONFIRM_EMAIL_TRIGGER = `${moduleName}/CONFIRM_EMAIL_TRIGGER`
const CONFIRM_EMAIL_REQUEST = `${moduleName}/CONFIRM_EMAIL_REQUEST`
const CONFIRM_EMAIL_SUCCESS = `${moduleName}/CONFIRM_EMAIL_SUCCESS`
const CONFIRM_EMAIL_FAILURE = `${moduleName}/CONFIRM_EMAIL_FAILURE`

const RESTORE_ACCOUNT_TRIGGER = `${moduleName}/RESTORE_ACCOUNT_TRIGGER`
const RESTORE_ACCOUNT_REQUEST = `${moduleName}/RESTORE_ACCOUNT_REQUEST`
const RESTORE_ACCOUNT_SUCCESS = `${moduleName}/RESTORE_ACCOUNT_SUCCESS`
const RESTORE_ACCOUNT_FAILURE = `${moduleName}/RESTORE_ACCOUNT_FAILURE`

const CHECK_PASSWORD_RESET_LINK_TRIGGER = `${moduleName}/CHECK_PASSWORD_RESET_LINK_TRIGGER`
const CHECK_PASSWORD_RESET_LINK_REQUEST = `${moduleName}/CHECK_PASSWORD_RESET_LINK_REQUEST`
const CHECK_PASSWORD_RESET_LINK_SUCCESS = `${moduleName}/CHECK_PASSWORD_RESET_LINK_SUCCESS`
const CHECK_PASSWORD_RESET_LINK_FAILURE = `${moduleName}/CHECK_PASSWORD_RESET_LINK_FAILURE`

const CHANGE_PASSWORD_WITH_CODE_TRIGGER = `${moduleName}/CHANGE_PASSWORD_WITH_CODE_TRIGGER`
const CHANGE_PASSWORD_WITH_CODE_REQUEST = `${moduleName}/CHANGE_PASSWORD_WITH_CODE_REQUEST`
const CHANGE_PASSWORD_WITH_CODE_SUCCESS = `${moduleName}/CHANGE_PASSWORD_WITH_CODE_SUCCESS`
const CHANGE_PASSWORD_WITH_CODE_FAILURE = `${moduleName}/CHANGE_PASSWORD_WITH_CODE_FAILURE`

const CHANGE_PASSWORD_USER_TRIGGER = `${moduleName}/CHANGE_PASSWORD_USER_TRIGGER`
const CHANGE_PASSWORD_USER_REQUEST = `${moduleName}/CHANGE_PASSWORD_USER_REQUEST`
const CHANGE_PASSWORD_USER_SUCCESS = `${moduleName}/CHANGE_PASSWORD_USER_SUCCESS`
const CHANGE_PASSWORD_USER_FAILURE = `${moduleName}/CHANGE_PASSWORD_USER_FAILURE`

const AUTH_ID_TOKEN_TRIGGER = `${moduleName}/AUTH_ID_TOKEN_TRIGGER`
const AUTH_ID_TOKEN_REQUEST = `${moduleName}/AUTH_ID_TOKEN_REQUEST`
const AUTH_ID_TOKEN_SUCCESS = `${moduleName}/AUTH_ID_TOKEN_SUCCESS`
const AUTH_ID_TOKEN_FAILURE = `${moduleName}/AUTH_ID_TOKEN_FAILURE`

const DELETE_USER_TRIGGER = `${moduleName}/DELETE_USER_TRIGGER`
const DELETE_USER_REQUEST = `${moduleName}/DELETE_USER_REQUEST`
const DELETE_USER_SUCCESS = `${moduleName}/DELETE_USER_SUCCESS`
const DELETE_USER_FAILURE = `${moduleName}/DELETE_USER_FAILURE`

const INIT_2FA_SETUP_TRIGGER = `${moduleName}/INIT_2FA_SETUP_TRIGGER`
const INIT_2FA_SETUP_REQUEST = `${moduleName}/INIT_2FA_SETUP_REQUEST`
const INIT_2FA_SETUP_SUCCESS = `${moduleName}/INIT_2FA_SETUP_SUCCESS`
const INIT_2FA_SETUP_FAILURE = `${moduleName}/INIT_2FA_SETUP_FAILURE`

const CONFIRM_2FA_SETUP_TRIGGER = `${moduleName}/CONFIRM_2FA_SETUP_TRIGGER`
const CONFIRM_2FA_SETUP_REQUEST = `${moduleName}/CONFIRM_2FA_SETUP_REQUEST`
const CONFIRM_2FA_SETUP_SUCCESS = `${moduleName}/CONFIRM_2FA_SETUP_SUCCESS`
const CONFIRM_2FA_SETUP_FAILURE = `${moduleName}/CONFIRM_2FA_SETUP_FAILURE`

const DISABLE_2FA_TRIGGER = `${moduleName}/DISABLE_2FA_TRIGGER`
const DISABLE_2FA_REQUEST = `${moduleName}/DISABLE_2FA_REQUEST`
const DISABLE_2FA_SUCCESS = `${moduleName}/DISABLE_2FA_SUCCESS`
const DISABLE_2FA_FAILURE = `${moduleName}/DISABLE_2FA_FAILURE`

const CHECK_2FA_TOKEN_TRIGGER = `${moduleName}/CHECK_2FA_TOKEN_TRIGGER`
const CHECK_2FA_TOKEN_REQUEST = `${moduleName}/CHECK_2FA_TOKEN_REQUEST`
const CHECK_2FA_TOKEN_SUCCESS = `${moduleName}/CHECK_2FA_TOKEN_SUCCESS`
const CHECK_2FA_TOKEN_FAILURE = `${moduleName}/CHECK_2FA_TOKEN_FAILURE`

const UPDATE_JWT_TRIGGER = `${moduleName}/UPDATE_JWT_TRIGGER`
const UPDATE_JWT_REQUEST = `${moduleName}/UPDATE_JWT_REQUEST`
const UPDATE_JWT_SUCCESS = `${moduleName}/UPDATE_JWT_SUCCESS`
const UPDATE_JWT_FAILURE = `${moduleName}/SIGNUP_FAILURE`

const NEED_2FA_TOKEN = `${moduleName}/NEED_2FA_TOKEN`
const OPEN_LOGIN_MODAL = `${moduleName}/OPEN_LOGIN_MODAL`
const OPEN_LOGIN_AS_MODAL = `${moduleName}/OPEN_LOGIN_AS_MODAL`
const OPEN_CHANGE_PASSWORD_MODAL = `${moduleName}/OPEN_CHANGE_PASSWORD_MODAL`
const CLOSE_LOGIN_MODAL = `${moduleName}/CLOSE_LOGIN_MODAL`
const CLOSE_LOGIN_AS_MODAL = `${moduleName}/CLOSE_LOGIN_AS_MODAL`
const CLOSE_2FA_SETUP_MODAL = `${moduleName}/CLOSE_2FA_SETUP_MODAL`
const CLOSE_PASSWORD_CHANGE_MODAL = `${moduleName}/CLOSE_PASSWORD_CHANGE_MODAL`
const SET_PASSWORD_RESET_MODE = `${moduleName}/SET_PASSWORD_RESET_MODE`
const RESET_ERROR = `${moduleName}/RESET_ERROR`
const SET_LOGIN_STATUS = `${moduleName}/SET_LOGIN_STATUS`

// for Demo ap only
const MAKE_ADMIN_TRIGGER = `${moduleName}/MAKE_ADMIN_TRIGGER`
const MAKE_ADMIN_REQUEST = `${moduleName}/MAKE_ADMIN_REQUEST`
const MAKE_ADMIN_SUCCESS = `${moduleName}/MAKE_ADMIN_SUCCESS`
const MAKE_ADMIN_FAILURE = `${moduleName}/MAKE_ADMIN_FAILURE`

export const loginBroadcastChannel = typeof window !== 'undefined' && new BroadcastChannel('oauth')
export const emailBroadcastChannel = typeof window !== 'undefined' && new BroadcastChannel('email')

const initialState = {
  result: {},
  twoFA: {},
  userInfo: {},
  oauthProfile: {},
  twoFaTokenRequired: false,
  twoFaMeta: { twoFaCode: false, isRemember: false },
  isLoginModalOpen: false,
  isLoginAsModalOpen: false,
  is2FaSetupModalOpen: false,
  isPasswordResetLinkSent: false,
  isPasswordResetLinkValid: false,
  isPasswordResetWithCodeOk: false,
  isPasswordChangeModalOpen: false,
  isAccountRestored: false,
  isEmailConfirmed: false,
  confirmedEmail: '',
  isLoggedIn: false,
  isTwoFaEnabled: false,
  isPasswordChanged: false,
  verified: false,
  isPasswordResetMode: false,
  isLoading: false,
  isLoadingLogoutAll: false,
  isLoadingLogoutOauth: false,
  isLoadingTwoFa: false,
  isMakeAdminLoading: false,
  isError: false,
  error: false,
}

// for Demo ap only
export const makeAdmin = () => ({
  type: MAKE_ADMIN_TRIGGER,
})

export const updateJwt = () => ({
  type: UPDATE_JWT_TRIGGER,
})

export const resetError = () => ({
  type: RESET_ERROR,
})

export const getUserInfo = () => ({
  type: GET_MAIN_INFO_TRIGGER,
})

export const checkPasswordResetLink = (query) => ({
  type: CHECK_PASSWORD_RESET_LINK_TRIGGER,
  payload: query,
})

export const getOauthIdToken = (code, isRemember, provider) => ({
  type: AUTH_ID_TOKEN_TRIGGER,
  payload: { code, isRemember, provider },
})

export const changePasswordWithCode = (values) => ({
  type: CHANGE_PASSWORD_WITH_CODE_TRIGGER,
  payload: values,
})

export const changePassword = (values) => ({
  type: CHANGE_PASSWORD_USER_TRIGGER,
  payload: values,
})

export const confirmEmail = (query) => ({
  type: CONFIRM_EMAIL_TRIGGER,
  payload: query,
})

export const restoreAccount = (query) => ({
  type: RESTORE_ACCOUNT_TRIGGER,
  payload: query,
})

export const triggerSignUp = (values) => ({
  type: SIGNUP_TRIGGER,
  payload: values,
})

export const triggerLogin = (values) => ({
  type: LOGIN_TRIGGER,
  payload: values,
})

export const triggerLoginAs = (values) => ({
  type: LOGIN_AS_TRIGGER,
  payload: values,
})

export const deleteCurrentUser = () => ({
  type: DELETE_USER_TRIGGER,
})

export const triggerLogout = () => ({
  type: LOGOUT_TRIGGER,
})

export const triggerOauthLogout = (userId, provider) => ({
  type: OAUTH_LOGOUT_TRIGGER,
  payload: { userId, provider },
})

export const triggerLogoutAll = () => ({
  type: LOGOUT_ALL_TRIGGER,
})

export const triggerPasswordReset = (values) => ({
  type: PASSWORD_RESET_TRIGGER,
  payload: values,
})

export const setLoginStatus = (status) => ({
  type: SET_LOGIN_STATUS,
  result: status,
})

export const setTwoFaStatus = (payload) => ({
  type: NEED_2FA_TOKEN,
  result: payload,
})

export const checkTwoFaToken = (payload) => ({
  type: CHECK_2FA_TOKEN_TRIGGER,
  payload,
})

export const openLoginModal = () => ({
  type: OPEN_LOGIN_MODAL,
})

export const openLoginAsModal = () => ({
  type: OPEN_LOGIN_AS_MODAL,
})

export const openChangePasswordModal = () => ({
  type: OPEN_CHANGE_PASSWORD_MODAL,
})

export const closeLoginModal = () => ({
  type: CLOSE_LOGIN_MODAL,
})
export const closeLoginAsModal = () => ({
  type: CLOSE_LOGIN_AS_MODAL,
})
export const disable2Fa = () => ({
  type: DISABLE_2FA_TRIGGER,
})

export const init2FaSetup = () => ({
  type: INIT_2FA_SETUP_TRIGGER,
})

export const confirm2FaSetup = (token) => ({
  type: CONFIRM_2FA_SETUP_TRIGGER,
  payload: token,
})

export const close2FaSetupModal = () => ({
  type: CLOSE_2FA_SETUP_MODAL,
})

export const closePasswordChangeModal = () => ({
  type: CLOSE_PASSWORD_CHANGE_MODAL,
})

export const setPasswordResetMode = () => ({
  type: SET_PASSWORD_RESET_MODE,
})

export const authReducer = (state = initialState, { type, result = {}, error = false }) => {
  switch (type) {
    case RESET_ERROR_GLOBAL:
      return { ...state, isError: false, error: false }

    case RESET_ERROR:
      return { ...state, isError: false, isPasswordResetLinkSent: false, twoFaTokenRequired: false }

    case SET_LOGIN_STATUS:
      return { ...state, isLoggedIn: result }

    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        isPasswordResetMode: false,
        isPasswordResetLinkSent: false,
        isError: false,
        isLoginModalOpen: true,
        twoFaTokenRequired: false,
      }

    case OPEN_LOGIN_AS_MODAL:
      return {
        ...state,
        isPasswordResetMode: false,
        isPasswordResetLinkSent: false,
        isError: false,
        isLoginAsModalOpen: true,
      }

    case OPEN_CHANGE_PASSWORD_MODAL:
      return { ...state, isPasswordChangeModalOpen: true, isError: false, error: false }

    case CLOSE_LOGIN_MODAL:
      return { ...state, isLoginModalOpen: false, isError: false, error: false }

    case CLOSE_LOGIN_AS_MODAL:
      return { ...state, isLoginAsModalOpen: false, isError: false, error: false }

    case CLOSE_2FA_SETUP_MODAL:
      return { ...state, is2FaSetupModalOpen: false, isError: false, error: false }

    case CLOSE_PASSWORD_CHANGE_MODAL:
      return { ...state, isPasswordChangeModalOpen: false, isError: false, error: false }

    case SET_PASSWORD_RESET_MODE:
      return { ...state, isPasswordResetMode: true, isError: false }

    case LOGOUT_REQUEST:
      return { ...state, isLoading: true, isError: false }

    case LOGOUT_ALL_REQUEST:
      return { ...state, isLoadingLogoutAll: true, isError: false }

    case OAUTH_LOGOUT_REQUEST:
      return { ...state, isLoadingLogoutOauth: true, isError: false }

    case LOGOUT_SUCCESS:
    case LOGOUT_ALL_SUCCESS:
    case OAUTH_LOGOUT_SUCCESS:
      return { ...initialState }

    case LOGOUT_FAILURE:
      return { ...state, isLoading: false, error, isError: true }

    case LOGOUT_ALL_FAILURE:
      return { ...state, isLoadingLogoutAll: false, error, isError: true }

    case OAUTH_LOGOUT_FAILURE:
      return { ...state, isLoadingLogoutOauth: false, error, isError: true }

    case CHANGE_PASSWORD_USER_REQUEST:
      return { ...state, isLoading: true, isError: false, isPasswordChanged: false }

    case CHANGE_PASSWORD_USER_SUCCESS:
      return { ...state, isLoading: false, isError: false, isPasswordChanged: true }

    case CHANGE_PASSWORD_USER_FAILURE:
      return { ...state, isLoading: false, isError: true, error }

    case DELETE_USER_FAILURE:
      return { ...state, isLoading: false, isError: true, error }

    case AUTH_ID_TOKEN_REQUEST:
      return { ...state, isLoading: true, isError: false, isLoggedIn: false }

    case AUTH_ID_TOKEN_SUCCESS:
      return { ...state, isLoading: false, userInfo: result.userInfo, error: false, isLoggedIn: true }

    case AUTH_ID_TOKEN_FAILURE:
      return { ...state, isLoading: false, isError: true, error }

    case LOGIN_REQUEST:
    case LOGIN_AS_REQUEST:
    case CHECK_2FA_TOKEN_REQUEST:
      return { ...state, isLoading: true, isError: false }

    case NEED_2FA_TOKEN:
      return { ...state, isLoading: false, isError: false, twoFaTokenRequired: true, twoFaMeta: result }

    case LOGIN_SUCCESS:
    case CHECK_2FA_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: result.userInfo,
        isTwoFaEnabled: result?.userInfo?.isTwoFaEnabled,
        error: false,
        isLoggedIn: true,
        twoFaTokenRequired: false,
      }

    case LOGIN_AS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userInfo: result.userInfo,
        error: false,
      }

    case LOGIN_FAILURE:
    case LOGIN_AS_FAILURE:
    case CHECK_2FA_TOKEN_FAILURE:
      return { ...state, isLoading: false, isError: true, error }

    case SIGNUP_REQUEST:
      return { ...state, signUpDone: false, isLoading: true, isError: false }

    case SIGNUP_SUCCESS:
      return { ...state, signUpDone: true, isLoading: false, userInfo: result.userInfo, error: false, isLoggedIn: true }

    case SIGNUP_FAILURE:
      return { ...state, isLoading: false, isError: true, error }

    case GET_MAIN_INFO_REQUEST:
      return { ...state, isLoading: true, isError: false }

    case GET_MAIN_INFO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        ...result,
        isTwoFaEnabled: result?.userInfo?.isTwoFaEnabled,
      }

    case GET_MAIN_INFO_FAILURE:
      return { ...state, isLoading: false, isError: true, error }

    case CONFIRM_EMAIL_SUCCESS:
      return { ...state, isEmailConfirmed: true, confirmedEmail: result.email, isError: false, error: false }

    case CONFIRM_EMAIL_FAILURE:
      return { ...state, isEmailConfirmed: false, isError: true, error }

    case RESTORE_ACCOUNT_SUCCESS:
      return { ...state, isAccountRestored: true, isError: false, error: false }

    case RESTORE_ACCOUNT_FAILURE:
      return { ...state, isError: true, error }

    case CHECK_PASSWORD_RESET_LINK_SUCCESS:
      return { ...state, isEmailConfirmed: true, isError: false, error: false, isPasswordResetLinkValid: true }

    case CHECK_PASSWORD_RESET_LINK_FAILURE:
      return { ...state, isEmailConfirmed: false, isError: true, error, isPasswordResetLinkValid: false }

    case PASSWORD_RESET_REQUEST:
      return { ...state, isLoading: true, isError: false, isPasswordResetLinkSent: false, error: false }

    case PASSWORD_RESET_SUCCESS:
      return { ...state, isLoading: false, isPasswordResetLinkSent: true }

    case PASSWORD_RESET_FAILURE:
      return { ...state, isLoading: false, error, isError: true }

    case CHANGE_PASSWORD_WITH_CODE_REQUEST:
      return { ...state, isLoading: true, isError: false, isPasswordResetWithCodeOk: false, error: false }

    case CHANGE_PASSWORD_WITH_CODE_SUCCESS:
      return { ...state, isLoading: false, isPasswordResetWithCodeOk: true }

    case CHANGE_PASSWORD_WITH_CODE_FAILURE:
      return { ...state, isLoading: false, error, isError: true }

    case INIT_2FA_SETUP_REQUEST:
      return { ...state, isLoadingTwoFa: true, isError: false, error: false, twoFA: {} }

    case INIT_2FA_SETUP_SUCCESS:
      return { ...state, isLoadingTwoFa: false, twoFA: result, is2FaSetupModalOpen: true }

    case INIT_2FA_SETUP_FAILURE:
      return { ...state, isLoadingTwoFa: false, error, isError: true }

    case CONFIRM_2FA_SETUP_REQUEST:
      return { ...state, isLoading: true, isError: false, error: false }

    case CONFIRM_2FA_SETUP_SUCCESS:
      return {
        ...state,
        isLoadingTwoFa: false,
        isLoading: false,
        is2FaSetupModalOpen: false,
        userInfo: result.userInfo,
        isTwoFaEnabled: result?.userInfo?.isTwoFaEnabled,
        twoFA: {},
      }

    case CONFIRM_2FA_SETUP_FAILURE:
      return { ...state, isLoading: false, error, isError: true }

    case DISABLE_2FA_REQUEST:
      return { ...state, isLoadingTwoFa: true, isError: false, error: false }

    case DISABLE_2FA_SUCCESS:
      return { ...state, isLoadingTwoFa: false, isTwoFaEnabled: false, userInfo: result.userInfo }

    case DISABLE_2FA_FAILURE:
      return { ...state, isLoadingTwoFa: false, error, isError: true }

    case UPDATE_USER_PROFILE_SUCCESS:
      const userInfo = {}
      if (result.firstName) {
        userInfo.firstName = result.firstName
      }
      if (result.lastName) {
        userInfo.lastName = result.lastName
      }

      return { ...state, userInfo: { ...state.userInfo, ...userInfo } }

    case MAKE_ADMIN_REQUEST:
      return { ...state, isMakeAdminLoading: true, isError: false }

    case MAKE_ADMIN_SUCCESS:
      return { ...state, isMakeAdminLoading: false, userInfo: result.userInfo, error: false }

    case MAKE_ADMIN_FAILURE:
      return { ...state, isMakeAdminLoading: false, isError: true, error }

    default:
      return state
  }
}

const updateJwtSaga = function* () {
  yield put({ type: UPDATE_JWT_REQUEST })
  try {
    const { isOk, result, error } = yield call(updateJwtApi)
    if (isOk) {
      yield put({ type: UPDATE_JWT_SUCCESS, result })
    } else {
      yield put({ type: UPDATE_JWT_FAILURE, error })
      yield put({ type: SET_LOGIN_STATUS, result: false })
    }
  } catch (error) {
    yield put({ type: UPDATE_JWT_FAILURE, error })
    yield put({ type: SET_LOGIN_STATUS, result: false })
  }
}

const userInfoSaga = function* () {
  yield put({ type: GET_MAIN_INFO_REQUEST })
  try {
    const { isOk, result, error } = yield call(getUserInfoApi)
    if (isOk) {
      yield put({ type: GET_MAIN_INFO_SUCCESS, result })
    } else {
      yield put({ type: GET_MAIN_INFO_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: GET_MAIN_INFO_FAILURE, error })
  }
}

const signupSaga = function* ({ payload }) {
  yield put({ type: SIGNUP_REQUEST })
  try {
    const { isOk, result, error } = yield call(signupUserApi, payload)
    if (isOk) {
      yield put({ type: SIGNUP_SUCCESS, result })
      yield put({ type: CLOSE_LOGIN_MODAL })
      loginBroadcastChannel.postMessage('login')
      router.push(WORKSPACE_ROUTE)
    } else {
      yield put({ type: SIGNUP_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: SIGNUP_FAILURE, error })
  }
}

const loginSaga = function* ({ payload }) {
  yield put({ type: LOGIN_REQUEST })
  try {
    const { isOk, result, error } = yield call(loginUserApi, payload)
    const isTwoFaRequired = result?.resultCode === RESULT_CODES.OTP_REQUIRED
    if (isOk && isTwoFaRequired) {
      yield put({
        type: NEED_2FA_TOKEN,
        result: { twoFaCode: result.twoFaCode, isRemember: payload.isRemember },
      })
      return
    }
    if (isOk) {
      yield put({ type: LOGIN_SUCCESS, result })
      yield put({ type: CLOSE_LOGIN_MODAL })
      loginBroadcastChannel.postMessage('login')
    } else {
      yield put({ type: LOGIN_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, error })
  }
}

const loginAsSaga = function* ({ payload }) {
  yield put({ type: LOGIN_AS_REQUEST })
  try {
    const { isOk, result, error } = yield call(loginAsApi, payload)
    if (isOk) {
      if (result.resultCode === RESULT_CODES.PASSWORD_VALIDATION_REQUIRED) {
        result.passwordValidationActionName = LOGIN_AS_TRIGGER
        yield put({ type: PASSWORD_VALIDATION_MODAL_OPEN, result })
        return
      }
      yield put({ type: LOGIN_AS_SUCCESS, result })
      yield put({ type: CLOSE_LOGIN_AS_MODAL })
      yield put({ type: PASSWORD_VALIDATION_MODAL_CLOSE })
      location.reload()
    } else {
      yield put({ type: LOGIN_AS_FAILURE, error })
      yield put({ type: PASSWORD_VALIDATION_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: LOGIN_AS_FAILURE, error })
  }
}

const authIdTokenSaga = function* ({ payload }) {
  yield put({ type: AUTH_ID_TOKEN_REQUEST })
  try {
    const { isOk, result, error } = yield call(authOauthApi, payload)
    const isTwoFaRequired = result?.resultCode === RESULT_CODES.OTP_REQUIRED
    if (isOk && isTwoFaRequired) {
      yield put({
        type: NEED_2FA_TOKEN,
        result: { twoFaCode: result.twoFaCode, isRemember: payload.isRemember },
      })
      return
    }
    if (isOk) {
      yield put({ type: AUTH_ID_TOKEN_SUCCESS, result })
    } else {
      yield put({ type: AUTH_ID_TOKEN_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: AUTH_ID_TOKEN_FAILURE, error })
  }
}

const logoutSaga = function* () {
  yield put({ type: LOGOUT_REQUEST })
  try {
    const { isOk, error } = yield call(logoutApi)
    if (isOk) {
      yield put({ type: LOGOUT_SUCCESS })
      router.push('/')
      loginBroadcastChannel.postMessage('logout')
    } else {
      yield put({ type: LOGOUT_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: LOGOUT_FAILURE, error })
  }
}

const oauthLogoutSaga = function* ({ payload }) {
  yield put({ type: OAUTH_LOGOUT_REQUEST })
  try {
    const { userId, provider } = payload
    const { isOk, error } = yield call(oauthLogoutApi, userId, provider)
    if (isOk) {
      yield put({ type: OAUTH_LOGOUT_SUCCESS })
      router.push('/')
      loginBroadcastChannel.postMessage('logout')
    } else {
      yield put({ type: OAUTH_LOGOUT_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: OAUTH_LOGOUT_FAILURE, error })
  }
}

const logoutAllSaga = function* () {
  yield put({ type: LOGOUT_ALL_REQUEST })
  try {
    const { isOk, error } = yield call(logoutAllApi)
    if (isOk) {
      yield put({ type: LOGOUT_ALL_SUCCESS })
      router.push('/')
      loginBroadcastChannel.postMessage('logout')
    } else {
      yield put({ type: LOGOUT_ALL_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: LOGOUT_ALL_FAILURE, error })
  }
}

const deleteUserSaga = function* () {
  yield put({ type: DELETE_USER_REQUEST })
  try {
    const { isOk, error } = yield call(deleteUserApi)
    if (isOk) {
      yield put({ type: DELETE_USER_SUCCESS })
      yield* logoutSaga()
    } else {
      yield put({ type: DELETE_USER_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: DELETE_USER_FAILURE, error })
  }
}

const passwordResetRequestSaga = function* ({ payload }) {
  yield put({ type: PASSWORD_RESET_REQUEST })
  try {
    const { isOk, result, error } = yield call(passwordResetApi, payload)
    if (isOk) {
      yield put({ type: PASSWORD_RESET_SUCCESS })
    } else {
      yield put({ type: PASSWORD_RESET_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: PASSWORD_RESET_FAILURE, error })
  }
}

const confirmEmailSaga = function* ({ payload }) {
  yield put({ type: CONFIRM_EMAIL_REQUEST })
  try {
    const { isOk, result, error } = yield call(confirmEmailApi, payload)
    if (isOk) {
      yield put({ type: CONFIRM_EMAIL_SUCCESS, result })
    } else {
      yield put({ type: CONFIRM_EMAIL_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: CONFIRM_EMAIL_FAILURE, error })
  }
}

const restoreAccountSaga = function* ({ payload }) {
  yield put({ type: RESTORE_ACCOUNT_REQUEST })
  try {
    const { isOk, result, error } = yield call(restoreAccountApi, payload)
    if (isOk) {
      yield put({ type: RESTORE_ACCOUNT_SUCCESS, result })
    } else {
      yield put({ type: RESTORE_ACCOUNT_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: RESTORE_ACCOUNT_FAILURE, error })
  }
}

const checkPasswordResetLinkSaga = function* ({ payload }) {
  yield put({ type: CHECK_PASSWORD_RESET_LINK_REQUEST })
  try {
    const { isOk, result, error } = yield call(checkPasswordResetLinkApi, payload)

    if (isOk) {
      yield put({ type: CHECK_PASSWORD_RESET_LINK_SUCCESS, result })
    } else {
      yield put({ type: CHECK_PASSWORD_RESET_LINK_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: CHECK_PASSWORD_RESET_LINK_FAILURE, error })
  }
}

const changePasswordWithCodeSaga = function* ({ payload }) {
  yield put({ type: CHANGE_PASSWORD_WITH_CODE_REQUEST })
  try {
    const { isOk, result, error } = yield call(changePasswordWithCodeApi, payload)
    if (isOk) {
      yield put({ type: CHANGE_PASSWORD_WITH_CODE_SUCCESS })
    } else {
      yield put({ type: CHANGE_PASSWORD_WITH_CODE_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: CHANGE_PASSWORD_WITH_CODE_FAILURE, error })
  }
}

const changePasswordUserSaga = function* ({ payload }) {
  yield put({ type: CHANGE_PASSWORD_USER_REQUEST })
  try {
    const { isOk, result, error } = yield call(changePasswordUserApi, payload)
    if (isOk) {
      yield put({ type: CHANGE_PASSWORD_USER_SUCCESS, result })
    } else {
      yield put({ type: CHANGE_PASSWORD_USER_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: CHANGE_PASSWORD_USER_FAILURE, error })
  }
}

const init2FaSetupSaga = function* () {
  yield put({ type: INIT_2FA_SETUP_REQUEST })
  try {
    const { isOk, result, error } = yield call(init2FaSetupApi)
    if (isOk) {
      yield put({ type: INIT_2FA_SETUP_SUCCESS, result })
    } else {
      yield put({ type: INIT_2FA_SETUP_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: INIT_2FA_SETUP_FAILURE, error })
  }
}

const confirm2FaSetupSaga = function* ({ payload }) {
  yield put({ type: CONFIRM_2FA_SETUP_REQUEST })
  try {
    const { isOk, result, error } = yield call(confirm2FaSetupApi, payload)
    if (isOk) {
      yield put({ type: CONFIRM_2FA_SETUP_SUCCESS, result })
      yield put({ type: SHOW_INFO_MESSAGE_GLOBAL, payload: 'two_fa#enable_message' })
    } else {
      yield put({ type: CONFIRM_2FA_SETUP_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: CONFIRM_2FA_SETUP_FAILURE, error })
  }
}

const disable2FaSaga = function* () {
  yield put({ type: DISABLE_2FA_REQUEST })
  try {
    const { isOk, result, error } = yield call(disable2Api)
    if (isOk) {
      yield put({ type: DISABLE_2FA_SUCCESS, result })
      yield put({ type: SHOW_INFO_MESSAGE_GLOBAL, payload: 'two_fa#disable_message' })
    } else {
      yield put({ type: DISABLE_2FA_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: DISABLE_2FA_FAILURE, error })
  }
}

const checkTwoFaTokenSaga = function* ({ payload }) {
  yield put({ type: CHECK_2FA_TOKEN_REQUEST })
  try {
    const { isOk, result, error } = yield call(checkTwoFaTokenApi, payload)
    if (isOk) {
      yield put({ type: CHECK_2FA_TOKEN_SUCCESS, result })
      yield put({ type: CLOSE_LOGIN_MODAL })
      yield put({ type: GET_MAIN_INFO_TRIGGER })
      loginBroadcastChannel.postMessage('login')
    } else {
      yield put({ type: CHECK_2FA_TOKEN_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: CHECK_2FA_TOKEN_FAILURE, error })
  }
}

//  for Demo app only
const makeAdminSaga = function* () {
  yield put({ type: MAKE_ADMIN_REQUEST })
  try {
    const { isOk, result, error } = yield call(makeAdminApi)

    if (isOk) {
      yield put({ type: MAKE_ADMIN_SUCCESS, result })
    } else {
      yield put({ type: MAKE_ADMIN_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: MAKE_ADMIN_FAILURE, error })
  }
}

export const authSagas = function* () {
  yield all([
    takeLatest(LOGIN_TRIGGER, loginSaga),
    takeLatest(LOGIN_AS_TRIGGER, loginAsSaga),
    takeLatest(SIGNUP_TRIGGER, signupSaga),
    takeLatest(LOGOUT_TRIGGER, logoutSaga),
    takeLatest(OAUTH_LOGOUT_TRIGGER, oauthLogoutSaga),
    takeLatest(LOGOUT_ALL_TRIGGER, logoutAllSaga),
    takeLatest(GET_MAIN_INFO_TRIGGER, userInfoSaga),
    takeLatest(PASSWORD_RESET_TRIGGER, passwordResetRequestSaga),
    takeLatest(CONFIRM_EMAIL_TRIGGER, confirmEmailSaga),
    takeLatest(RESTORE_ACCOUNT_TRIGGER, restoreAccountSaga),
    takeLatest(CHECK_PASSWORD_RESET_LINK_TRIGGER, checkPasswordResetLinkSaga),
    takeLatest(CHANGE_PASSWORD_WITH_CODE_TRIGGER, changePasswordWithCodeSaga),
    takeLatest(AUTH_ID_TOKEN_TRIGGER, authIdTokenSaga),
    takeLatest(CHANGE_PASSWORD_USER_TRIGGER, changePasswordUserSaga),
    takeLatest(DELETE_USER_TRIGGER, deleteUserSaga),
    takeLatest(INIT_2FA_SETUP_TRIGGER, init2FaSetupSaga),
    takeLatest(CONFIRM_2FA_SETUP_TRIGGER, confirm2FaSetupSaga),
    takeLatest(DISABLE_2FA_TRIGGER, disable2FaSaga),
    takeLatest(CHECK_2FA_TOKEN_TRIGGER, checkTwoFaTokenSaga),
    takeLatest(UPDATE_JWT_TRIGGER, updateJwtSaga),
    takeLatest(MAKE_ADMIN_TRIGGER, makeAdminSaga),
  ])
}
