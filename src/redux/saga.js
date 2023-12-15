import { all } from 'redux-saga/effects'
import { authSagas } from 'modules/auth'
import { userSagas } from 'modules/user'
import { systemSagas } from 'modules/system'
import { adminSagas } from 'modules/admin'

function* rootSaga() {
  yield all([authSagas(), userSagas(), systemSagas(), adminSagas()])
}

export default rootSaga
