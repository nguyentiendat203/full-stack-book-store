import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'

export const HeaderListOrder = ({ order, statusMessage }) => {
  return (
    <div className='flex justify-between items-center mt-2'>
      <span className='text-sm'>
        Ngày đặt hàng: <span className='font-medium'>{format(order.createdAt, 'dd-MM-yyyy HH:mm:ss')}</span>
      </span>
      <div>
        {order.status === 4 && (
          <span className='text-emerald-600 mb-1 pr-2 text-sm border-r-2'>
            <FontAwesomeIcon icon={faTruck} className='mr-2' />
            Đặt hàng thành công
          </span>
        )}
        <span className='text-red-600 ml-2 font-medium'>{order.status == 4 ? 'HOÀN THÀNH' : statusMessage.toUpperCase()}</span>
      </div>
    </div>
  )
}
