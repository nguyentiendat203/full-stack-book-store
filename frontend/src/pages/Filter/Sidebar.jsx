import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import bookAPI from '~/api/bookAPI'
import useBookStore from '~/store/useBookStore'

const priceRanges = [
  { id: 0, title: '0đ - 150,000đ', min: 0, max: 150000 },
  { id: 1, title: '150,000đ - 300,000đ', min: 150000, max: 300000 },
  { id: 2, title: '300,000đ - 500,000đ', min: 300000, max: 500000 },
  { id: 3, title: '500,000đ - 700,000đ', min: 500000, max: 700000 },
  { id: 4, title: '700,000đ - Trở Lên', min: 700000, max: 9999999 }
]

const genres = ['Comedy', 'Fantasy', 'Romance', 'Horror', 'Mystery']

export const Sidebar = () => {
  const { subcategories, idSubCate, setIdSubCate, idCategory, category, setBooks, sortBy, itemsPerPage } = useBookStore()

  const [checkedInputId, setCheckedInputId] = useState()
  const [minPrice, setMinPrice] = useState()
  const [maxPrice, setMaxPrice] = useState()

  const handleFilterPrice = (range) => {
    if (checkedInputId === range.id) {
      setCheckedInputId(null)
      setMinPrice(null)
      setMaxPrice(null)
    } else {
      setCheckedInputId(range.id)
      setMinPrice(range.min)
      setMaxPrice(range.max)
    }
  }
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookAPI.getAllBook(1, itemsPerPage, idCategory, idSubCate, sortBy, minPrice, maxPrice)
        setBooks(response.books)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchBooks()
  }, [minPrice, maxPrice])

  return (
    <div className='w-64 flex-shrink-0'>
      <div className='bg-white rounded-lg shadow p-4 space-y-6'>
        <div>
          <h3 className='font-bold mb-3'>NHÓM SẢN PHẨM</h3>
          <div className='space-y-1'>
            <NavLink to={`/filter/${idCategory}`} onClick={() => setIdSubCate('')} className={`text-gray-600 text-sm  ${!idSubCate ? 'text-orange-500' : ''}`}>
              {category}
            </NavLink>
            {/* <span className={`block py-1.5 text-sm ${!idSubCate ? 'text-orange-500' : ''}`}>{category}</span> */}
            <div className='ml-4'>
              {subcategories.map((subcategory, index) => (
                <NavLink
                  to={`/filter/${idCategory}/${subcategory.id}`}
                  key={index}
                  onClick={() => {
                    setIdSubCate(subcategory.id)
                  }}
                  className={`block py-1.5 text-sm  ${subcategory.id === idSubCate ? 'text-orange-500' : ''} hover:text-orange-500`}
                >
                  {subcategory.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className='font-bold mb-3'>GIÁ</h3>
          <ul className='space-y-2'>
            {priceRanges.map((range) => (
              <li key={range.id}>
                <div onClick={() => handleFilterPrice(range)} className='inline-flex items-center gap-2 text-sm cursor-pointer'>
                  <input type='checkbox' checked={range.id === checkedInputId && true} className='accent-orange-500 cursor-pointer' />
                  <span>{range.title}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='font-bold mb-3'>GENRES</h3>
          <ul className='space-y-2'>
            {genres.map((genre, index) => (
              <li key={index}>
                <label className='flex items-center gap-2 text-sm'>
                  <input type='checkbox' className='rounded border-gray-300' />
                  <span>{genre}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
