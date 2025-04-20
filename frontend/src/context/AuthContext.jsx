import { createContext, useEffect, useState } from 'react'
import cartAPI from '~/api/cartAPI'

export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [quantityCart, setQuantityCart] = useState(0)

  const [category, setCategory] = useState(JSON.parse(localStorage.getItem('category')) || '')
  const [idSubCate, setIdSubCate] = useState(JSON.parse(localStorage.getItem('idSubCate')) || null)
  const [subcategories, setSubCategories] = useState(JSON.parse(localStorage.getItem('subcategories')) || [])

  const updateUser = (data) => {
    setCurrentUser(data)
  }

  const updateSubCategories = (data) => {
    setSubCategories([...data])
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

  useEffect(() => {
    localStorage.setItem('idSubCate', JSON.stringify(idSubCate))
    localStorage.setItem('category', JSON.stringify(category))
  }, [idSubCate])

  useEffect(() => {
    localStorage.setItem('subcategories', JSON.stringify(subcategories))
  }, [subcategories])

  return (
    <AuthContext.Provider
      value={{ currentUser, updateUser, quantityCart, countQuantityCart, subcategories, setSubCategories, category, setCategory, idSubCate, setIdSubCate, updateSubCategories }}
    >
      {children}
    </AuthContext.Provider>
  )
}
