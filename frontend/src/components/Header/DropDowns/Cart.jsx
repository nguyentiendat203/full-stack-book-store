import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '~/context/AuthContext'

function Cart() {
  const { currentUser, quantityCart } = useContext(AuthContext)

  return (
    <>
      <div className='mr-4 relative '>
        <NavLink to='/my-cart' className='flex flex-col items-center  text-gray-500'>
          <span>
            <FontAwesomeIcon icon={faCartShopping} />
          </span>
          <span className='text-sm'>Giỏ hàng</span>
        </NavLink>
        {currentUser && <span className='w-4 h-4 text-center text-white bg-red-600 absolute rounded-lg text-xs right-2 -top-2'>{quantityCart}</span>}
      </div>
    </>
  )
}

export default Cart
