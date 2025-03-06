import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { AuthContext } from '~/context/AuthContext'

function Header() {
  const { currentUser } = useContext(AuthContext)

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
