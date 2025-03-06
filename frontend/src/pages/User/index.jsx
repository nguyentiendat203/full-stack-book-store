import { BellOutlined, ContainerOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Menu } from 'antd'
import { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { AuthContext } from '~/context/AuthContext'
import Header from '~/components/Header/Header'
import Footer from '~/components/Footer/Footer'

function User() {
  const items = [
    {
      key: 'sub1',
      label: 'Tài khoản của tôi',
      icon: <UserOutlined />,
      children: [
        {
          key: '/user/profile',
          label: 'Hồ sơ'
        },
        {
          key: '2',
          label: 'Ngân hàng'
        },
        {
          key: '3',
          label: 'Đổi mật khẩu'
        }
      ]
    },
    {
      key: 'user/order',
      icon: <ContainerOutlined />,
      label: 'Đơn hàng'
    },

    {
      key: '5',
      icon: <BellOutlined />,
      label: 'Thông báo'
    }
  ]

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className='bg-gray-100 min-h-96'>
        <div className='w-10/12 2xl:w-8/12 container mx-auto p-4'>
          <div className='grid grid-cols-5 gap-4'>
            <div>
              <div className='bg-white rounded-lg'>
                <div className='font-medium p-2 text-center flex items-center '>
                  {!currentUser.avatar ? <Avatar size='large' icon={<UserOutlined />} /> : <img src={currentUser.avatar} className='h-10 w-10 rounded-full object-cover' />}
                  <div className='ml-2 text-sm'>
                    <span className='line-clamp-1'>
                      {currentUser.firstName} {currentUser.lastName}
                    </span>
                    <span className='text-gray-400 line-clamp-1'>{currentUser.email}</span>
                  </div>
                </div>
                <div>
                  <Menu
                    onClick={(item) => {
                      navigate(item.key)
                    }}
                    defaultSelectedKeys={['1']}
                    mode='inline'
                    items={items}
                  />
                </div>
              </div>
            </div>
            <div className='col-span-4'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default User
