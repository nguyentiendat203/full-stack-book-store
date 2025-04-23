import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import bookAPI from '~/api/bookAPI'
import { categoryAPI } from '~/api/categoryAPI'
import { CardBook } from '~/components/CardBook'
import { Sidebar } from '~/pages/Filter/Sidebar'
import useBookStore from '~/store/useBookStore'

export default function FilterPage() {
  const { parentId, id } = useParams()
  const { subcategories, category, idSubCate, setIdSubCate, idCategory, books, setBooks } = useBookStore()

  const [sortBy, setSortBy] = useState('Bán Chạy Tuần')
  const [itemsPerPage, setItemsPerPage] = useState('24 sản phẩm')
  const [subCateName, setSubCateName] = useState('')

  const fetchAllBook = (page, limit, categoryId, subCateId) => {
    bookAPI.getAllBook(page, limit, categoryId, subCateId).then((res) => {
      setBooks(res.books)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryAPI.getSubCategories(parentId)
        subcategories(response)
        fetchAllBook(1, 12, parentId, null)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [parentId])

  useEffect(() => {
    const cate = subcategories.find((sub) => sub.id === idSubCate)
    if (cate) {
      setSubCateName(cate.name)
    }
    if (id) {
      fetchAllBook(1, 12, null, id)
    } else {
      fetchAllBook(1, 12, parentId, null)
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
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className='appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm'>
                  <option>Bán Chạy Tuần</option>
                  <option>Giá Thấp Đến Cao</option>
                  <option>Giá Cao Đến Thấp</option>
                  <option>Mới Nhất</option>
                </select>
                <FontAwesomeIcon className='w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500' icon={faChevronDown} />
              </div>
              <div className='relative'>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(e.target.value)}
                  className='appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm'
                >
                  <option>24 sản phẩm</option>
                  <option>48 sản phẩm</option>
                  <option>96 sản phẩm</option>
                </select>
                <FontAwesomeIcon className='w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500' icon={faChevronDown} />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-2'>
            {books.map((product) => (
              <>
                <CardBook book={product} />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
