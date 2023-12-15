import { all, put, call, takeLatest } from 'redux-saga/effects'
import { getSystemOptionsApi, getApiVersionApi } from '../api/system'

const moduleName = 'system'

const GET_SYSTEM_OPTIONS_TRIGGER = `${moduleName}/GET_SYSTEM_OPTIONS_TRIGGER`
const GET_SYSTEM_OPTIONS_REQUEST = `${moduleName}/GET_SYSTEM_OPTIONS_REQUEST`
const GET_SYSTEM_OPTIONS_SUCCESS = `${moduleName}/GET_SYSTEM_OPTIONS_SUCCESS`
const GET_SYSTEM_OPTIONS_FAILURE = `${moduleName}/GET_SYSTEM_OPTIONS_FAILURE`

const GET_API_VERSION_TRIGGER = `${moduleName}/GET_API_VERSION_TRIGGER`
const GET_API_VERSION_REQUEST = `${moduleName}/GET_API_VERSION_REQUEST`
const GET_API_VERSION_SUCCESS = `${moduleName}/GET_API_VERSION_SUCCESS`
const GET_API_VERSION_FAILURE = `${moduleName}/GET_API_VERSION_FAILURE`

const initialState = {
  config: { oneLoginOnly: false, autoLogout: {}, socialLoginNotAllowed: [], roleDependencies: {} },
  apiVersion: '',
  isError: false,
  error: false,
}

export const getSystemParams = () => ({
  type: GET_SYSTEM_OPTIONS_TRIGGER,
})

export const getApiVersion = () => ({
  type: GET_API_VERSION_TRIGGER,
})

export const systemReducer = (state = initialState, { type, result = {}, error = false }) => {
  switch (type) {
    case GET_SYSTEM_OPTIONS_REQUEST:
      return { ...state, isError: false, configOptions: {} }

    case GET_SYSTEM_OPTIONS_SUCCESS:
    case GET_API_VERSION_SUCCESS:
      return { ...state, ...result, error: false }

    case GET_SYSTEM_OPTIONS_FAILURE:
    case GET_API_VERSION_FAILURE:
      return { ...state, isError: true, error }

    default:
      return state
  }
}

const getSystemOptionsSaga = function* () {
  yield put({ type: GET_SYSTEM_OPTIONS_REQUEST })
  try {
    const { isOk, result, error } = yield call(getSystemOptionsApi)
    if (isOk) {
      yield put({ type: GET_SYSTEM_OPTIONS_SUCCESS, result })
    } else {
      yield put({ type: GET_SYSTEM_OPTIONS_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: GET_SYSTEM_OPTIONS_FAILURE, error })
  }
}

const getApiVersionSaga = function* () {
  yield put({ type: GET_API_VERSION_REQUEST })
  try {
    const { isOk, result, error } = yield call(getApiVersionApi)
    if (isOk) {
      yield put({ type: GET_API_VERSION_SUCCESS, result })
    } else {
      yield put({ type: GET_API_VERSION_FAILURE, error })
    }
  } catch (error) {
    yield put({ type: GET_API_VERSION_FAILURE, error })
  }
}

export const systemSagas = function* () {
  yield all([
    takeLatest(GET_SYSTEM_OPTIONS_TRIGGER, getSystemOptionsSaga),
    takeLatest(GET_API_VERSION_TRIGGER, getApiVersionSaga),
  ])
}
