import axiosClient from './axiosClient'

const orderAPI = {
  // --- Đặt hàng các sản phẩm trong giỏ hàng,
  orderCart: (reqBody) => {
    const url = '/order'
    return axiosClient.post(url, reqBody)
  },
  getAllOrders: () => {
    const url = '/order/read'
    return axiosClient.get(url)
  },
  updateStatusOrder: (reqBody) => {
    const url = '/order/update-status'
    return axiosClient.put(url, reqBody)
  },

  getMyOrder: () => {
    const url = '/order/my-order'
    return axiosClient.get(url)
  },
  getMyOrderByStatus: (status) => {
    const url = `/order/my-order-status/${status}`
    return axiosClient.get(url)
  }
}
export default orderAPI
