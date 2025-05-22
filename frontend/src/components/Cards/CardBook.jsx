import { Badge, Rate } from 'antd'
import { NavLink } from 'react-router-dom'

export const CardBook = ({ book }) => {
  return (
    <NavLink key={book.id} to={`/chi-tiet-sach/${book.slug}/${book.id}`} className='rounded-lg hover:shadow-md'>
      <Badge.Ribbon text={`-${book.discount}%`} color='red'>
        <div className='p-4'>
          <div>
            <img src={book.image} alt='Product' className='w-full h-48 object-cover rounded-lg mb-4' />
          </div>
          <div>
            <p className='text-sm text-gray-700 h-12 py-2  line-clamp-2 '>{book.name}</p>

            <div className='h-10 my-2'>
              <span className='text-red-600 font-medium text-xl'>{book.discountedPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
              <p className='text-gray-400 line-through text-sm'>{book.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
            </div>
            <div className='flex justify-between items-center'>
              <div>
                <Rate allowHalf defaultValue={book.ratingsAverage} disabled className='text-sm' />
              </div>
            </div>
            <p className='text-gray-400 text-xs'>
              Đã bán: <span className='text-gray-600'>{book.sold || 0}</span>
            </p>
          </div>
        </div>
      </Badge.Ribbon>
    </NavLink>
  )
}
