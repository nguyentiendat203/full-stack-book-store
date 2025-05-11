import axios from 'axios'
import queryString from 'query-string'
import { toast } from 'react-toastify'
import authAPI from '~/api/authAPI'
import useAuthStore from '~/store/useAuthStore'

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
  baseURL: 'http://localhost:8017/api',
  headers: {
    'content-type': 'application/json'
  },
  withCredentials: true,
  paramsSerializer: (params) => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config
})

const refreshTokenPromise = null

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  (error) => {
    // Handle errors
    if (error.status === 401) {
      useAuthStore.getState().logOut()
      location.href('/login')
    }

    const originalRequest = error.config
    if (error.status === 410 && originalRequest) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = authAPI
          .refreshToken()
          .then(() => {})
          .catch(() => {
            useAuthStore.getState().logOut()
            location.href('/login')
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }

      return refreshTokenPromise.then(() => {
        return axiosClient(originalRequest)
      })
    }
    toast.error(error.response.data?.message)
    return Promise.reject(error)
  }
)

export default axiosClient
