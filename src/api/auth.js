import makeRequest from 'utils/makeRequest'
import { API_URL } from 'config/consts'

export const signupUserApi = (payload) =>
  makeRequest({
    url: `${API_URL}auth/accounts`,
    method: `POST`,
    body: payload,
  })

export const confirmEmailApi = ({ accountId, emailVerificationCode }) =>
  makeRequest({
    url: `${API_URL}auth/accounts/verifyEmail`,
    method: `GET`,
    queryParams: { accountId, emailVerificationCode },
  })

export const restoreAccountApi = ({ accountId, accountRestoreCode }) =>
  makeRequest({
    url: `${API_URL}auth/accounts/restore`,
    method: `GET`,
    queryParams: { accountId, accountRestoreCode },
  })

export const deleteUserApi = () =>
  makeRequest({
    url: `${API_URL}auth/accounts/delete`,
    method: `DELETE`,
  })

export const getUserInfoApi = () =>
  makeRequest({
    url: `${API_URL}users/profile/getBasic`,
    method: `GET`,
  })

export const updateJwtApi = () =>
  makeRequest({
    url: `${API_URL}auth/login/updateJwt`,
    method: `GET`,
  })

export const loginUserApi = (payload) =>
  makeRequest({
    url: `${API_URL}auth/login/local`,
    method: `POST`,
    body: payload,
  })

export const loginAsApi = (payload) =>
  makeRequest({
    url: `${API_URL}auth/login/loginAs`,
    method: `POST`,
    body: payload,
  })

export const authOauthApi = ({ code, isRemember, provider }) =>
  makeRequest({
    url: `${API_URL}auth/oauth/loginOauth`,
    method: `POST`,
    queryParams: { code, isRemember, provider },
  })

export const logoutApi = () =>
  makeRequest({
    url: `${API_URL}auth/login/logout`,
    method: `GET`,
  })

export const oauthLogoutApi = (userId, provider) =>
  makeRequest({
    url: `${API_URL}auth/oauth/logoutOauth`,
    method: `GET`,
    queryParams: { userId, provider },
  })

export const logoutAllApi = () =>
  makeRequest({
    url: `${API_URL}auth/login/logoutAll`,
    method: `GET`,
  })

export const passwordResetApi = ({ email }) =>
  makeRequest({
    url: `${API_URL}auth/password/requestResetCode`,
    method: `GET`,
    queryParams: { email },
  })

export const checkPasswordResetLinkApi = ({ email, passwordResetCode }) =>
  makeRequest({
    url: `${API_URL}auth/password/checkResetCode`,
    method: `GET`,
    queryParams: { email, passwordResetCode },
  })

export const changePasswordWithCodeApi = (payload) =>
  makeRequest({
    url: `${API_URL}auth/password/resetByCode`,
    method: `POST`,
    body: payload,
  })

export const changePasswordUserApi = (payload) =>
  makeRequest({
    url: `${API_URL}auth/password/change`,
    method: `POST`,
    body: payload,
  })

export const init2FaSetupApi = () =>
  makeRequest({
    url: `${API_URL}auth/2fa/init`,
    method: `GET`,
  })

export const confirm2FaSetupApi = (token) =>
  makeRequest({
    url: `${API_URL}auth/2fa/confirmInit`,
    method: `PUT`,
    body: token,
  })

export const disable2Api = () =>
  makeRequest({
    url: `${API_URL}auth/2fa/remove`,
    method: `PUT`,
  })

export const checkTwoFaTokenApi = (payload) =>
  makeRequest({
    url: `${API_URL}auth/2fa/checkCode`,
    method: `POST`,
    body: payload,
  })

//  for Demo app only
export const makeAdminApi = () =>
  makeRequest({
    url: `${API_URL}users/profile/makeAdmin`,
    method: `POST`,
  })
