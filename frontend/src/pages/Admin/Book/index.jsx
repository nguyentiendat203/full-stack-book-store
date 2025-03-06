import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Image, Rate, Table } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import bookAPI from '~/api/bookAPI'
import { formatPriceVND } from '~/utils/formatPriceVND'
import ModalDeleteBook from './ModalDeleteBook/ModalDeleteBook'
import ModalBook from './ModalBook/ModalBook'

function Book() {
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
        return <span>{data.Category.name}</span>
      }
    },
    {
      title: 'Supplier',
      render: (data) => {
        return <span>{data.Supplier.name}</span>
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
            <FontAwesomeIcon icon={faPenToSquare} className='mr-4 text-lg text-yellow-400 cursor-pointer' onClick={() => hanldeUpdateBook(data)} />
            <FontAwesomeIcon icon={faTrash} className='text-lg text-red-500 cursor-pointer' onClick={() => handleDeleteBook(data)} />
          </div>
        )
      }
    }
  ]

  const [dataSource, setDataSource] = useState([])
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
    try {
      await bookAPI.deleteBook(dataBookDelete.id)
      setIsModalOpen(false)
      fetchAllBook()
      toast.success('Successfully deleted book')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const hanldeUpdateBook = async (data) => {
    setDataModalBook(data)
    setActionModalBook('UPDATE')
    setIsModalBook(true)
  }

  const fetchAllBook = async () => {
    try {
      const res = await bookAPI.getAllBook()
      setDataSource(res)
    } catch (err) {
      toast.error(err.response.data.message)
    }
  }

  useEffect(() => {
    fetchAllBook()
  }, [])

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
          pageSize: 10
        }}
      />
      <ModalDeleteBook isModalOpen={isModalOpen} dataBookDelete={dataBookDelete} handleCancel={handleCancel} handleOk={handleOk} />
      <ModalBook action={actionModalBook} isModalBook={isModalBook} setIsModalBook={setIsModalBook} fetchAllBook={fetchAllBook} dataModalBook={dataModalBook} />
    </>
  )
}

export default Book
