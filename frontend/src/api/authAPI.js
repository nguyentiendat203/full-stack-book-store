import axiosClient from './axiosClient'

const authAPI = {
  logIn: (data) => {
    const url = '/user/login'
    return axiosClient.post(url, data)
  },
  signUp: (data) => {
    const url = '/user/signup'
    return axiosClient.post(url, data)
  },
  logOut: () => {
    const url = '/user/logout'
    return axiosClient.post(url)
  }
}
export default authAPI
