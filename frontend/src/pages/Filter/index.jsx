import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import bookAPI from '~/api/bookAPI'
import { CardBook } from '~/components/CardBook'
import { AuthContext } from '~/context/AuthContext'
import { Sidebar } from '~/pages/Filter/Sidebar'

export default function FilterPage() {
  const { id } = useParams()
  const { subcategories, category, idSubCate } = useContext(AuthContext)

  const [sortBy, setSortBy] = useState('Bán Chạy Tuần')
  const [itemsPerPage, setItemsPerPage] = useState('24 sản phẩm')
  const [subCateName, setSubCateName] = useState('')
  const [books, setBooks] = useState([])

  useEffect(() => {
    const cate = subcategories.find((sub) => sub.id === idSubCate)
    if (cate) {
      setSubCateName(cate.name)
    }
    const fetchProducts = async () => {
      try {
        const response = await bookAPI.getAllBook(1, 10, id)
        setBooks(response.books)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [id])

  return (
    <div className='container mx-auto p-2'>
      {/* Breadcrumb */}
      <div className='flex items-center gap-2 text-sm mb-6'>
        <a href='/' className='text-gray-600 hover:text-red-600'>
          TRANG CHỦ
        </a>
        <span className='text-gray-400'>/</span>
        <a href='#' className='text-gray-600 hover:text-red-600'>
          TẤT CẢ NHÓM SẢN PHẨM
        </a>
        <span className='text-gray-400'>/</span>
        <a href='#' className='text-gray-600 hover:text-red-600'>
          {category}
        </a>
        <span className='text-gray-400'>/</span>
        <a href='#' className='text-gray-600 hover:text-red-600'>
          {subCateName}
        </a>
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
