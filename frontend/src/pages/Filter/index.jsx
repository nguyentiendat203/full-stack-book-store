import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import bookAPI from '~/api/bookAPI'
import { categoryAPI } from '~/api/categoryAPI'
import { CardBook } from '~/components/CardBook'
import { Sidebar } from '~/pages/Filter/Sidebar'
import useBookStore from '~/store/useBookStore'
import { Spin } from 'antd'

export default function FilterPage() {
  const { parentId, id } = useParams()
  const { subcategories, category, idSubCate, setIdSubCate, idCategory, books, setBooks, sortBy, setSortBy, itemsPerPage, setItemsPerPage } = useBookStore()

  const [subCateName, setSubCateName] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchAllBook = (page, limit, categoryId, subCateId, sortBy, minPrice, maxPrice) => {
    setLoading(true)
    bookAPI
      .getAllBook(page, limit, categoryId, subCateId, sortBy, minPrice, maxPrice)
      .then((res) => {
        setBooks(res.books)
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 250)
      })
  }

  useEffect(() => {
    categoryAPI
      .getSubCategories(parentId)
      .then((res) => {
        subcategories(res)
        fetchAllBook(1, itemsPerPage, parentId, null, sortBy)
      })
      .catch((error) => {
        console.error('Error fetching subcategories:', error)
      })
  }, [parentId])

  useEffect(() => {
    const cate = subcategories.find((sub) => sub.id === idSubCate)
    if (cate) {
      setSubCateName(cate.name)
    }
    if (id) {
      fetchAllBook(1, itemsPerPage, null, id, sortBy)
    } else {
      fetchAllBook(1, itemsPerPage, parentId, null, sortBy)
    }
  }, [id])

  return (
    <div className='container mx-aut'>
      {/* Breadcrumb */}
      <div className='flex items-center gap-2 text-sm text-gray-500 mb-2'>
        <a href='/' className='text-gray-600 hover:text-red-600'>
          TRANG CHỦ
        </a>

        <FontAwesomeIcon icon={faChevronRight} />
        <NavLink to={`/filter/${idCategory}`} onClick={() => setIdSubCate('')} className={`text-gray-600  ${!idSubCate ? 'text-orange-500 font-medium' : ''}`}>
          {category}
        </NavLink>

        {id && (
          <>
            <FontAwesomeIcon icon={faChevronRight} />
            <a href='#' className='text-orange-500 font-medium'>
              {subCateName}
            </a>
          </>
        )}
      </div>

      <div className='flex gap-5'>
        {/* Filters Sidebar */}
        <Sidebar />
        {/* Products Grid */}
        <div className='flex-1 bg-white rounded-lg shadow'>
          {/* Sort Controls */}
          <div className='flex items-center justify-between p-6 border-b'>
            <div className='flex items-center gap-4'>
              <span className='text-sm'>Sắp xếp theo:</span>
              <div className='relative'>
                <select
                  // value={sortBy}
                  onChange={(e) => {
                    const selectedValue = e.target.value
                    setSortBy(selectedValue)
                    if (id) {
                      fetchAllBook(1, itemsPerPage, null, id, selectedValue)
                    } else {
                      fetchAllBook(1, itemsPerPage, parentId, null, selectedValue)
                    }
                  }}
                  className='appearance-none cursor-pointer outline-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm'
                >
                  <option value='oldest'>Cũ Nhất</option>
                  <option value='latest'>Mới Nhất</option>
                  <option value='price_asc'>Giá Thấp Đến Cao</option>
                  <option value='price_desc'>Giá Cao Đến Thấp</option>
                </select>
                <FontAwesomeIcon className='w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500' icon={faChevronDown} />
              </div>
              <div className='relative'>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    const newLimit = parseInt(e.target.value)
                    setItemsPerPage(newLimit)
                    if (id) {
                      fetchAllBook(1, newLimit, null, id, sortBy)
                    } else {
                      fetchAllBook(1, newLimit, parentId, null, sortBy)
                    }
                  }}
                  className='appearance-none cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm outline-none'
                >
                  <option value='12'>12 sản phẩm</option>
                  <option value='24'>24 sản phẩm</option>
                  <option value='36'>36 sản phẩm</option>
                </select>
                <FontAwesomeIcon className='w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500' icon={faChevronDown} />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className='flex justify-center items-center pt-32'>
              <Spin size='large' />
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-2'>
              {books.map((product) => (
                <>
                  <CardBook book={product} />
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
