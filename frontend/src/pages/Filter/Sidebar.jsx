import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '~/context/AuthContext'

const priceRanges = [
  { title: '0đ - 150,000đ', min: 0, max: 150000 },
  { title: '150,000đ - 300,000đ', min: 150000, max: 300000 },
  { title: '300,000đ - 500,000đ', min: 300000, max: 500000 },
  { title: '500,000đ - 700,000đ', min: 500000, max: 700000 },
  { title: '700,000đ - Trở Lên', min: 700000, max: null }
]

const genres = ['Comedy', 'Fantasy', 'Romance', 'Horror', 'Mystery']

export const Sidebar = () => {
  const { subcategories, category, idSubCate, setIdSubCate } = useContext(AuthContext)

  return (
    <div className='w-64 flex-shrink-0'>
      <div className='bg-white rounded-lg shadow p-4 space-y-6'>
        <div>
          <h3 className='font-bold mb-3'>NHÓM SẢN PHẨM</h3>
          <div className='space-y-1'>
            <span className='block py-1.5 text-sm '>{category}</span>
            <div className='ml-4'>
              {subcategories.map((subcategory, index) => (
                <NavLink
                  to={`/filter/${subcategory.id}`}
                  key={index}
                  onClick={() => {
                    setIdSubCate(subcategory.id)
                    localStorage.setItem('idSubCate', JSON.stringify(subcategory.id))
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
          <div className='space-y-2'>
            {priceRanges.map((range, index) => (
              <div key={index}>
                <div className='flex items-center gap-2 text-sm '>
                  <input type='radio' id={index} name='price' value={{ min: range.min, max: range.max }} className='cursor-pointer rounded border-gray-300' />
                  <label className='cursor-pointer'>{range.title}</label>
                </div>
              </div>
            ))}
          </div>
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
