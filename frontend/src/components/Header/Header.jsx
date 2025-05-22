import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'

import fahasa from '~/assets/fahasa-logo.webp'
import Notification from './DropDowns/Notification'
import Cart from './DropDowns/Cart'
import Profile from './DropDowns/Profile'
import { NavLink } from 'react-router-dom'
import { RiseOutlined, SettingOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import bookAPI from '~/api/bookAPI'
import { toast } from 'react-toastify'
import useDebounce from '~/hooks/useDebounce'
import { Empty } from 'antd'
import Category from '~/components/Header/DropDowns/Category/Category'
import useAuthStore from '~/store/useAuthStore'
import useCartStore from '~/store/useCartStore'
import { faMedapps } from '@fortawesome/free-brands-svg-icons'

function Header() {
  const { currentUser } = useAuthStore()
  const { countQuantityCart } = useCartStore()

  const [listBooksSearch, setListBooksSearch] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [showResult, setShowResult] = useState(false)

  const valueSearchDebounce = useDebounce(searchValue, 500)

  const fetchDataRecommendBook = async () => {
    try {
      const resRecommend = await bookAPI.getRecommend(currentUser?.id)
      const newResRecommend = []
      await Promise.all(
        resRecommend.map(async (id) => {
          const book = await bookAPI.getBook(id)
          newResRecommend.push(book)
        })
      )
      setListBooksSearch(newResRecommend)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleChange = (e) => {
    const searchValue = e.target.value
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
  }

  useEffect(() => {
    fetchDataRecommendBook()
    countQuantityCart()
  }, [])

  useEffect(() => {
    if (!valueSearchDebounce.trim()) {
      fetchDataRecommendBook()
      return
    }

    const fetchListBooksSearch = async () => {
      try {
        const res = await bookAPI.searchBook(valueSearchDebounce)
        setListBooksSearch(res)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchListBooksSearch()
  }, [valueSearchDebounce])

  return (
    <>
      <header className='fixed top-0 left-0 w-full z-50 flex flex-col text-white transition-all duration-300 lg:static lg:shadow-none'>
        <div className='bg-red-600 flex justify-center p-2'>
          <NavLink to='/' className='lg:hidden'>
            <img src={fahasa} className='w-36' alt='none' />
          </NavLink>
          <img className='hidden lg:block' src='https://cdn0.fahasa.com/media/wysiwyg/Thang-07-2024/NCCPlus_T07_Header_1263x60.jpg' alt='none' />
        </div>
        <div className='lg:w-10/12 py-4 md:w-full md:mx-auto md:p-3 bg-red-600 lg:bg-white'>
          <div className='flex justify-between items-center h-full'>
            <div className='hidden lg:block w-48 lg:w-56 mb-1'>
              <NavLink to='/'>
                <img src={fahasa} alt='none' />
              </NavLink>
            </div>
            <Category />

            <div className='mx-3 flex-1 lg:flex-none lg:w-1/2'>
              <div className='flex items-center relative'>
                <input
                  className=' md:block w-full h-11 rounded-lg pl-4 md:pl-8 pr-20 md:pb-1 text-gray-800 border-solid border-2 border-gray-200 outline-none'
                  type='text'
                  placeholder='Tìm kiếm sách...'
                  value={searchValue}
                  onChange={handleChange}
                  onFocus={() => setShowResult(true)}
                />
                <button className='hidden md:block w-20 h-8 bg-red-600 p-1 rounded-lg absolute right-1'>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                {/* Dropdown for search results */}
                {showResult && (
                  <>
                    <div className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300'></div>
                    <div className='fixed inset-0 lg:absolute md:top-12 md:w-full bg-white p-2 md:p-4 rounded-md shadow-2xl text-gray-700 z-50 lg:h-96 overflow-y-auto border border-gray-200'>
                      <div className='p-2'>
                        <input
                          className='lg:hidden z-50 w-full h-11 rounded-lg pl-4 pr-10 text-gray-800 border-solid border-2 border-gray-200 outline-none'
                          type='text'
                          placeholder='Tìm kiếm sách...'
                          value={searchValue}
                          onChange={handleChange}
                          onFocus={() => setShowResult(true)}
                        />
                      </div>
                      {listBooksSearch?.length > 0 ? (
                        <>
                          <div className='text-lg font-medium'>
                            <div className='flex items-center justify-between p-2'>
                              <p>
                                {!valueSearchDebounce ? (
                                  <>
                                    <FontAwesomeIcon className='size-5 md:text-gray-500' icon={faMedapps} />
                                    <span> Fahasa gợi ý cho bạn </span>
                                  </>
                                ) : (
                                  <>
                                    <RiseOutlined className='mr-2' />
                                    Sản phẩm
                                  </>
                                )}
                              </p>
                              <FontAwesomeIcon onClick={() => setShowResult(false)} className='cursor-pointer size-7 md:text-gray-500' icon={faXmark} />
                            </div>
                          </div>
                          <div className='grid grid-cols-2'>
                            {listBooksSearch.map((book) => (
                              <NavLink
                                key={book.id}
                                to={`/chi-tiet-sach/${book.slug}/${book.id}`}
                                onClick={() => {
                                  setShowResult(false)
                                  setSearchValue('')
                                }}
                              >
                                <div className='flex items-center mt-4 hover:shadow-md rounded p-2'>
                                  <img src={book.image} alt='' className='h-20 w-18 mr-4' />
                                  <p className='text-sm line-clamp-2'>{book.name}</p>
                                </div>
                              </NavLink>
                            ))}
                          </div>
                        </>
                      ) : (
                        <Empty />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className='flex justify-center'>
              <Notification />
              <Cart />
              <Profile />
              {currentUser && currentUser.groupId !== 1 && (
                <NavLink to='/dash-board'>
                  <div className='hidden text-gray-500 text-sm lg:flex flex-col  items-center'>
                    <SettingOutlined className='text-lg' />
                    <span className='text-xs'>Dashboard</span>
                  </div>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
