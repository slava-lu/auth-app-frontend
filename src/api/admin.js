import makeRequest from 'utils/makeRequest'
import { API_URL } from 'config/consts'

export const getAllUsersApi = ({ pageSize, currentPage, searchTerm }) =>
  makeRequest({
    url: `${API_URL}admin/users/?pageSize=${pageSize}&currentPage=${currentPage}&searchTerm=${searchTerm}`,
    method: `GET`,
  })

export const getUserDetailedApi = (accountId) =>
  makeRequest({
    url: `${API_URL}admin/users/${accountId}`,
    method: `GET`,
  })

export const blockUserApi = (accountId, block) =>
  makeRequest({
    url: `${API_URL}admin/users/${accountId}/block`,
    method: `POST`,
    body: { block },
  })

export const forceChangePasswordApi = (accountId, change) =>
  makeRequest({
    url: `${API_URL}admin/users/${accountId}/forcePasswordChange`,
    method: `POST`,
    body: { change },
  })

export const forceReloginApi = (accountId) =>
  makeRequest({
    url: `${API_URL}admin/users/${accountId}/forceRelogin`,
    method: `POST`,
  })

export const assignRolesApi = (accountId, rolesId) =>
  makeRequest({
    url: `${API_URL}admin/users/${accountId}/assignRoles`,
    method: `POST`,
    body: { rolesId },
  })
