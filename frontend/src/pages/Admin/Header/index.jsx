import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useAuthStore from '~/store/useAuthStore'

function Header() {
  const { currentUser } = useAuthStore()

  return (
    <>
      <div className='h-20 flex justify-between items-center py-4 px-4 text-lg'>
        <FontAwesomeIcon icon={faBars} className='mr-2' />
        <p>
          Welcom <b>{currentUser.email}</b>
        </p>
      </div>
    </>
  )
}

export default Header
