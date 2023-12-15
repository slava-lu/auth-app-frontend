import { all, put, call, takeLatest } from 'redux-saga/effects'
import { getUserProfileApi, updateUserProfileApi, makeAdminApi } from 'api/user'
import {
  RESET_ERROR_GLOBAL,
  PASSWORD_VALIDATION_MODAL_OPEN,
  PASSWORD_VALIDATION_MODAL_CLOSE,
  PASSWORD_VALIDATION_FAILURE,
} from './ui'
import { RESULT_CODES } from 'config/consts'

const moduleName = 'user'

const GET_USER_PROFILE_TRIGGER = `${moduleName}/GET_USER_PROFILE_TRIGGER`
const GET_USER_PROFILE_REQUEST = `${moduleName}/GET_USER_PROFILE_REQUEST`
const GET_USER_PROFILE_SUCCESS = `${moduleName}/GET_USER_PROFILE_SUCCESS`
const GET_USER_PROFILE_FAILURE = `${moduleName}/GET_USER_PROFILE_FAILURE`

const UPDATE_USER_PROFILE_TRIGGER = `${moduleName}/UPDATE_USER_PROFILE_TRIGGER`
const UPDATE_USER_PROFILE_REQUEST = `${moduleName}/UPDATE_USER_PROFILE_REQUEST`
export const UPDATE_USER_PROFILE_SUCCESS = `${moduleName}/UPDATE_USER_PROFILE_SUCCESS`
const UPDATE_USER_PROFILE_FAILURE = `${moduleName}/UPDATE_USER_PROFILE_FAILURE`

const initialState = {
  profile: {},
  isLoaded: false,
  isLoading: false,
  isUpdated: false,
  isError: false,
  error: false,
  pageError: false,
}

export const getUserProfile = () => ({
  type: GET_USER_PROFILE_TRIGGER,
})

export const updateUserProfile = (values) => ({
  type: UPDATE_USER_PROFILE_TRIGGER,
  payload: values,
})

export const userReducer = (state = initialState, { type, result = {}, error = false }) => {
  switch (type) {
    case RESET_ERROR_GLOBAL:
      return { ...state, isError: false, error: false, pageError: false }

    case PASSWORD_VALIDATION_MODAL_OPEN:
      return { ...state, isLoading: false }

    case GET_USER_PROFILE_REQUEST:
      return { ...state, isLoading: true, isLoaded: false, isError: false, pageError: false, profile: {} }

    case GET_USER_PROFILE_SUCCESS:
      return { ...state, isLoading: false, profile: result, isLoaded: true, error: false }

    case GET_USER_PROFILE_FAILURE:
      return { ...state, isLoading: false, isError: true, isLoaded: true, pageError: true, error }

    case UPDATE_USER_PROFILE_REQUEST:
      return { ...state, isLoading: true, isUpdated: false, isError: false }

    case UPDATE_USER_PROFILE_SUCCESS:
      return { ...state, isLoading: false, profile: result, isUpdated: true, error: false }

    case UPDATE_USER_PROFILE_FAILURE:
      return { ...state, isLoading: false, isError: true, isUpdated: false, error }

    default:
      return state
  }
}
const getProfileSaga = function* ({ payload }) {
  yield put({ type: GET_USER_PROFILE_REQUEST })
  try {
    const { isOk, result, error } = yield call(getUserProfileApi, payload)

    if (isOk) {
      yield put({ type: GET_USER_PROFILE_SUCCESS, result })
    } else {
      yield put({ type: GET_USER_PROFILE_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: GET_USER_PROFILE_FAILURE, error })
  }
}

const updateProfileSaga = function* ({ payload }) {
  yield put({ type: UPDATE_USER_PROFILE_REQUEST })
  try {
    const { isOk, result, error } = yield call(updateUserProfileApi, payload)
    if (isOk) {
      if (result.resultCode === RESULT_CODES.PASSWORD_VALIDATION_REQUIRED) {
        result.passwordValidationActionName = UPDATE_USER_PROFILE_TRIGGER
        yield put({ type: PASSWORD_VALIDATION_MODAL_OPEN, result })
        return
      }
      yield put({ type: UPDATE_USER_PROFILE_SUCCESS, result })
      yield put({ type: PASSWORD_VALIDATION_MODAL_CLOSE })
    } else {
      yield put({ type: UPDATE_USER_PROFILE_FAILURE, error })
      yield put({ type: PASSWORD_VALIDATION_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: UPDATE_USER_PROFILE_FAILURE, error })
  }
}

export const userSagas = function* () {
  yield all([
    takeLatest(GET_USER_PROFILE_TRIGGER, getProfileSaga),
    takeLatest(UPDATE_USER_PROFILE_TRIGGER, updateProfileSaga),
  ])
}
