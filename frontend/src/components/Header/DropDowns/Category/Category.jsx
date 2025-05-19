import { faArrowLeft, faCaretDown, faChevronDown, faChevronRight, faList, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import bookAPI from '~/api/bookAPI'
import { categoryAPI } from '~/api/categoryAPI'
import useBookStore from '~/store/useBookStore'

function Category() {
  const { setSubcategories, setCategory, setIdSubCate, idCategory, setIdCategory, setBooks, sortBy, setSortBy, itemsPerPage, setItemsPerPage } = useBookStore()

  const [isOpen, setIsOpen] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const [activeCategory, setActiveCategory] = useState(0)
  const [categories, setCategories] = useState([])
  const [subCategoriesFake, setSubCategoriesFake] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categoryAPI.getAllCategories()
        setCategories(res)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const fetchSubFakeCategories = async (id) => {
    try {
      const res = await categoryAPI.getSubCategories(id)
      setSubCategoriesFake(res)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchSubCategories = async (id) => {
    try {
      const res = await categoryAPI.getSubCategories(id)
      const resBooks = await bookAPI.getAllBook(1, itemsPerPage, id, null, sortBy)
      setBooks(resBooks.books)
      setSubcategories(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='lg:flex-1 relative ml-2 lg:ml-4'>
        <div className='flex justify-end relative cursor-pointer' onClick={() => setShowMobileMenu(true)} onMouseOver={() => setIsOpen(true)} onMouseOut={() => setIsOpen(false)}>
          <div className='relative flex items-center gap-2 '>
            <FontAwesomeIcon className='size-8 md:size-7 text-white lg:text-gray-500' icon={faList} />
            <FontAwesomeIcon className='hidden lg:block size-3 text-gray-500' icon={faChevronDown} />
          </div>
          <div className='absolute -bottom-5 right-0 h-6 w-16 bg-transparent cursor-pointer' onMouseOver={() => setIsOpen(true)} onMouseOut={() => setIsOpen(false)}></div>

          {/* Menu mobile section*/}
          <div
            className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${showMobileMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div
              className={`fixed inset-y-0 left-0 w-80 md:w-full bg-white shadow-xl transform transition-transform duration-300 z-50 ease-in-out ${
                showMobileMenu ? 'translate-x-0' : '-translate-x-full'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex items-center justify-between p-4 bg-red-600 '>
                <button onClick={() => setShowMobileMenu(false)} className='text-gray-500 hover:text-gray-700'>
                  <FontAwesomeIcon className='size-7 text-white' icon={faArrowLeft} />
                </button>
                <h2 className='text-xl font-bold text-white'>Danh Mục Sản Phẩm</h2>
                <div></div>
              </div>
              <div className='overflow-y-auto h-full pb-20'>
                <div className=''>
                  {categories.map((category, index) => (
                    <div key={index} className='border-t'>
                      <button
                        className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 font-semibold text-gray-600 focus:outline-none ${
                          index === activeCategory ? 'text-red-600' : ''
                        }`}
                        onClick={() => {
                          setActiveCategory(index === activeCategory ? null : index)
                          fetchSubFakeCategories(category.id)
                        }}
                      >
                        <span>{category?.name}</span>
                        <FontAwesomeIcon
                          className={`size-4 text-gray-500 transition-transform duration-200 ${activeCategory === index ? 'rotate-180 text-red-600' : ''}`}
                          icon={faCaretDown}
                        />
                      </button>
                      {/* Subcategories for this parent category */}
                      {activeCategory === index && subCategoriesFake.length > 0 && (
                        <div className='bg-gray-50'>
                          {subCategoriesFake.map((sub, subIdx) => (
                            <NavLink
                              key={subIdx}
                              to={`/filter/${category.id}/${sub.id}`}
                              className='block px-8 py-2 text-gray-600 hover:bg-gray-100 border-t'
                              onClick={() => setShowMobileMenu(false)}
                            >
                              {sub.name}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <div
            className='absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg z-50 hidden lg:flex'
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => {
              setIsOpen(false)
              setActiveCategory(0)
            }}
          >
            {/* Main Categories */}
            <div className='w-64 py-2 border-r border-gray-100'>
              {categories.length > 0 &&
                categories.map((category, index) => (
                  <NavLink
                    to={`/filter/${category.id}`}
                    key={index}
                    className='relative'
                    onClick={() => {
                      setCategory(category.name)
                      setIdSubCate(null)
                      fetchSubCategories(category.id)
                      setIsOpen(false)
                      setSortBy('oldest')
                      setItemsPerPage(12)
                    }}
                    onMouseEnter={() => {
                      setActiveCategory(index)
                      setIdCategory(category.id)
                      fetchSubFakeCategories(category.id)
                    }}
                  >
                    <span
                      className={`cursor-pointer flex items-center justify-between px-4 py-2 hover:bg-gray-50 text-md text-gray-800 ${
                        activeCategory === index ? 'bg-gray-50' : ''
                      }`}
                    >
                      <span>{category.name}</span>
                      <FontAwesomeIcon className='size-3' icon={faChevronRight} />
                    </span>
                  </NavLink>
                ))}
            </div>

            {/* Subcategories */}
            {activeCategory !== null && (
              <div className='w-64 py-2 border-r border-gray-100'>
                {subCategoriesFake.map((subcategory, index) => (
                  <div
                    key={index}
                    className='relative'
                    onClick={() => {
                      setIsOpen(false)
                      setCategory(subcategory.ListCate?.name)
                      setSubcategories([...subCategoriesFake])
                      setIdSubCate(subcategory.id)
                    }}
                  >
                    <NavLink to={`/filter/${idCategory}/${subcategory.id}`} className='flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-50 text-sm'>
                      <span>{subcategory.name}</span>
                    </NavLink>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Category
