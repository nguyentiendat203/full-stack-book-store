import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import useAuthStore from '~/store/useAuthStore'
import useCartStore from '~/store/useCartStore'

function Cart() {
  const { currentUser } = useAuthStore()
  const { quantityCart } = useCartStore()

  return (
    <>
      <div className='mr-4 relative'>
        <NavLink to='/my-cart' className='flex flex-col items-center text-white lg:text-gray-500'>
          <FontAwesomeIcon className='size-7 md:size-5' icon={faCartShopping} />
          <span className='hidden md:inline-block text-xs'>Giỏ hàng</span>
        </NavLink>
        {currentUser && <span className='w-4 h-4 text-center text-white bg-red-600 absolute rounded-lg text-xs right-2 -top-2'>{quantityCart}</span>}
      </div>
    </>
  )
}

export default Cart
