import { faBoxOpen, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import cartAPI from '~/api/cartAPI'
import { AuthContext } from '~/context/AuthContext'
import { formatPriceVND } from '~/utils/formatPriceVND'

function Cart() {
  const { quantityCart, currentUser, countQuantityCart } = useContext(AuthContext)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    const fetchDataCartItem = async () => {
      try {
        const res = await cartAPI.getMyCart(currentUser.id)
        setCartItems(res.Books)
        setTotalPrice(res.totalCartPrice)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDataCartItem()
  }, [])

  const handleQuantityChange = (bookId, newQuantity, unitPrice) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.id === bookId ? { ...item, Book_Cart: { quantity: newQuantity, unitPrice } } : item)))
  }

  const handleIncreaseQuantity = async (book) => {
    try {
      const response = await cartAPI.updateCartItem(currentUser.id, { bookId: book.id, quantityChange: 1 })
      handleQuantityChange(book.id, response.bookCart.quantity, response.bookCart.unitPrice)
      setTotalPrice(response.totalCartPrice)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Không đủ số lượng')
    }
  }
  const handleDecreaseQuantity = async (book) => {
    try {
      const response = await cartAPI.updateCartItem(currentUser.id, { bookId: book.id, quantityChange: -1 })
      handleQuantityChange(book.id, response.bookCart.quantity, response.bookCart.unitPrice)
      setTotalPrice(response.totalCartPrice)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Không đủ số lượng')
    }
  }
  const handleDeleteItemCart = async (book) => {
    try {
      const res = await cartAPI.deleteCartItem(currentUser.id, book.id)
      await countQuantityCart(currentUser.id)
      setCartItems(res.Books)
      setTotalPrice(res.totalCartPrice)
    } catch (error) {
      console.log(error)
    }
  }

  if (!currentUser) {
    return <Navigate to='/login' />
  } else {
    return (
      <>
        <div className='min-h-96'>
          <p className='text-lg font-medium my-2'>
            GIỎ HÀNG <span className='text-sm'>({quantityCart} sản phẩm)</span>
          </p>
          {cartItems && cartItems.length > 0 ? (
            <div className='grid grid-cols-3 gap-2'>
              <div className='col-span-2'>
                <div className='flex flex-col'>
                  <div className='flex items-center text-sm bg-white rounded-lg p-4 mb-2'>
                    <span className='basis-8/12'>Thông tin sản phẩm</span>
                    <span className='basis-1/6'>Số lượng</span>
                    <span>Thành tiền</span>
                  </div>
                  {cartItems?.map((item) => {
                    const priceAfterDiscount = (item.price * (100 - item.discount)) / 100
                    return (
                      <>
                        <div key={item.id} className='flex items-center text-sm py-4 bg-white rounded-lg mb-2'>
                          <div className='basis-3/5 flex mr-8'>
                            <img src={item.image} alt='' className='h-32 mr-4' />
                            <div className='flex flex-col'>
                              <NavLink to={`/chi-tiet-sach/${item.slug}/${item.id}`} className='basis-1/3 text-gray-600 line-clamp-2'>
                                {item.name}
                              </NavLink>
                              <div>
                                <span className='font-medium text-lg mr-2'>{formatPriceVND(priceAfterDiscount)}</span>
                                <span className='line-through text-gray-500'>{formatPriceVND(item.price)}</span>
                              </div>
                            </div>
                          </div>
                          <div className='border-solid border border-gray-200 rounded-lg mr-6'>
                            <button className='p-2 hover:scale-125' onClick={() => handleDecreaseQuantity(item)}>
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span className='px-2'>{item.Book_Cart.quantity}</span>
                            <button className='p-2 hover:scale-125' onClick={() => handleIncreaseQuantity(item)}>
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                          <span className='text-lg font-medium text-red-600'>{formatPriceVND(item.Book_Cart.unitPrice)}</span>
                          <button className='flex-1 text-xl text-gray-600' onClick={() => handleDeleteItemCart(item)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </>
                    )
                  })}
                </div>
              </div>
              <div>
                <div className='bg-white rounded-lg  p-4'>
                  <div className='flex justify-between h-8 border-b border-gray-200 text-gray-700'>
                    <span>Thành tiền</span>
                    <span>{formatPriceVND(totalPrice)}</span>
                  </div>
                  <div className='flex justify-between my-4'>
                    <span className='font-medium'>Tổng Số Tiền (gồm VAT)</span>
                    <span className='text-xl font-medium text-red-600'>{formatPriceVND(totalPrice)}</span>
                  </div>
                  <NavLink to='/checkout'>
                    <Button danger type='primary' className=' p-6 !bg-red-600 font-medium mb-4 w-full text-xl'>
                      THANH TOÁN
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center text-gray-500 bg-white rounded-lg p-2'>
              <FontAwesomeIcon className='size-2/12' icon={faBoxOpen} />
              <span className='mb-4'>Chưa có sản phẩm trong giỏ hàng</span>
              <NavLink to='/'>
                <Button danger type='primary' className=' px-6 !bg-red-600 font-medium mb-4'>
                  MUA SẮM NGAY
                </Button>
              </NavLink>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default Cart
