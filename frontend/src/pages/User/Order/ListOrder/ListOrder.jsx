import { Button, Empty } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollar } from '@fortawesome/free-solid-svg-icons'
import { formatPriceVND } from '~/utils/formatPriceVND'
import OrderItem from '~/pages/User/Order/ListOrder/OrderItem/OrderItem'
import { HeaderListOrder } from '~/pages/User/Order/ListOrder/HeaderListOrder/HeaderListOrder'
import useOrderStore from '~/store/useOrderStore'

function ListOrder({ listOrder, statusMessage, onHideBtnConfirmOrder }) {
  const { confirmOrder } = useOrderStore()

  return (
    <>
      <div className='flex flex-col'>
        {listOrder?.length > 0 ? (
          listOrder.map((item) => {
            return (
              <>
                <div className='bg-white rounded-lg p-4 mb-4' key={item.id}>
                  <HeaderListOrder order={item} statusMessage={statusMessage} />
                  <OrderItem order={item} />
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
          })
        ) : (
          <Empty />
        )}
      </div>
    </>
  )
}

export default ListOrder
