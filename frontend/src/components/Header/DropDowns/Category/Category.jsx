import { faChevronRight, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { categoryAPI } from '~/api/categoryAPI'
import { AuthContext } from '~/context/AuthContext'

function Category() {
  const { setSubCategories, setCategory, setIdSubCate, updateSubCategories } = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(false)
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

  const fetchSubCategories = async (id) => {
    try {
      const res = await categoryAPI.getSubCategories(id)
      setSubCategoriesFake(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className='relative ml-4 pt-2'>
        <div className='text-gray-600 cursor-pointer' onMouseOver={() => setIsOpen(true)} onMouseOut={() => setIsOpen(false)}>
          <span>
            <FontAwesomeIcon className='size-6' icon={faList} />
          </span>
        </div>
        <div className='absolute top-100 -left-4 h-6 w-16 bg-transparent cursor-pointer' onMouseOver={() => setIsOpen(true)} onMouseOut={() => setIsOpen(false)}></div>
        {isOpen && (
          <div
            className='absolute left-0 top-full mt-1 bg-white rounded-lg shadow-lg z-50 flex'
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => {
              setIsOpen(false)
              setActiveCategory(0)
            }}
          >
            {/* Main Categories */}
            <div className='w-64 py-2 border-r border-gray-100'>
              {categories.map((category, index) => (
                <div
                  key={index}
                  className='relative'
                  onMouseEnter={() => {
                    setActiveCategory(index)
                    fetchSubCategories(category.id)
                  }}
                >
                  <span
                    className={`cursor-pointer flex items-center justify-between px-4 py-2 hover:bg-gray-50 text-md text-gray-800 ${activeCategory === index ? 'bg-gray-50' : ''}`}
                  >
                    <span>{category.name}</span>
                    <FontAwesomeIcon className='size-3' icon={faChevronRight} />
                  </span>
                </div>
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
                      setSubCategories([...subCategoriesFake])
                      updateSubCategories([...subCategoriesFake])
                      setIdSubCate(subcategory.id)
                    }}
                  >
                    <NavLink to={`/filter/${subcategory.id}`} className='flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-gray-50 text-sm'>
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
