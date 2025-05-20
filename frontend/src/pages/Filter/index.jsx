import { faChevronDown, faChevronRight, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import bookAPI from '~/api/bookAPI'
import { categoryAPI } from '~/api/categoryAPI'
import { CardBook } from '~/components/CardBook'
import { Sidebar } from '~/pages/Filter/Sidebar'
import useBookStore from '~/store/useBookStore'
import { Empty, Modal, Pagination } from 'antd'

export default function FilterPage() {
  const { parentId, id } = useParams()
  const {
    subcategories,
    setSubcategories,
    category,
    setIdCategory,
    idSubCate,
    setIdSubCate,
    idCategory,
    books,
    setBooks,
    sortBy,
    setSortBy,
    itemsPerPage,
    setItemsPerPage,
    totalRecords,
    setTotalRecords
  } = useBookStore()

  const [subCateName, setSubCateName] = useState('')
  const [loading, setLoading] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [minPrice, setMinPrice] = useState()
  const [maxPrice, setMaxPrice] = useState()

  const fetchAllBook = (page, limit, categoryId, subCateId, sortBy, minPrice, maxPrice) => {
    setLoading(true)
    bookAPI
      .getAllBook(page, limit, categoryId, subCateId, sortBy, minPrice, maxPrice)
      .then((res) => {
        setBooks(res.books)
        setTotalRecords(res.totalRows)
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
      })
      .catch((error) => {
        console.error('Error fetching subcategories:', error)
      })
    if (itemsPerPage !== 12 || !itemsPerPage) {
      fetchAllBook(currentPage, 12, parentId, null, sortBy)
    } else {
      fetchAllBook(currentPage, itemsPerPage, parentId, null, sortBy)
    }
  }, [parentId])

  useEffect(() => {
    const cate = subcategories.find((sub) => sub.id === idSubCate)
    if (cate) {
      setSubCateName(cate.name)
    }
    if (id) {
      fetchAllBook(currentPage, itemsPerPage, null, id, sortBy)
    } else {
      fetchAllBook(currentPage, itemsPerPage, parentId, null, sortBy)
    }
  }, [id])

  useEffect(() => {
    fetchAllBook(currentPage, itemsPerPage, parentId, idSubCate, sortBy, minPrice, maxPrice)
    setLoading(true)
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Scroll to top
  }, [currentPage])

  // Add a blur layer when loading
  const blurLayerStyle = loading ? 'opacity-50 pointer-events-none' : ''

  return (
    <div className='container mx-aut'>
      {/* Breadcrumb */}
      <div className='hidden md:flex items-center gap-2 text-sm text-gray-600 mb-2'>
        <a href='/' className=' hover:text-red-600'>
          TRANG CHỦ
        </a>

        <FontAwesomeIcon icon={faChevronRight} />
        <NavLink
          to='/filter'
          onClick={() => {
            setIdCategory('')
            setIdSubCate('')
            setSubcategories([])
            setCurrentPage(1)
            setItemsPerPage(12)
          }}
          className={` uppercase ${!parentId ? 'text-orange-500' : ''}`}
        >
          Tất cả thể loại
        </NavLink>
        {parentId && (
          <>
            <FontAwesomeIcon icon={faChevronRight} />
            <NavLink
              to={`/filter/${idCategory}`}
              onClick={() => {
                setIdSubCate('')
                setCurrentPage(1)
                setItemsPerPage(12)
              }}
              className={`  ${!idSubCate ? 'text-orange-500 font-medium' : ''}`}
            >
              {category}
            </NavLink>
          </>
        )}

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
        <div className='hidden lg:block w-64 flex-shrink-0'>
          <Sidebar parentId={parentId} id={id} setCurrentPage={setCurrentPage} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
        </div>
        {/* Products Grid */}
        <div className='flex-1 bg-white rounded-lg shadow'>
          {/* Sort Controls */}
          <div className='flex items-center justify-between p-2 md:p-6 border-b'>
            <div className='flex w-full items-center gap-2 md:gap-4'>
              <span className='hidden md:block text-sm'>Sắp xếp theo:</span>
              <div className='relative'>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    const selectedValue = e.target.value
                    setSortBy(selectedValue)
                    if (id) {
                      fetchAllBook(1, itemsPerPage, null, id, selectedValue)
                    } else {
                      fetchAllBook(1, itemsPerPage, parentId, null, selectedValue)
                    }
                  }}
                  className='appearance-none cursor-pointer outline-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm w-full'
                >
                  <option value='oldest'>Cũ Nhất</option>
                  <option value='latest'>Mới Nhất</option>
                  <option value='price_asc'>Giá Thấp Đến Cao</option>
                  <option value='price_desc'>Giá Cao Đến Thấp</option>
                </select>
                <FontAwesomeIcon className='w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500' icon={faChevronDown} />
              </div>
              <div className='relative flex-1 md:flex-none'>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    const newLimit = parseInt(e.target.value)
                    setCurrentPage(1)
                    setItemsPerPage(newLimit)

                    if (id) {
                      fetchAllBook(1, newLimit, null, id, sortBy, minPrice, maxPrice)
                    } else if (parentId) {
                      fetchAllBook(1, newLimit, parentId, null, sortBy, minPrice, maxPrice)
                    } else {
                      fetchAllBook(1, newLimit, null, null, sortBy, minPrice, maxPrice)
                    }
                  }}
                  className='appearance-none cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm outline-none w-full'
                >
                  <option value='12'>12 sản phẩm</option>
                  <option value='20'>20 sản phẩm</option>
                  <option value='32'>32 sản phẩm</option>
                </select>
                <FontAwesomeIcon className='w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500' icon={faChevronDown} />
              </div>
              {/* Filter Icon  */}
              <div className='flex-1 flex items-center justify-end lg:hidden  gap-2'>
                <span className='text-sm md:text-md'>Bộ lọc:</span>
                <button
                  className='w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-300'
                  onClick={() => setShowFilterModal(true)}
                  aria-label='Open filter modal'
                >
                  <FontAwesomeIcon icon={faFilter} className='w-5 h-5' />
                </button>
              </div>
            </div>
          </div>
          {/* Modal Filter for mobile */}
          {showFilterModal && (
            <Modal
              title='Bộ lọc'
              open={showFilterModal}
              onCancel={() => setShowFilterModal(false)}
              footer={null}
              className='modal-filter'
              closeIcon={<FontAwesomeIcon icon={faXmark} className='text-gray-500' />}
            >
              <Sidebar parentId={parentId} id={id} setCurrentPage={setCurrentPage} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
            </Modal>
          )}
          {/* Products Grid */}
          <div className={`relative ${blurLayerStyle}`}>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2'>
              {books.map((product) => (
                <>
                  <CardBook book={product} />
                </>
              ))}
            </div>
          </div>
          {books.length === 0 ? (
            <Empty />
          ) : (
            <div className='p-5'>
              <Pagination align='end' current={currentPage} total={totalRecords} pageSize={itemsPerPage} onChange={(e) => setCurrentPage(e)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
