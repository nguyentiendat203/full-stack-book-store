import { set } from 'lodash'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import bookAPI from '~/api/bookAPI'
import { categoryAPI } from '~/api/categoryAPI'
import useBookStore from '~/store/useBookStore'

const priceRanges = [
  { id: 0, title: '0đ - 150,000đ', min: 0, max: 150000 },
  { id: 1, title: '150,000đ - 300,000đ', min: 150000, max: 300000 },
  { id: 2, title: '300,000đ - 500,000đ', min: 300000, max: 500000 },
  { id: 3, title: '500,000đ - 700,000đ', min: 500000, max: 700000 },
  { id: 4, title: '700,000đ - Trở Lên', min: 700000, max: 9999999 }
]

export const Sidebar = ({ parentId, setCurrentPage, minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  const {
    subcategories,
    setSubcategories,
    idSubCate,
    setIdSubCate,
    idCategory,
    setIdCategory,
    category,
    setCategory,
    setBooks,
    sortBy,
    itemsPerPage,
    setItemsPerPage,
    setTotalRecords
  } = useBookStore()

  const [checkedInputId, setCheckedInputId] = useState()
  console.log(checkedInputId)
  const [categories, setCategories] = useState([])

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
    categoryAPI.getAllCategories().then((res) => {
      setCategories(res)
    })
  }, [])

  useEffect(() => {
    bookAPI.getAllBook(1, itemsPerPage, idCategory, idSubCate, sortBy, minPrice, maxPrice).then((res) => {
      setBooks(res.books)
      setTotalRecords(res.totalRows)
    })
  }, [minPrice, maxPrice])

  const fetchSubCategories = (id) => {
    categoryAPI
      .getSubCategories(id)
      .then((res) => {
        setSubcategories(res)
      })
      .catch((error) => {
        console.error('Error fetching subcategories:', error)
      })
  }

  return (
    <>
      <div className='bg-white rounded-lg shadow p-4 space-y-6'>
        <div>
          <h3 className='font-bold'>NHÓM SẢN PHẨM</h3>
          <div className=''>
            <NavLink
              to='/filter'
              onClick={() => {
                setCurrentPage(1)
                setIdCategory('')
                setIdSubCate('')
                setSubcategories([])
                setItemsPerPage(12)
              }}
              className={`block text-gray-600 cursor-pointer my-2 uppercase ${!parentId && 'text-orange-500'}`}
            >
              Tất cả thể loại
            </NavLink>
            {!parentId && (
              <div className='ml-2 space-y-2 text-sm'>
                {categories.map((category, index) => (
                  <NavLink
                    to={`/filter/${category.id}`}
                    key={index}
                    onClick={() => {
                      setIdSubCate('')
                      setCurrentPage(1)
                      setItemsPerPage(12)
                      setIdCategory(category.id)
                      setCategory(category.name)
                      fetchSubCategories(category.id)
                    }}
                    className='block hover:text-orange-500'
                  >
                    {category.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
          {idCategory && (
            <div className='ml-2 space-y-1'>
              <NavLink
                to={`/filter/${idCategory}`}
                onClick={() => {
                  setIdSubCate('')
                  setCurrentPage(1)
                  setItemsPerPage(12)
                }}
                className={`text-gray-600 text-sm  ${!idSubCate ? 'text-orange-500' : ''}`}
              >
                {category}
              </NavLink>
              <div className='ml-3'>
                {subcategories.map((subcategory, index) => (
                  <NavLink
                    to={`/filter/${idCategory}/${subcategory.id}`}
                    key={index}
                    onClick={() => {
                      setIdSubCate(subcategory.id)
                      setCurrentPage(1)
                      setItemsPerPage(12)
                    }}
                    className={`block py-1.5 text-sm  ${subcategory.id === idSubCate ? 'text-orange-500' : ''} hover:text-orange-500`}
                  >
                    {subcategory.name}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
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
      </div>
    </>
  )
}
