import axiosClient from './axiosClient'

export const categoryAPI = {
  getAllCategories: () => {
    const url = '/category/read'
    return axiosClient.get(url)
  },
  getSubCategories: (id) => {
    const url = `/category/read-sub-categories/${id}`
    return axiosClient.get(url)
  }
}
