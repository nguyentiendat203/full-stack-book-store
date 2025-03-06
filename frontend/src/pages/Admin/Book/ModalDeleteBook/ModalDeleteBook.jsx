import { Modal } from 'antd'

function ModalDeleteBook({ isModalOpen, handleOk, handleCancel, dataBookDelete }) {
  return (
    <>
      <Modal title='Confirm Delete Book' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>
          Are you sure you want to delete this book : <span className='font-medium text-red-600'>{dataBookDelete.name}</span>
        </p>
      </Modal>
    </>
  )
}

export default ModalDeleteBook
