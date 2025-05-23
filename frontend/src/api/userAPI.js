import axiosClient from './axiosClient'

const userAPI = {
  getAllUsers: () => {
    const url = '/user/read'
    return axiosClient.get(url)
  },
  deleteUser: (user) => {
    const url = '/user/delete'
    return axiosClient.delete(url, { data: { id: user.id } })
  },
  getUser: (user) => {
    const url = `/user/detail?id=${user.id}`
    return axiosClient.get(url)
  },
  createUser: (data) => {
    const url = '/user/create'
    return axiosClient.post(url, data)
  },
  updateUser: (data) => {
    const url = '/user/update'
    return axiosClient.put(url, data)
  },
  updateMe: (data, formData) => {
    const url = '/user/update-me'
    if (formData) {
      return axiosClient.put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // ⚠️ override lại
        }
      })
    }
    return axiosClient.put(url, data)
  },
  sendEmail: (reqBody) => {
    const url = '/user/send-mail'
    return axiosClient.post(url, reqBody)
  },
  changePassword: (reqBody) => {
    const url = '/user/change-password'
    return axiosClient.post(url, reqBody)
  }
}

export default userAPI
