import { all, put, call, takeLatest } from 'redux-saga/effects'
import {
  getAllUsersApi,
  getUserDetailedApi,
  blockUserApi,
  forceChangePasswordApi,
  forceReloginApi,
  assignRolesApi,
} from 'api/admin'
import { RESET_ERROR_GLOBAL, SHOW_INFO_MESSAGE_GLOBAL } from './ui'
import { GET_MAIN_INFO_TRIGGER } from './auth'

const moduleName = 'admin'

const GET_ALL_USER_TRIGGER = `${moduleName}/GET_ALL_USER_TRIGGER`
const GET_ALL_USER_REQUEST = `${moduleName}/GET_ALL_USER_REQUEST`
const GET_ALL_USER_SUCCESS = `${moduleName}/GET_ALL_USER_SUCCESS`
const GET_ALL_USER_FAILURE = `${moduleName}/GET_ALL_USER_FAILURE`

const GET_USER_DETAILED_TRIGGER = `${moduleName}/GET_USER_DETAILED_TRIGGER`
const GET_USER_DETAILED_REQUEST = `${moduleName}/GET_USER_DETAILED_REQUEST`
const GET_USER_DETAILED_REQUEST_NO_RELOAD = `${moduleName}/GET_USER_DETAILED_REQUEST_NO_RELOAD`
const GET_USER_DETAILED_SUCCESS = `${moduleName}/GET_USER_DETAILED_SUCCESS`
const GET_USER_DETAILED_FAILURE = `${moduleName}/GET_USER_DETAILED_FAILURE`

const BLOCK_USER_TRIGGER = `${moduleName}/BLOCK_USER_TRIGGER`
const BLOCK_USER_REQUEST = `${moduleName}/BLOCK_USER_REQUEST`
const BLOCK_USER_SUCCESS = `${moduleName}/BLOCK_USER_SUCCESS`
const BLOCK_USER_FAILURE = `${moduleName}/BLOCK_USER_FAILURE`

const FORCE_CHANGE_PASSWORD_TRIGGER = `${moduleName}/FORCE_CHANGE_PASSWORD_TRIGGER`
const FORCE_CHANGE_PASSWORD_REQUEST = `${moduleName}/FORCE_CHANGE_PASSWORD_REQUEST`
const FORCE_CHANGE_PASSWORD_SUCCESS = `${moduleName}/FORCE_CHANGE_PASSWORD_SUCCESS`
const FORCE_CHANGE_PASSWORD_FAILURE = `${moduleName}/FORCE_CHANGE_PASSWORD_FAILURE`

const FORCE_RELOGIN_TRIGGER = `${moduleName}/FORCE_RELOGIN_TRIGGER`
const FORCE_RELOGIN_REQUEST = `${moduleName}/FORCE_RELOGIN_REQUEST`
const FORCE_RELOGIN_SUCCESS = `${moduleName}/FORCE_RELOGIN_SUCCESS`
const FORCE_RELOGIN_FAILURE = `${moduleName}/FORCE_RELOGIN_FAILURE`

const ASSIGN_ROLE_TRIGGER = `${moduleName}/ASSIGN_ROLE_TRIGGER`
const ASSIGN_ROLE_REQUEST = `${moduleName}/ASSIGN_ROLE_REQUEST`
const ASSIGN_ROLE_SUCCESS = `${moduleName}/ASSIGN_ROLE_SUCCESS`
const ASSIGN_ROLE_FAILURE = `${moduleName}/ASSIGN_ROLE_FAILURE`

const initialState = {
  users: [],
  totalNumberUsers: 0,
  userDetailed: {},
  isLoading: false,
  isLoadingBlockUser: false,
  isLoadingPasswordChange: false,
  isLoadingRelogin: false,
  isError: false,
  error: false,
  pageError: false,
  isLoadingRoles: false,
}

export const getAllUsers = ({ pageSize, currentPage, searchTerm }) => ({
  type: GET_ALL_USER_TRIGGER,
  payload: { pageSize, currentPage, searchTerm },
})

export const getUserDetailed = (id) => ({
  type: GET_USER_DETAILED_TRIGGER,
  payload: { id },
})

export const blockUser = (accountId, block) => ({
  type: BLOCK_USER_TRIGGER,
  payload: { accountId, block },
})

export const forceChangePassword = (accountId, change) => ({
  type: FORCE_CHANGE_PASSWORD_TRIGGER,
  payload: { accountId, change },
})

export const forceRelogin = (accountId) => ({
  type: FORCE_RELOGIN_TRIGGER,
  payload: { accountId },
})

export const assignRole = (accountId, rolesId = []) => ({
  type: ASSIGN_ROLE_TRIGGER,
  payload: { accountId, rolesId },
})

