import axiosClient from './axiosClient'

const reviewAPI = {
  createReview: (data) => {
    const url = '/review/create'
    return axiosClient.post(url, data)
  },
  getAllReviews: (bookId) => {
    const url = `/review/read/${bookId}`
    return axiosClient.get(url)
  }
}

export default reviewAPI
