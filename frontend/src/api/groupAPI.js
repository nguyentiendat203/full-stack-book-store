import axiosClient from './axiosClient'

const groupAPI = {
  gettAllGroups: () => {
    const url = '/group/read'
    return axiosClient.get(url)
  }
}
export default groupAPI
