import { createContext, useEffect, useState } from 'react'
import cartAPI from '~/api/cartAPI'

export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [quantityCart, setQuantityCart] = useState(0)

  const updateUser = (data) => {
    setCurrentUser(data)
  }

  const countQuantityCart = async (userId) => {
    try {
      const res = await cartAPI.cartQuantity(userId)
      setQuantityCart(res.totalQuantity)
    } catch (error) {
      // console.log(error.response.data.message)
    }
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
    if (currentUser) {
      countQuantityCart(currentUser.id)
    }
  }, [currentUser])

  return <AuthContext.Provider value={{ currentUser, updateUser, quantityCart, countQuantityCart }}>{children}</AuthContext.Provider>
}
