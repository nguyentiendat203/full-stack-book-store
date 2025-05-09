import axiosClient from './axiosClient'

const cartAPI = {
  addToCart: (userId, reqBody) => {
    const url = '/user/add-to-cart'
    return axiosClient.post(url, reqBody)
  },
  cartQuantity: () => {
    const url = '/user/cart-quantity'
    return axiosClient.get(url)
  },
  getMyCart: () => {
    const url = '/user/my-cart'
    return axiosClient.get(url)
  },
  updateCartItem: (reqBody) => {
    const url = '/user/update-cart-quantity'
    return axiosClient.put(url, reqBody)
  },
  deleteCartItem: (bookId) => {
    const url = `/user/delete-cart-item/${bookId}`
    return axiosClient.delete(url)
  },
  // --- Đặt hàng các sản phẩm trong giỏ hàng
  orderCart: (reqBody) => {
    const url = '/user/order'
    return axiosClient.post(url, reqBody)
  },
  getMyOrder: () => {
    const url = '/user/my-order'
    return axiosClient.get(url)
  },
  getMyOrderByStatus: (status) => {
    const url = `/user/my-order-status/${status}`
    return axiosClient.get(url)
  },
  getRecommend: () => {
    const url = '/user/recommend'
    return axiosClient.post(url, { numNeighbors: 3, numRecommendations: 10 })
  }
}
export default cartAPI
