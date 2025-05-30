import axiosClient from './axiosClient'

const bookAPI = {
  getAllBook: (page, limit, parentId, categoryId, sortBy, minPrice, maxPrice) => {
    const url = `/book/read?page=${page}&limit=${limit}&parentCategory=${parentId || ''}&category=${categoryId || ''}&sortBy=${sortBy || ''}&price=${minPrice},${maxPrice}`
    return axiosClient.get(url)
  },
  searchBook: (name) => {
    const url = `/book/read?name=${name}`
    return axiosClient.get(url)
  },
  getBook: (id) => {
    const url = `/book/${id}`
    return axiosClient.get(url)
  },
  deleteBook: (id) => {
    const url = `/book/delete?id=${id}`
    return axiosClient.delete(url)
  },
  createBook: (data) => {
    const url = '/book/create'
    return axiosClient.post(url, data)
  },
  updateBook: (data) => {
    const url = '/book/update'
    return axiosClient.put(url, data)
  },
  getRecommend: () => {
    const url = '/book/recommend'
    return axiosClient.post(url, { numNeighbors: 3, numRecommendations: 12 })
  }
}
export default bookAPI
