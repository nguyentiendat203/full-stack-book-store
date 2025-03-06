import { Button, Progress, Rate } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Input } from 'antd'
import { format } from 'date-fns'
const { TextArea } = Input

import { AuthContext } from '~/context/AuthContext'
import { CommentOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import reviewAPI from '~/api/reviewAPI'
import { toast } from 'react-toastify'

function Review({ book, setBook }) {
  const { currentUser } = useContext(AuthContext)

  const [listReviews, setListReviews] = useState([])
  const [contentReview, setContentReview] = useState('')
  const [rate, setRate] = useState('')
  const [isErrorInput, setIsErrorInput] = useState(true)

  const handleReview = async () => {
    try {
      if (!contentReview) {
        setIsErrorInput(false)
        return
      }
      const res = await reviewAPI.createReview({ review: contentReview, rate: rate, userId: currentUser.id, bookId: book.id })
      toast.success('Đã đánh giá thành công')
      setIsErrorInput(true)
      setContentReview('')
      setBook(res.book)
      fetchAllReviews()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const fetchAllReviews = async () => {
    try {
      const res = await reviewAPI.getAllReviews(book.id)
      setListReviews(res)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchAllReviews()
  }, [book])

  return (
    <>
      <div className='bg-white p-4 mt-4 rounded-l-lg'>
        <p className='text-lg font-medium rounded-t-lg'>
          <CommentOutlined className='mr-2' />
          Đánh giá sản phẩm
        </p>
        <div className='flex mt-4'>
          <div className='basis-1/2  mr-8'>
            <div className='flex'>
              <div className='w-1/4 flex flex-col items-center justify-evenly mr-4'>
                <p>
                  <span className='text-4xl font-medium'>{book.ratingsAverage}</span>/5
                </p>
                <Rate allowHalf value={book.ratingsAverage} disabled className='text-sm' />
                <p className='text-gray-500 text-sm'>({book.totalRating || 0} đánh giá)</p>
              </div>
              <div className='flex-1'>
                <div className='flex'>
                  <span className='w-12 mr-2'>5 sao</span>
                  <Progress percent={50} strokeColor='red' />
                </div>
                <div className='flex'>
                  <span className='w-12 mr-2'>4 sao</span>
                  <Progress percent={50} strokeColor='red' />
                </div>
                <div className='flex'>
                  <span className='w-12 mr-2'>3 sao</span>
                  <Progress percent={50} strokeColor='red' />
                </div>
                <div className='flex'>
                  <span className='w-12 mr-2'>2 sao</span>
                  <Progress percent={50} strokeColor='red' />
                </div>
                <div className='flex'>
                  <span className='w-12 mr-2'>1 sao</span>
                  <Progress percent={50} strokeColor='red' />
                </div>
              </div>
            </div>
            {currentUser ? (
              <>
                <div className='mt-4'>
                  <p className='mb-2'>
                    <p>Đánh giá của bạn:</p>
                    <Rate allowClear={false} defaultValue={5} className='text-2xl' onChange={(value) => setRate(value)} />
                  </p>
                  <TextArea
                    allowClear
                    placeholder='Nhận xét của bạn về sản phẩm'
                    autoSize={{
                      minRows: 3,
                      maxRows: 5
                    }}
                    status={!isErrorInput && 'error'}
                    onChange={(e) => setContentReview(e.target.value)}
                  />
                  {!isErrorInput && <span className='text-xs text-red-600'>Thông tin này là bắt buộc. Vui lòng nhập.</span>}
                  <div className='mt-2 float-right'>
                    <Button danger type='primary' className='!bg-red-600 font-medium ml-2' onClick={handleReview}>
                      Gửi nhận xét
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <p className='text-sm text-center mt-6'>
                Chỉ có thành viên mới có thể viết nhận xét. Vui lòng&nbsp;
                <NavLink className='text-blue-500 hover:text-red-600 font-medium' to='/login'>
                  đăng nhập&nbsp;
                </NavLink>
                hoặc&nbsp;
                <NavLink className='text-blue-500 hover:text-red-600 font-medium' to='/register'>
                  đăng ký.
                </NavLink>
              </p>
            )}
          </div>

          <div className='flex-1'>
            <div className='flex flex-col mb-4'>
              {listReviews?.length > 0 ? (
                listReviews.map((item) => {
                  return (
                    <>
                      <div key={item.id} className=' mb-4'>
                        <div className='flex items-center mb-2'>
                          <img src={item.User.avatar} className='h-10 w-10 rounded-full object-cover mr-2' />
                          <div className='flex flex-col text-xs text-gray-500'>
                            <span className='font-medium text-sm text-gray-700'>
                              {item.User.firstName} {item.User.lastName}
                            </span>
                            <Rate allowHalf value={item.rate} disabled className='text-xs' />
                            <span>{format(item.createdAt, 'dd-MM-yyyy HH:mm:ss')}</span>
                          </div>
                        </div>
                        <div className='bg-gray-100 p-2 px-4 rounded'>
                          <span className='text-sm font-medium'>Phản Hồi Của Người Mua</span> <br />
                          <p className='text-gray-500 mt-2'>{item.review}</p>
                        </div>
                      </div>
                    </>
                  )
                })
              ) : (
                <p className='text-center text-gray-500'>Chưa có đánh giá</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Review
