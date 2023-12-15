import { combineReducers } from 'redux'

import { authReducer as auth } from 'modules/auth'
import { userReducer as user } from 'modules/user'
import { uiReducer as ui } from 'modules/ui'
import { adminReducer as admin } from 'modules/admin'
import { systemReducer as system } from 'modules/system'
import { HYDRATE } from 'next-redux-wrapper'

function hydrate(state = {}, action) {
  const { type } = action
  switch (type) {
    case HYDRATE: {
      // to avoid store override during broadcast channel api
      if (state.auth?.userInfo?.email && !action.payload.auth?.userInfo?.email) {
        return state
      }

      return { ...state, ...action.payload }
    }
    default:
      return state
  }
}

const combinedReducer = combineReducers({
  auth,
  user,
  ui,
  system,
  admin,
})

function rootReducer(state, action) {
  const intermediateState = combinedReducer(state, action)
  return hydrate(intermediateState, action)
}
export default rootReducer
