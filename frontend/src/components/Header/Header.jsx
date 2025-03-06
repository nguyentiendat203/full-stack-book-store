import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import fahasa from '~/assets/fahasa-logo.webp'
import Notification from './DropDowns/Notification'
import Cart from './DropDowns/Cart'
import Profile from './DropDowns/Profile'
import { NavLink, useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react/headless'
import { AppstoreOutlined, RiseOutlined, SettingOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '~/context/AuthContext'
import cartAPI from '~/api/cartAPI'
import bookAPI from '~/api/bookAPI'
import { toast } from 'react-toastify'
import useDebounce from '~/hooks/useDebounce'
import { Empty } from 'antd'

function Header() {
  const { currentUser } = useContext(AuthContext)
  const [listBooksSearch, setListBooksSearch] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [showResult, setShowResult] = useState(false)
  const navigate = useNavigate()

  const valueSearchDebounce = useDebounce(searchValue, 500)

  const fetchDataRecommendBook = async () => {
    try {
      const resRecommend = await cartAPI.getRecommend(currentUser?.id)
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

  const handleHideResult = () => {
    setShowResult(false)
  }

  useEffect(() => {
    fetchDataRecommendBook()
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
      <header className='flex flex-col text-white'>
        <div className='flex justify-center  bg-red-600'>
          <img src='https://cdn0.fahasa.com/media/wysiwyg/Thang-07-2024/NCCPlus_T07_Header_1263x60.jpg' alt='none' />
        </div>
        <div className='h-20 p-2 bg-white'>
          <div className='w-10/12 2xl:w-8/12 mx-auto flex justify-between items-center h-full '>
            <div className='w-56 mb-1'>
              <NavLink to='/'>
                <img src={fahasa} alt='none' />
              </NavLink>
            </div>

            <div className='flex-1 mx-6 w-full'>
              <div className='flex items-center relative'>
                <Tippy
                  placement='bottom-start'
                  interactive
                  visible={showResult}
                  onClickOutside={handleHideResult}
                  render={(attrs) => (
                    <div tabIndex='-1' style={{ width: '700px' }} className='bg-white p-6 rounded-md shadow-2xl text-gray-700' {...attrs}>
                      {listBooksSearch?.length > 0 ? (
                        <>
                          <p className='text-lg font-medium'>
                            {!valueSearchDebounce ? (
                              <>
                                <AppstoreOutlined className='mr-2' />
                                Fahasa gợi ý cho bạn
                              </>
                            ) : (
                              <>
                                <RiseOutlined className='mr-2' />
                                Sản phẩm
                              </>
                            )}
                          </p>
                          <div className='grid grid-cols-2'>
                            {listBooksSearch?.length > 0 &&
                              listBooksSearch.map((book) => {
                                return (
                                  <>
                                    <NavLink key={book.id} to={`/chi-tiet-sach/${book.slug}/${book.id}`}>
                                      <div className='flex items-center mt-4 hover:shadow-md rounded p-2'>
                                        <img src={book.image} alt='' className='h-20 w-18 mr-4' />
                                        <p className='text-sm line-clamp-2'>{book.name}</p>
                                      </div>
                                    </NavLink>
                                  </>
                                )
                              })}
                          </div>
                        </>
                      ) : (
                        <Empty />
                      )}
                    </div>
                  )}
                >
                  <input
                    className='w-full h-11 rounded-lg pl-8 pr-20 pb-1 text-gray-800 border-solid border-2 border-gray-200 outline-none'
                    type='text'
                    placeholder='Tìm kiếm sách...'
                    value={searchValue}
                    onChange={(e) => handleChange(e)}
                    onFocus={() => setShowResult(true)}
                  />
                </Tippy>

                <button className=' w-20 h-8 bg-red-600 p-1 rounded-lg absolute right-1'>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </div>
            <div className='flex justify-center'>
              <Notification />
              <Cart />
              <Profile />
              {currentUser && currentUser.groupId !== 1 && (
                <NavLink to='/dash-board/book'>
                  <div className='text-gray-500 text-sm flex flex-col  items-center mt-2'>
                    <SettingOutlined />
                    <span>Trang quản trị</span>
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
