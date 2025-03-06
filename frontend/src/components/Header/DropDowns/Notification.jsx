import { faBell } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Notification() {
  return (
    <>
      <div className='mr-4'>
        <button className='flex flex-col items-center text-gray-500'>
          <span>
            <FontAwesomeIcon icon={faBell} />
          </span>
          <span className='text-sm'>Thông báo</span>
        </button>
      </div>
    </>
  )
}

export default Notification
