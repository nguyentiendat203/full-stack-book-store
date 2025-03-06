import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Rate } from 'antd'
import { OpenAIOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import bookAPI from '~/api/bookAPI'
import cartAPI from '~/api/cartAPI'
import { AuthContext } from '~/context/AuthContext'
import { capitalizeWords } from '~/utils/capitalizeWords'
import { formatPriceVND } from '~/utils/formatPriceVND'
import CountQuantity from '../CountQuantity'
import ListBook from '~/pages/Home/ListBook/ListBook'
import Review from './Review/Review'

function BookDetail() {
  const { id } = useParams()
  const { currentUser, countQuantityCart } = useContext(AuthContext)
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
        const resRecommend = await cartAPI.getRecommend(currentUser?.id)
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
      await cartAPI.addToCart(currentUser.id, { bookId: book.id, quantity })
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
      <div className='p-2'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mb-4'>
          <div className='flex flex-col items-center bg-white p-4 rounded-lg'>
            <img src={book.image} alt='Product' className='w-full h-auto' />
            {book.stock == 0 && <span className='text-red-600 my-2 text-sm'>* Sách {book.name} hiện tại đã hết hàng</span>}
            <div className='flex items-center justify-between w-full mt-2'>
              {book.stock == 0 ? (
                <>
                  <Button disabled danger className='h-10 font-medium'>
                    <FontAwesomeIcon icon={faCartShopping} />
                    Thêm vào giỏ hàng
                  </Button>
                  <Button type='primary' disabled danger className='basis-3/6 h-10 font-medium ml-2'>
                    Mua ngay
                  </Button>
                </>
              ) : (
                <>
                  <Button danger className='h-10 font-medium' onClick={handleAddToCart}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    Thêm vào giỏ hàng
                  </Button>
                  <Button type='primary' danger className='basis-3/6 h-10 font-medium ml-2' onClick={handleBuyNow}>
                    Mua ngay
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className='col-span-2 flex flex-col gap-4'>
            <div className='bg-white p-4 text-sm rounded-lg'>
              <p className='text-3xl mb-4'>{book.name}</p>
              <div className='flex flex-col justify-between text-sm my-2'>
                <span>
                  Nhà cung cấp: <span className='font-medium text-blue-400'>{book.Supplier && book.Supplier.name}</span>
                </span>
                <span className='my-2'>
                  Tác giả: <span className='font-medium'>{book.author}</span>
                </span>
                <span>
                  Thể loại: <span className='font-medium'>{book.Category && book.Category.name}</span>
                </span>
              </div>
              <div>
                <Rate allowHalf value={book.ratingsAverage} disabled className='text-sm' />
                <span className='text-yellow-400 ml-2 pr-2 border-r-2'>({book.totalRating || 0} đánh giá)</span>
                <span className='text-gray-400 ml-2'>
                  Đã bán: <span className='text-gray-600'>{book.sold || 0}</span>
                </span>
              </div>
              <div className='mt-2'>
                <span className='text-red-600 font-medium text-3xl mr-2 '>{book.price && formatPriceVND((book.price * (100 - book.discount)) / 100)}</span>
                <span className='text-gray-400 line-through text-sm mr-2'>{book.price && formatPriceVND(book.price)}</span>
                <span className='p-2 bg-red-600 text-white rounded-lg font-medium'>{`-${book.discount}%`}</span>
              </div>
              <div className='mt-4 flex items-center'>
                <span className='block mb-2 mr-6 text-lg'>Số lượng:</span>
                <div className='flex items-center justify-between border-solid border-2 border-gray-200 rounded-lg'>
                  <CountQuantity quantity={quantity} setQuantity={setQuantity} />
                </div>
                {error && <span className='fonr-medium text-red-600 ml-2'>{error}</span>}
              </div>
            </div>

            <div className='bg-white rounded-lg p-4 '>
              <p className='text-lg font-medium my-2'>Thông tin chi tiết</p>
              <table className='w-full text-sm'>
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
        {listBooksRecommend?.length > 0 && <ListBook listBooks={listBooksRecommend} noPaginate title='Fahasa gợi ý' iconTitle={<OpenAIOutlined />} />}
        <Review book={book} setBook={setBook} />
      </div>
    </>
  )
}

export default BookDetail
