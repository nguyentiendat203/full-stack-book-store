import { SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons'
import { Steps, Modal, Input, Button, Form } from 'antd'
import { useState } from 'react'
import { toast } from 'react-toastify'
import userAPI from '~/api/userAPI'

function ModalForgotPassword({ isModalOpen, setIsModalOpen }) {
  const [current, setCurrent] = useState(0)
  const [userEmail, setUserEmail] = useState('')

  const onFinishStep0 = async (values) => {
    const { email } = values
    try {
      const res = await userAPI.sendEmail({ email })
      if (res?.id && res?.message) {
        setCurrent(1)
        setUserEmail(email)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const onFinishStep1 = async (values) => {
    const { code, password, confirmPassword } = values
    try {
      const res = await userAPI.changePassword({ code, password, confirmPassword, userEmail })
      if (res?.id && res?.message) {
        setCurrent(2)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <Modal title='Change Password' open={isModalOpen} width='40%' footer={null} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
        <Steps
          current={current}
          items={[
            {
              title: 'Login',
              icon: <UserOutlined />
            },
            {
              title: 'Verification',
              icon: <SolutionOutlined />
            },
            {
              title: 'Done',
              icon: <SmileOutlined />
            }
          ]}
        />
        {current === 0 && (
          <>
            <div style={{ margin: '20px 0' }}>
              <p>Để thực hiện thay đổi mật khẩu, vui lòng nhập email tài khoản của bạn.</p>
            </div>
            <Form name='change-password' onFinish={onFinishStep0} autoComplete='off' layout='vertical'>
              <Form.Item
                label=''
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập email'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {current === 1 && (
          <>
            <p className='mt-2'>Mã code đã gửi về Email của bạn, vui lòng kiểm tra</p>
            <Form name='change-pass-2' onFinish={onFinishStep1} autoComplete='off' layout='vertical'>
              <Form.Item
                label='Code'
                name='code'
                rules={[
                  {
                    required: true,
                    message: 'Please input your code!'
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Mật khẩu mới'
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your new password!'
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label='Xác nhận mật khẩu'
                name='confirmPassword'
                rules={[
                  {
                    required: true,
                    message: 'Please input your new password!'
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Confirm
                </Button>
              </Form.Item>
            </Form>
          </>
        )}

        {current === 2 && <p className='mt-2'>Tải khoản của bạn đã được thay đổi mật khẩu thành công. Vui lòng đăng nhập lại</p>}
      </Modal>
    </>
  )
}

export default ModalForgotPassword
