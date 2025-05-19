import { useEffect, useState } from 'react'
import { faArrowLeft, faArrowRight, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import ListBook from './ListBook/ListBook'
import bookAPI from '~/api/bookAPI'
import { toast } from 'react-toastify'

function Home() {
  const [listBooks, setListBooks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)

  const fetchAllBook = async () => {
    try {
      const res = await bookAPI.getAllBook(currentPage, 10)
      setListBooks(res.books)
      setTotalRecords(res.totalRows)
    } catch (error) {
      toast.error(error.response.message)
    }
  }
  useEffect(() => {
    fetchAllBook()
  }, [currentPage])

  return (
    <>
      <div className='rounded-lg mb-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='md:col-span-2 col-span-1'>
          <div className='relative group h-48 md:h-full'>
            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: '.custom-swiper-next',
                prevEl: '.custom-swiper-prev'
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              className='w-full h-full md:rounded-lg'
            >
              <SwiperSlide>
                <div className='relative w-full h-48 md:h-full'>
                  <img
                    src='https://readdy.ai/api/search-image?query=A%20stunning%20modern%20library%20interior%20with%20rows%20of%20books%2C%20warm%20lighting%2C%20and%20people%20browsing%20through%20shelves%2C%20creating%20an%20inviting%20atmosphere%20for%20book%20lovers%2C%20professional%20architectural%20photography&width=1440&height=500&seq=13&orientation=landscape'
                    alt='Library interior'
                    className='w-full h-48 md:h-full object-cover md:rounded-lg'
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='relative w-full h-48 md:h-full'>
                  <img
                    src='https://readdy.ai/api/search-image?query=A%20stunning%20modern%20library%20interior%20with%20rows%20of%20books%2C%20warm%20lighting%2C%20and%20people%20browsing%20through%20shelves%2C%20creating%20an%20inviting%20atmosphere%20for%20book%20lovers%2C%20professional%20architectural%20photography&width=1440&height=500&seq=13&orientation=landscape'
                    alt='Library interior'
                    className='w-full h-48 md:h-full object-cover md:rounded-lg'
                  />
                </div>
              </SwiperSlide>
              {/* Custom navigation buttons */}
              <button
                type='button'
                className='hidden custom-swiper-prev absolute top-1/2 left-1 z-10 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 md:flex items-center justify-center shadow-md transition-all duration-200'
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                type='button'
                className='hidden custom-swiper-next absolute top-1/2 right-1 z-10 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 md:flex items-center justify-center shadow-md transition-all duration-200'
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Swiper>
          </div>
        </div>
        <div className='hidden md:flex flex-row md:flex-col gap-3 h-full justify-between mt-3 md:mt-0'>
          <img src='/banner2.webp' alt='Banner' className='h-20 md:h-36 object-cover rounded-lg w-1/2 md:w-full' />
          <img src='/banner3.webp' alt='Banner' className='h-20 md:h-36 object-cover rounded-lg w-1/2 md:w-full' />
        </div>
      </div>
      <ListBook
        listBooks={listBooks}
        setCurrentPage={setCurrentPage}
        totalRecords={totalRecords}
        currentLimit={10}
        iconTitle={<FontAwesomeIcon icon={faList} />}
        title='Tất cả sản phẩm'
      />
    </>
  )
}

export default Home
