import { Modal } from 'antd'

function ModalDeleteUser({ isModalOpen, handleOk, handleCancel, dataUserDelete }) {
  return (
    <>
      <Modal title='Confirm Delete User' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>
          Are you sure you want to delete this user : <span className='font-medium'>{dataUserDelete.email}</span>
        </p>
      </Modal>
    </>
  )
}

export default ModalDeleteUser
