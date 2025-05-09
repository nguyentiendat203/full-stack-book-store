import { toast } from 'react-toastify'
import { create } from 'zustand'
import authAPI from '~/api/authAPI'
import userAPI from '~/api/userAPI'
import useCartStore from '~/store/useCartStore'

const useAuthStore = create((set) => ({
  currentUser: null,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuthUser: () => {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (currentUser) {
      set({ currentUser })
    } else {
      set({ currentUser: null })
    }
  },

  logIn: async (data) => {
    try {
      set({ isLoggingIn: true })
      const currentUser = await authAPI.logIn(data)
      set({ currentUser })
      localStorage.setItem('user', JSON.stringify(currentUser))
      useCartStore.getState().countQuantityCart()
      toast.success('Đăng nhập thành công')
    } catch (error) {
      //
    } finally {
      set({ isLoggingIn: false })
    }
  },
  logOut: async () => {
    await authAPI.logOut()
    localStorage.removeItem('user')
    set({ currentUser: null })
    toast.success('Đăng xuất thành công')
  },

  updateProfile: async (data) => {
    await userAPI.updateMe(data)
    set({ currentUser: data })
    localStorage.setItem('user', JSON.stringify(data))
    toast.success('Cập nhật thông tin thành công')
  }
}))

export default useAuthStore