export const adminReducer = (state = initialState, { type, result = {}, error = false }) => {
  switch (type) {
    case RESET_ERROR_GLOBAL:
      return { ...state, isError: false, error: false }

    case GET_ALL_USER_REQUEST:
      return { ...state, isLoading: true, isError: false, users: [] }
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        users: result.users,
        totalNumberUsers: result.totalNumberUsers,
      }
    case GET_ALL_USER_FAILURE:
      return { ...state, isLoading: false, isError: true, error }

    case GET_USER_DETAILED_REQUEST:
      return { ...state, isLoading: true, isError: false }
    case GET_USER_DETAILED_REQUEST_NO_RELOAD:
      return { ...state, isLoading: false, isError: false }
    case GET_USER_DETAILED_SUCCESS:
      return { ...state, isLoading: false, error: false, userDetailed: result.userDetailed }
    case GET_USER_DETAILED_FAILURE:
      return { ...state, isLoading: false, isError: true, error, userDetailed: {} }

    case BLOCK_USER_REQUEST:
      return { ...state, isLoadingBlockUser: true, isError: false }
    case BLOCK_USER_SUCCESS:
      return { ...state, isLoadingBlockUser: false, error: false, userDetailed: result.userDetailed }
    case BLOCK_USER_FAILURE:
      return { ...state, isLoadingBlockUser: false, isError: true, error, userDetailed: {} }

    case FORCE_CHANGE_PASSWORD_REQUEST:
      return { ...state, isLoadingPasswordChange: true, isError: false }
    case FORCE_CHANGE_PASSWORD_SUCCESS:
      return { ...state, isLoadingPasswordChange: false, error: false, userDetailed: result.userDetailed }
    case FORCE_CHANGE_PASSWORD_FAILURE:
      return { ...state, isLoadingPasswordChange: false, isError: true, error, userDetailed: {} }

    case FORCE_RELOGIN_REQUEST:
      return { ...state, isLoadingRelogin: true, isError: false }
    case FORCE_RELOGIN_SUCCESS:
      return { ...state, isLoadingRelogin: false, error: false }
    case FORCE_RELOGIN_FAILURE:
      return { ...state, isLoadingRelogin: false, isError: true, error }

    case ASSIGN_ROLE_REQUEST:
      return { ...state, isLoadingRoles: true, isError: false }
    case ASSIGN_ROLE_SUCCESS:
      return { ...state, isLoadingRoles: false, error: false, userDetailed: result.userDetailed }
    case ASSIGN_ROLE_FAILURE:
      return { ...state, isLoadingRoles: false, isError: true, error, userDetailed: {} }

    default:
      return state
  }
}

const getAllUsersSaga = function* ({ payload }) {
  const { pageSize, currentPage, searchTerm } = payload
  yield put({ type: GET_ALL_USER_REQUEST })
  try {
    const { isOk, result, error } = yield call(getAllUsersApi, { pageSize, currentPage, searchTerm })
    if (isOk) {
      yield put({ type: GET_ALL_USER_SUCCESS, result })
    } else {
      yield put({ type: GET_ALL_USER_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: GET_ALL_USER_FAILURE, error })
  }
}

const getUserDetailedSaga = function* ({ payload }) {
  const { id } = payload
  yield put({ type: GET_USER_DETAILED_REQUEST })
  try {
    const { isOk, result, error } = yield call(getUserDetailedApi, id)
    if (isOk) {
      yield put({ type: GET_USER_DETAILED_SUCCESS, result })
    } else {
      yield put({ type: GET_USER_DETAILED_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: GET_USER_DETAILED_FAILURE, error })
  }
}

const blockUserSaga = function* ({ payload }) {
  yield put({ type: BLOCK_USER_REQUEST })
  try {
    const { accountId, block } = payload
    const { isOk, result, error } = yield call(blockUserApi, accountId, block)
    if (isOk) {
      yield put({ type: BLOCK_USER_SUCCESS, result })
    } else {
      yield put({ type: BLOCK_USER_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: BLOCK_USER_FAILURE, error })
  }
}

const forceChangePasswordSaga = function* ({ payload }) {
  yield put({ type: FORCE_CHANGE_PASSWORD_REQUEST })
  try {
    const { accountId, change } = payload
    const { isOk, result, error } = yield call(forceChangePasswordApi, accountId, change)
    if (isOk) {
      yield put({ type: FORCE_CHANGE_PASSWORD_SUCCESS, result })
    } else {
      yield put({ type: FORCE_CHANGE_PASSWORD_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: FORCE_CHANGE_PASSWORD_FAILURE, error })
  }
}

const forceReloginSaga = function* ({ payload }) {
  yield put({ type: FORCE_RELOGIN_REQUEST })
  try {
    const { accountId } = payload
    const { isOk, result, error } = yield call(forceReloginApi, accountId)
    if (isOk) {
      yield put({ type: FORCE_RELOGIN_SUCCESS, result })
      yield put({ type: SHOW_INFO_MESSAGE_GLOBAL, payload: 'admin#relogin_requested' })
    } else {
      yield put({ type: FORCE_RELOGIN_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: FORCE_RELOGIN_FAILURE, error })
  }
}

const assignRolesSaga = function* ({ payload }) {
  yield put({ type: ASSIGN_ROLE_REQUEST })
  try {
    const { accountId, rolesId } = payload
    const { isOk, result, error } = yield call(assignRolesApi, accountId, rolesId)
    if (isOk) {
      yield put({ type: ASSIGN_ROLE_SUCCESS, result })
      yield put({ type: GET_MAIN_INFO_TRIGGER })
    } else {
      yield put({ type: ASSIGN_ROLE_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: ASSIGN_ROLE_FAILURE, error })
  }
}

export const adminSagas = function* () {
  yield all([
    takeLatest(GET_ALL_USER_TRIGGER, getAllUsersSaga),
    takeLatest(GET_USER_DETAILED_TRIGGER, getUserDetailedSaga),
    takeLatest(BLOCK_USER_TRIGGER, blockUserSaga),
    takeLatest(FORCE_CHANGE_PASSWORD_TRIGGER, forceChangePasswordSaga),
    takeLatest(FORCE_RELOGIN_TRIGGER, forceReloginSaga),
    takeLatest(ASSIGN_ROLE_TRIGGER, assignRolesSaga),
  ])
}
