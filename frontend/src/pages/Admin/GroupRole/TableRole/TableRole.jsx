import { faExclamation, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input, Modal, Table } from 'antd'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { toast } from 'react-toastify'
import { roleAPI } from '~/api/roleAPI'

const TableRole = forwardRef((props, ref) => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id'
    },
    {
      title: 'Url',
      dataIndex: 'url'
    },
    {
      title: 'Description',
      dataIndex: 'description'
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
  const [dataSource, setDataSource] = useState([])
  const [isShowModal, setIsShowModal] = useState(false)
  const [validInputUrl, setValidInputUrl] = useState(true)
  const [dataModalRole, setDataModalRole] = useState({})

  useImperativeHandle(ref, () => ({
    fetchAllRole
  }))

  const handleDeleteUser = async (data) => {
    try {
      await roleAPI.deleteRole(data.id)
      fetchAllRole()
      toast.success('Delete successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleEditUser = async (data) => {
    setIsShowModal(true)
    setDataModalRole(data)
  }

  const handleCancel = () => {
    setIsShowModal(false)
  }

  const handleOk = async () => {
    if (!dataModalRole.url) {
      setValidInputUrl(false)
      toast.error('URL not to be empty !')
      return
    }
    try {
      setValidInputUrl(true)
      await roleAPI.updateRole(dataModalRole)
      toast.success('Update successfully')
      setIsShowModal(false)
      fetchAllRole()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const fetchAllRole = async () => {
    try {
      const res = await roleAPI.getAllRoles()
      setDataSource(res)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchAllRole()
  }, [])

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={{
          pageSize: 5
        }}
      />

      <Modal title='Update Role' open={isShowModal} width={800} onCancel={handleCancel} onOk={handleOk}>
        <div className='grid grid-cols-2 gap-4 mt-4'>
          <div>
            <span>URL</span>
            <Input
              status={validInputUrl ? '' : 'error'}
              suffix={!validInputUrl && <FontAwesomeIcon icon={faExclamation} />}
              onChange={(e) => setDataModalRole({ ...dataModalRole, url: e.target.value.trim() })}
              value={dataModalRole.url}
            />
          </div>
          <div>
            <span>Description</span>
            <Input value={dataModalRole.description} onChange={(e) => setDataModalRole({ ...dataModalRole, description: e.target.value })} />
          </div>
        </div>
      </Modal>
    </>
  )
})

export default TableRole
