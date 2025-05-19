import { faBell } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Notification() {
  return (
    <>
      <div className='hidden lg:block mr-4'>
        <button className='flex flex-col items-center text-gray-500'>
          <FontAwesomeIcon className='size-5' icon={faBell} />
          <span className='hidden md:inline-block text-sm'>Thông báo</span>
        </button>
      </div>
    </>
  )
}

export default Notification
