import axiosClient from './axiosClient'

export const supplierAPI = {
  getAllSupplier: () => {
    const url = '/supplier/read'
    return axiosClient.get(url)
  }
}
