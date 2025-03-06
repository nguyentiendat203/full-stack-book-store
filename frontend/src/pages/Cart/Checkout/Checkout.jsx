import { Button, Form, Input } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import cartAPI from '~/api/cartAPI'
import { AuthContext } from '~/context/AuthContext'
import { formatPriceVND } from '~/utils/formatPriceVND'

function Checkout() {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 8
      },
      sm: {
        span: 7
      },
      md: {
        span: 8
      }
    },
    wrapperCol: {
      xs: {
        span: 16
      },
      sm: {
        span: 10
      },
      md: {
        span: 16
      }
    }
  }
  const { currentUser, quantityCart, countQuantityCart } = useContext(AuthContext)

  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDataCartItem = async () => {
      try {
        const res = await cartAPI.getMyCart(currentUser.id)
        setCartItems(res.Books)
        setTotalPrice(res.totalCartPrice)
      } catch (error) {
        console.log('Something Error')
      }
    }
    fetchDataCartItem()
  }, [])

  const onFinish = async (values) => {
    try {
      const res = await cartAPI.orderCart({ ...values, status: 1 })
      toast.success(res.message)
      countQuantityCart(currentUser.id)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <Form {...formItemLayout} className='mt-4 w-full' onFinish={onFinish} name='register' scrollToFirstError>
          <div className='bg-white rounded-lg p-4 '>
            <p className='font-medium border-b border-gray-300 pb-2 text-center'>ĐỊA CHỈ GIAO HÀNG</p>
            <div className='-ml-64 mt-4'>
              <Form.Item
                name='fullName'
                label='Tên người nhận'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên!'
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name='phone'
                label='Số điện thoại'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại!'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='address'
                label='Địa chỉ nhận hàng'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập địa chỉ nhận hàng!'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name='note' label='Ghi chú'>
                <Input.TextArea showCount maxLength={100} />
              </Form.Item>
            </div>
          </div>
          <div className='bg-white rounded-lg p-4 mt-4'>
            <p className='font-medium border-b border-gray-300 pb-2 text-center'>KIỂM TRA LẠI ĐƠN HÀNG</p>
            {cartItems?.map((item) => {
              const priceAfterDiscount = (item.price * (100 - item.discount)) / 100
              return (
                <>
                  <div key={item.id} className='flex items-center text-sm  py-2 bg-white rounded-lg mb-2'>
                    <div className='basis-3/5 flex mr-8'>
                      <img src={item.image} alt='' className='h-32 mr-4' />
                      <div className='flex flex-col'>
                        <NavLink to={`/chi-tiet-sach/${item.slug}/${item.id}`} className='basis-1/3 text-lg text-gray-600'>
                          {item.name}
                        </NavLink>
                        <div>
                          <span className='font-medium text-lg mr-2'>{formatPriceVND(priceAfterDiscount)}</span>
                          <span className='line-through text-gray-500'>{formatPriceVND(item.price)}</span>
                        </div>
                      </div>
                    </div>
                    <div className='border-solid border border-gray-200 rounded-lg mr-14'>
                      <span className='px-4'>{item.Book_Cart.quantity}</span>
                    </div>
                    <span className='text-lg font-medium text-red-600'>{formatPriceVND(item.Book_Cart.unitPrice)}</span>
                  </div>
                </>
              )
            })}
          </div>
          <div className='bg-white rounded-lg p-4 mt-4 text-right'>
            <span className='mx-4'>
              Tổng thanh toán ({quantityCart} Sản phẩm): <span className='text-2xl my-2 text-red-600 font-medium'>{formatPriceVND(totalPrice)}</span>
            </span>
            <Button danger type='primary' className='p-6 !bg-red-600 font-medium text-xl' htmlType='submit'>
              MUA HÀNG
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default Checkout
