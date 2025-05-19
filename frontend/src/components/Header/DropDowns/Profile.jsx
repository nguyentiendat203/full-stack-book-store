import { faUser, faRectangleList, faHeart } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightFromBracket, faTicket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, useNavigate } from 'react-router-dom'

import { Button, Dropdown } from 'antd'
import useAuthStore from '~/store/useAuthStore'

function Profile() {
  const navigate = useNavigate()
  const { currentUser, logOut } = useAuthStore()

  const handleLogout = async () => {
    logOut()
    navigate('/')
  }

  const items = currentUser
    ? [
        {
          key: '0',
          label: (
            <NavLink to='/user/profile' className='flex justify-center items-center p-1'>
              <FontAwesomeIcon icon={faUser} className='text-gray-500' />
              <span className='flex-1 ml-2 text-gray-500'>Tài khoản của tôi</span>
            </NavLink>
          )
        },
        {
          key: '2',
          label: (
            <NavLink to='/user/order' className='flex justify-center items-center p-1'>
              <FontAwesomeIcon icon={faRectangleList} className='text-gray-500' />
              <span className='flex-1 ml-2 text-gray-500'>Đơn hàng của tôi</span>
            </NavLink>
          )
        },
        {
          key: '3',
          label: (
            <a className='flex justify-center items-center p-1'>
              <FontAwesomeIcon icon={faHeart} className='text-gray-500' />
              <span className='flex-1 ml-2 text-gray-500'>Sản phẩm yêu thích</span>
            </a>
          )
        },
        {
          key: '4',
          label: (
            <a className='flex justify-center items-center p-1'>
              <FontAwesomeIcon icon={faTicket} className='text-gray-500' />
              <span className='flex-1 ml-2 text-gray-500'>Wallet Voucher</span>
            </a>
          )
        },
        {
          key: '5',
          label: (
            <a onClick={handleLogout} className='flex justify-center items-center p-1'>
              <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-red-500' />
              <span className='text-red-500 font-medium flex-1 ml-2 '>Đăng xuất</span>
            </a>
          )
        }
      ]
    : [
        {
          key: '1',
          label: (
            <NavLink to='/login' className='W-full block '>
              <Button type='primary' danger>
                Đăng nhập
              </Button>
            </NavLink>
          )
        },
        {
          key: '2',
          label: (
            <NavLink to='/register' className='W-full block  '>
              <Button danger className='w-full'>
                Đăng ký
              </Button>
            </NavLink>
          )
        }
      ]

  return (
    <>
      <Dropdown
        menu={{
          items
        }}
        placement='bottomRight'
        trigger={['click']}
      >
        <div className='mr-2 md:mr-4'>
          <button className='flex flex-col items-center text-white lg:text-gray-500'>
            <FontAwesomeIcon className='size-6 md:size-5' icon={faUser} />
            <span className='hidden md:inline-block text-sm'>Tài khoản</span>
          </button>
        </div>
      </Dropdown>
    </>
  )
}

export default Profile
