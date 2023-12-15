// wrapper around axios client to add some unification and error handling
import axios from 'axios'
import queryString from 'query-string'
import { NETWORK_TIMEOUT } from '../config/consts'

export const axiosInstance = axios.create()

const fetchData = async (options) => {
  try {
    const result = await axiosInstance(options)
    return {
      isOk: true,
      result: result.data,
    }
  } catch (error) {
    if (error.response) {
      return {
        isOk: false,
        error: {
          message: error.response?.data?.message || error.message,
          errorCode: error.response?.data?.code || error.response?.data?.errorCode,
          status: error.response.status,
        },
      }
    } else {
      return {
        isOk: false,
        error,
      }
    }
  }
}

const makeRequest = ({ url: fullUrl, method, queryParams, body }) => {
  const { url, query } = queryString.parseUrl(fullUrl)
  const newQuery = { ...query, ...queryParams }

  return fetchData({
    url,
    method,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: body ? body : {},
    timeout: NETWORK_TIMEOUT,
    params: newQuery,
  })
}

export default makeRequest
