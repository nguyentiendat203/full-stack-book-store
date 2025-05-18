import axiosClient from './axiosClient'

const cartAPI = {
  addToCart: (reqBody) => {
    const url = '/cart/add-to-cart'
    return axiosClient.post(url, reqBody)
  },
  cartQuantity: () => {
    const url = '/cart/cart-quantity'
    return axiosClient.get(url)
  },
  getMyCart: () => {
    const url = '/cart/my-cart'
    return axiosClient.get(url)
  },
  updateCartItem: (reqBody) => {
    const url = '/cart/update-cart-quantity'
    return axiosClient.put(url, reqBody)
  },
  deleteCartItem: (bookId) => {
    const url = `/cart/delete-cart-item/${bookId}`
    return axiosClient.delete(url)
  }
}
export default cartAPI
