import { NavLink } from 'react-router-dom'
import { formatPriceVND } from '~/utils/formatPriceVND'

function OrderItem({ order }) {
  return (
    <>
      <div key={order.id} className='bg-white rounded-lg mb-4'>
        {order.Books &&
          order.Books.map((element) => {
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
      </div>
    </>
  )
}

export default OrderItem
