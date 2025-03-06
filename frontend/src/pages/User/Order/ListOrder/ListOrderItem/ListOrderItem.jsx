import { faDollar, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import { format } from 'date-fns'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'
import { formatPriceVND } from '~/utils/formatPriceVND'

function ListOrderItem({ item, statusMessage, fetchDataListOrder, onHideBtnConfirmOrder }) {
  const confirmOrder = async (status, orderId) => {
    try {
      await userAPI.updateStatusOrder({ status, id: orderId })
      fetchDataListOrder()
      toast.success('Xác nhận thành công')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <div key={item.id} className='bg-white rounded-lg p-4 mb-4'>
        <div className='flex justify-between items-center'>
          <span className='text-sm'>
            Ngày đặt hàng: <span className='font-medium'>{format(item.createdAt, 'dd-MM-yyyy HH:mm:ss')}</span>
          </span>
          <div>
            {item.status === 4 && (
              <span className='text-emerald-600 mb-1 pr-2 text-sm border-r-2'>
                <FontAwesomeIcon icon={faTruck} className='mr-2' />
                Đặt hàng thành công
              </span>
            )}
            <span className='text-red-600 ml-2 font-medium'>{item.status == 4 ? 'HOÀN THÀNH' : statusMessage.toUpperCase()}</span>
          </div>
        </div>
        {item.Books &&
          item.Books.map((element) => {
            const priceAfterDiscount = (element.price * (100 - element.discount)) / 100
            return (
              <>
                <NavLink key={element.id} to={`/chi-tiet-sach/${element.slug}/${element.id}`}>
                  <div className='mt-4 border-t border-gray-200'>
                    <div className='flex py-2 items-center'>
                      <img src={element.image} alt='' className='h-20 mr-4' />
                      <a href='' className='basis-2/3 text-gray-600'>
                        {element.name}
                      </a>
                      <span className='basis-1/5 text-center'>x{element.Book_Order.quantity}</span>
                      <div>
                        <span className='line-through text-gray-500 mr-2 text-sm'>{formatPriceVND(element.price)}</span>
                        <span className='font-medium text-red-600'>{formatPriceVND(priceAfterDiscount)}</span>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </>
            )
          })}

        <div className='mt-4 border-t border-gray-200'>
          <div className='flex justify-end items-center mt-4'>
            {item.status === 3 && !onHideBtnConfirmOrder && (
              <Button onClick={() => confirmOrder(4, item.id)} danger type='primary' className='!bg-red-600 mr-4'>
                ĐÃ NHẬN ĐƯỢC HÀNG
              </Button>
            )}
            {item.status === 1 && (
              <Button onClick={() => confirmOrder(5, item.id)} danger type='primary' className='!bg-red-600 mr-4'>
                HỦY ĐƠN HÀNG
              </Button>
            )}
            <span className='text-gray-500 pr-2'>
              <FontAwesomeIcon icon={faDollar} className='mr-2 text-red-600 text-xl' />
              Thành tiền:
            </span>
            <span className='text-red-600 ml-2 text-xl font-medium'>{formatPriceVND(item.totalOrderPrice)}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListOrderItem
