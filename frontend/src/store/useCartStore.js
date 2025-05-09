import { create } from 'zustand'
import cartAPI from '~/api/cartAPI'

const useCartStore = create((set, get) => ({
  quantityCart: 0,
  setQuantityCart: (count) => set({ quantityCart: count }),

  totalPrice: 0,
  setTotalPrice: (price) => set({ totalPrice: price }),

  cartItems: [],

  countQuantityCart: async () => {
    const res = await cartAPI.cartQuantity()
    set({ quantityCart: res.totalQuantity })
  },

  getAllCartItems: async () => {
    const res = await cartAPI.getMyCart()
    set({ cartItems: res.Books })
    set({ totalPrice: res.totalCartPrice })
  },

  setCartItemDetails: (bookId, newQuantity, unitPrice) => {
    const currentCartItems = get().cartItems
    const updatedCartItems = currentCartItems.map((item) =>
      item.id === bookId
        ? { ...item, Book_Cart: { ...item.Book_Cart, quantity: newQuantity, unitPrice: unitPrice } } // Cập nhật quantity và unitPrice
        : item
    )
    set({ cartItems: updatedCartItems })
  },

  handleIncreaseQuantity: async (book) => {
    const response = await cartAPI.updateCartItem({ bookId: book.id, quantityChange: 1 })
    get().setCartItemDetails(book.id, response.bookCart.quantity, response.bookCart.unitPrice)
    set({ totalPrice: response.totalCartPrice })
    await get().countQuantityCart()
  },

  handleDecreaseQuantity: async (book) => {
    const response = await cartAPI.updateCartItem({ bookId: book.id, quantityChange: -1 })
    get().setCartItemDetails(book.id, response.bookCart.quantity, response.bookCart.unitPrice)
    set({ totalPrice: response.totalCartPrice })
    await get().countQuantityCart()
  },

  handleDeleteItemCart: async (book) => {
    const res = await cartAPI.deleteCartItem(book.id)
    await get().countQuantityCart()
    set({ cartItems: res.Books })
    set({ totalPrice: res.totalCartPrice })
  }
}))

export default useCartStore
