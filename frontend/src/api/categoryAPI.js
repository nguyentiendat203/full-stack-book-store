import axiosClient from './axiosClient'

export const categoryAPI = {
  getAllCategories: () => {
    const url = '/category/read'
    return axiosClient.get(url)
  }
}
