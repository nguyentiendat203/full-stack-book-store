import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Image, Rate, Table } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import bookAPI from '~/api/bookAPI'
import { formatPriceVND } from '~/utils/formatPriceVND'
import ModalDeleteBook from './ModalDeleteBook/ModalDeleteBook'
import ModalBook from './ModalBook/ModalBook'
import usePermission from '~/hooks/usePermission'

function Book() {
  const { hasPermission } = usePermission()
  const canDeleteBook = hasPermission('delete:book')
  const canUpdateBook = hasPermission('update:book')

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id'
    },
    {
      title: 'Thumbnail',
      dataIndex: 'image',
      render: (data) => {
        return <Image width={80} src={data} />
      }
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Category',
      render: (data) => {
        return <span>{data.Category?.name}</span>
      }
    },
    {
      title: 'Supplier',
      render: (data) => {
        return <span>{data.Supplier?.name}</span>
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      defaultSortOrder: 'descend',
      render: (value) => {
        return <b>{formatPriceVND(value)}</b>
      }
    },
    {
      title: 'Stock',
      dataIndex: 'stock'
    },
    {
      title: 'Page Number',
      dataIndex: 'pageNumber'
    },
    {
      title: 'Publish Year',
      dataIndex: 'publishingYear'
    },
    {
      title: 'Rating',
      dataIndex: 'ratingsAverage',
      render: (rating) => {
        return <Rate className='w-36 ' disabled value={rating} allowHalf />
      }
    },
    {
      title: 'Actions',
      render: (data) => {
        return (
          <div className='flex'>
            {canUpdateBook && <FontAwesomeIcon icon={faPenToSquare} className='mr-4 text-lg text-yellow-400 cursor-pointer' onClick={() => hanldeUpdateBook(data)} />}
            {canDeleteBook && <FontAwesomeIcon icon={faTrash} className='text-lg text-red-500 cursor-pointer' onClick={() => handleDeleteBook(data)} />}
          </div>
        )
      }
    }
  ]

  const [dataSource, setDataSource] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(0)
  const [itemPerPage, setItemPerPage] = useState(10)
  //------- Modal Delete Book
  const [dataBookDelete, setDataBookDelete] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  // ---- Modal Create Update Book
  const [dataModalBook, setDataModalBook] = useState({})
  const [isModalBook, setIsModalBook] = useState(false)
  const [actionModalBook, setActionModalBook] = useState('CREATE')

  const handleDeleteBook = (data) => {
    setIsModalOpen(true)
    setDataBookDelete(data)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleOk = async () => {
    await bookAPI.deleteBook(dataBookDelete.id)
    setIsModalOpen(false)
    fetchAllBook()
    toast.success('Successfully deleted book')
  }

  const hanldeUpdateBook = async (data) => {
    setDataModalBook(data)
    setActionModalBook('UPDATE')
    setIsModalBook(true)
  }

  const fetchAllBook = async (currentLimit, itemPerPage) => {
    try {
      const res = await bookAPI.getAllBook(currentLimit, itemPerPage)
      setDataSource(res.books)
      setTotalRecords(res.totalRows)
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  useEffect(() => {
    fetchAllBook(currentPage, itemPerPage)
  }, [])

  useEffect(() => {
    fetchAllBook(currentPage, itemPerPage)
  }, [currentPage, itemPerPage])

  return (
    <>
      <Button
        className='mb-2'
        type='primary'
        onClick={() => {
          setIsModalBook(true)
          setActionModalBook('CREATE')
        }}
      >
        Create New Book
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: itemPerPage,
          current: currentPage,
          showSizeChanger: true,
          total: totalRecords,
          onChange: (page, pageSize) => {
            setCurrentPage(page)
            setItemPerPage(pageSize)
          },
          showTotal: (total) => {
            return <span className='text-sm'>Total {total} books</span>
          }
        }}
      />
      <ModalDeleteBook isModalOpen={isModalOpen} dataBookDelete={dataBookDelete} handleCancel={handleCancel} handleOk={handleOk} />
      <ModalBook action={actionModalBook} isModalBook={isModalBook} setIsModalBook={setIsModalBook} fetchAllBook={fetchAllBook} dataModalBook={dataModalBook} />
    </>
  )
}

export default Book
