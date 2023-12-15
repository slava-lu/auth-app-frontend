import makeRequest from 'utils/makeRequest'
import { API_URL } from 'config/consts'

export const getUserProfileApi = () =>
  makeRequest({
    url: `${API_URL}users/profile`,
    method: `GET`,
  })

export const updateUserProfileApi = (payload) =>
  makeRequest({
    url: `${API_URL}users/profile/update`,
    method: `PUT`,
    body: payload,
  })
