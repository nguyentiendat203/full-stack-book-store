import { toast } from 'react-toastify'
import { create } from 'zustand'
import orderAPI from '~/api/orderAPI'

const useOrderStore = create((set) => ({
  allOrdersOfUser: [],
  setAllOrdersOfUser: (items) => set({ allOrdersOfUser: items }),

  confirmOrder: async (status, orderId) => {
    await orderAPI.updateStatusOrder({ status, id: orderId })
    toast.success('Xác nhận thành công')
  }
}))

export default useOrderStore
