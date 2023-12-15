import makeRequest from 'utils/makeRequest'
import { API_URL } from 'config/consts'

export const getSystemOptionsApi = () =>
  makeRequest({
    url: `${API_URL}system/configOption`,
    method: `GET`,
  })

export const getApiVersionApi = () =>
  makeRequest({
    url: `${API_URL}system/getApiVersion`,
    method: `GET`,
  })
