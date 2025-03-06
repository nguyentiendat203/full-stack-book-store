import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Table } from 'antd'
import { useEffect, useState } from 'react'
import userAPI from '~/api/userAPI'
import ModalDeleteUser from './ModalDeleteUser/ModalDeleteUser'
import ModalUser from './ModalUser/ModalUser'
import { toast } from 'react-toastify'

function ListUser() {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'First Name',
      dataIndex: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName'
    },
    {
      title: 'Group',
      render: (data) => <span>{data.Group && data.Group.name}</span>
    },
    {
      title: 'Actions',
      render: (data) => {
        return (
          <>
            <FontAwesomeIcon icon={faPenToSquare} className='mr-4 text-lg text-yellow-400 cursor-pointer' onClick={() => handleEditUser(data)} />
            <FontAwesomeIcon icon={faTrash} className='text-lg text-red-500 cursor-pointer' onClick={() => handleDeleteUser(data)} />
          </>
        )
      }
    }
  ]

  const fetchAllUsers = async () => {
    try {
      const res = await userAPI.getAllUsers()
      setDataSource(res)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const [dataSource, setDataSource] = useState([])
  //------- Modal Delete User
  const [dataUserDelete, setDataUserDelete] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  //------- Modal Create Update
  const [isModalUser, setIsModalUser] = useState(false)
  const [actionModalUser, setActionModalUser] = useState('CREATE')

  const [dataModalUser, setDataModalUser] = useState({})

  const handleEditUser = async (user) => {
    try {
      const inforUser = await userAPI.getUser(user)
      setIsModalUser(true)
      setActionModalUser('UPDATE')
      setDataModalUser(inforUser)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const handleDeleteUser = (user) => {
    setIsModalOpen(true)
    setDataUserDelete(user)
  }
  const handleOk = async () => {
    try {
      const res = await userAPI.deleteUser(dataUserDelete)
      if (res) {
        fetchAllUsers()
        setIsModalOpen(false)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <>
      <Button
        className='mb-2'
        type='primary'
        onClick={() => {
          setIsModalUser(true)
          setActionModalUser('CREATE')
        }}
      >
        Create New User
      </Button>
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={{
          pageSize: 3
        }}
      />
      <ModalDeleteUser isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} dataUserDelete={dataUserDelete} />
      <ModalUser
        isModalUser={isModalUser}
        setIsModalUser={setIsModalUser}
        fetchAllUsers={fetchAllUsers}
        action={actionModalUser}
        dataModalUser={dataModalUser}
        setDataModalUser={setDataModalUser}
      />
    </>
  )
}

export default ListUser
