import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Rate } from 'antd'
import { OpenAIOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import bookAPI from '~/api/bookAPI'
import cartAPI from '~/api/cartAPI'
import { capitalizeWords } from '~/utils/capitalizeWords'
import { formatPriceVND } from '~/utils/formatPriceVND'
import CountQuantity from '../CountQuantity'
import ListBook from '~/pages/Home/ListBook/ListBook'
import Review from './Review/Review'
import useAuthStore from '~/store/useAuthStore'
import useCartStore from '~/store/useCartStore'

function BookDetail() {
  const { id } = useParams()
  const { currentUser } = useAuthStore()
  const { countQuantityCart } = useCartStore()
  const navigate = useNavigate()

  const [listBooksRecommend, setListBooksRecommend] = useState([])
  const [book, setBook] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDataDetailBook = async () => {
      try {
        const res = await bookAPI.getBook(id)
        setBook(res)
        const resRecommend = await bookAPI.getRecommend(currentUser?.id)
        const newResRecommend = []
        await Promise.all(
          resRecommend.map(async (id) => {
            const book = await bookAPI.getBook(id)
            newResRecommend.push(book)
          })
        )
        setListBooksRecommend(newResRecommend)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDataDetailBook()
  }, [id])

  const handleAddToCart = async () => {
    try {
      if (!currentUser) {
        toast.info('Bạn cần phải đăng nhập')
      }
      await cartAPI.addToCart({ bookId: book.id, quantity })
      await countQuantityCart(currentUser.id)
      toast.success('Thêm vào giỏ hàng thành công')
    } catch (error) {
      setError(error.response?.data?.message)
    }
  }
  const handleBuyNow = async () => {
    try {
      await handleAddToCart()
      navigate('/my-cart')
    } catch (error) {
      setError(error.response?.data?.message)
    }
  }

  return (
    <>
      <div className='p-2 lg:p-8'>
        <div className='flex flex-col lg:grid lg:grid-cols-3 gap-4 mb-4'>
          {/* Book Image & Actions */}
          <div className='flex flex-col items-center bg-white p-4 rounded-lg w-full lg:col-span-1'>
            <img src={book.image} alt='Product' className='w-full max-w-xs h-auto object-contain rounded-md mb-2' />
            {book.stock == 0 && <span className='text-red-600 my-2 text-xs sm:text-sm text-center'>* Sách {book.name} hiện tại đã hết hàng</span>}
            <div className='w-full bg-white mt-4 rounded-lg lg:hidden'>
              <p className='text-2xl mb-4 font-semibold'>{book.name}</p>
              <div className='flex flex-col gap-4 text-sm my-2'>
                <span>
                  Nhà cung cấp: <span className='font-medium text-blue-400'>{book.Supplier && book.Supplier.name}</span>
                </span>
                <span className='my-1 sm:my-0'>
                  Tác giả: <span className='font-medium'>{book.author}</span>
                </span>
                <span>
                  Thể loại: <span className='font-medium'>{book.Category && book.Category.name}</span>
                </span>
              </div>
              <div className='flex flex-wrap items-center gap-2'>
                <Rate allowHalf value={book.ratingsAverage} disabled className='text-xs sm:text-sm' />
                <span className='text-yellow-400 ml-2 pr-2 border-r-2 border-gray-200'>({book.totalRating || 0} đánh giá)</span>
                <span className='text-gray-400 ml-2'>
                  Đã bán: <span className='text-gray-600'>{book.sold || 0}</span>
                </span>
              </div>
              <div className='mt-2 flex flex-wrap items-center gap-2'>
                <span className='text-red-600 font-medium text-2xl mr-2'>{formatPriceVND(String(book?.discountedPrice))}</span>
                <span className='text-gray-400 line-through mr-2'>{book.price && formatPriceVND(book.price)}</span>
                <span className='p-2 bg-red-600 text-white rounded-lg font-medium text-xs sm:text-sm'>{`-${book.discount}%`}</span>
              </div>
              <div className='mt-4 flex flex-row items-center gap-2'>
                <span className=''>Số lượng:</span>
                <div className='flex items-center border-solid border-2 border-gray-200 rounded-lg'>
                  <CountQuantity quantity={quantity} setQuantity={setQuantity} />
                </div>
                {error && <span className='font-medium text-red-600 ml-2'>{error}</span>}
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-between md:justify-start w-full mt-2'>
              {book.stock == 0 ? (
                <>
                  <Button disabled danger className='h-10 w-full xs:w-1/2 sm:w-auto font-medium'>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span className='ml-2'>Thêm vào giỏ hàng</span>
                  </Button>
                  <Button type='primary' disabled danger className='h-10 w-full xs:flex-1 sm:w-auto font-medium  mt-2'>
                    Mua ngay
                  </Button>
                </>
              ) : (
                <>
                  <Button danger className='h-10 w-full md:w-1/2 font-medium' onClick={handleAddToCart}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span>Thêm vào giỏ hàng</span>
                  </Button>
                  <Button type='primary' danger className='h-10 w-full md:w-1/2 font-medium' onClick={handleBuyNow}>
                    Mua ngay
                  </Button>
                </>
              )}
            </div>
          </div>
          {/* Book Info & Details */}
          <div className='col-span-2 flex flex-col gap-4 w-full'>
            <div className='hidden lg:block bg-white p-4 text-xs sm:text-sm rounded-lg'>
              <p className='text-xl sm:text-2xl md:text-3xl mb-4 font-semibold'>{book.name}</p>
              <div className='flex flex-col sm:flex-row sm:items-center sm:gap-8 text-xs sm:text-sm my-2'>
                <span>
                  Nhà cung cấp: <span className='font-medium text-blue-400'>{book.Supplier && book.Supplier.name}</span>
                </span>
                <span className='my-1 sm:my-0'>
                  Tác giả: <span className='font-medium'>{book.author}</span>
                </span>
                <span>
                  Thể loại: <span className='font-medium'>{book.Category && book.Category.name}</span>
                </span>
              </div>
              <div className='flex flex-wrap items-center gap-2'>
                <Rate allowHalf value={book.ratingsAverage} disabled className='text-xs sm:text-sm' />
                <span className='text-yellow-400 ml-2 pr-2 border-r-2 border-gray-200'>({book.totalRating || 0} đánh giá)</span>
                <span className='text-gray-400 ml-2'>
                  Đã bán: <span className='text-gray-600'>{book.sold || 0}</span>
                </span>
              </div>
              <div className='mt-2 flex flex-wrap items-center gap-2'>
                <span className='text-red-600 font-medium text-xl sm:text-2xl md:text-3xl mr-2'>{formatPriceVND(String(book?.discountedPrice))}</span>
                <span className='text-gray-400 line-through text-xs sm:text-sm mr-2'>{book.price && formatPriceVND(book.price)}</span>
                <span className='p-2 bg-red-600 text-white rounded-lg font-medium text-xs sm:text-sm'>{`-${book.discount}%`}</span>
              </div>
              <div className='mt-4 flex flex-col sm:flex-row items-center gap-2'>
                <span className='block mb-2 sm:mb-0 sm:mr-6 text-base sm:text-lg'>Số lượng:</span>
                <div className='flex items-center border-solid border-2 border-gray-200 rounded-lg'>
                  <CountQuantity quantity={quantity} setQuantity={setQuantity} />
                </div>
                {error && <span className='font-medium text-red-600 ml-2'>{error}</span>}
              </div>
            </div>
            <div className='bg-white rounded-lg p-4'>
              <p className='text-base sm:text-lg font-medium my-2'>Thông tin chi tiết</p>
              <div className='overflow-x-auto'>
                <table className='w-full text-xs sm:text-sm min-w-[400px]'>
                  <tbody>
                    <tr className='h-10 border-b border-gray-100'>
                      <td className='text-gray-400 w-4/12'>Mã sách</td>
                      <td>{book.id}</td>
                    </tr>
                    <tr className='h-10 border-b border-gray-100'>
                      <td className='text-gray-400 w-4/12'>Tên Nhà Cung Cấp</td>
                      <td>{book.Supplier && book.Supplier.name}</td>
                    </tr>
                    <tr className='h-10 border-b border-gray-100'>
                      <td className='text-gray-400 w-4/12'>Tác giả</td>
                      <td className='font-medium text-blue-400'>
                        <a href=''>{capitalizeWords(`${book.author}`)}</a>
                      </td>
                    </tr>
                    <tr className='h-10 border-b border-gray-100'>
                      <td className='text-gray-400 w-4/12'>Năm XB</td>
                      <td>{book.publishingYear}</td>
                    </tr>
                    <tr className='h-10 border-b border-gray-100'>
                      <td className='text-gray-400 w-4/12'>Số trang</td>
                      <td>{book.pageNumber}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4'>
          <Review book={book} setBook={setBook} />
        </div>
        {listBooksRecommend?.length > 0 && (
          <div className='mt-4'>
            <ListBook listBooks={listBooksRecommend} noPaginate title='Fahasa gợi ý' iconTitle={<OpenAIOutlined />} />
          </div>
        )}
      </div>
    </>
  )
}

export default BookDetail
