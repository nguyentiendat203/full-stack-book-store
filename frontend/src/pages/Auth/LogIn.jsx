import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Spin } from 'antd'
import { useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import ModalForgotPassword from './ModalForgotPassword'
import useAuthStore from '~/store/useAuthStore'

function LogIn() {
  const { logIn, isLoggingIn, currentUser } = useAuthStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const onFinish = (data) => {
    logIn(data)
    navigate('/')
  }

  if (currentUser) {
    return <Navigate to='/' />
  } else {
    return (
      <>
        <div className='flex justify-center items-center py-22'>
          <div className='w-80'>
            <Form
              name='normal_login'
              className='login-form'
              initialValues={{
                remember: true
              }}
              onFinish={onFinish}
            >
              <p className='text-3xl text-center py-6'>Đăng Nhập</p>
              <Form.Item
                className='mb-8'
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập Email'
                  }
                ]}
              >
                <Input prefix={<UserOutlined className='site-form-item-icon py-2' />} placeholder='Email' />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu'
                  }
                ]}
              >
                <Input prefix={<LockOutlined className='site-form-item-icon py-2' />} type='password' placeholder='Password' />
              </Form.Item>
              <Form.Item>
                <div className='flex justify-between items-center'>
                  <NavLink to='/register'>Đăng ký ngay !</NavLink>
                  <span className='text-rose-500 hover:text-rose-500 cursor-pointer' onClick={() => setIsModalOpen(true)}>
                    Quên mật khẩu?
                  </span>
                </div>
              </Form.Item>

              <Form.Item className='text-center'>
                {isLoggingIn ? (
                  <Button disabled className='login-form-button px-6 bg-red-600 text-white'>
                    <Spin size='small' />
                    Đăng nhập
                  </Button>
                ) : (
                  <Button type='danger' htmlType='submit' className='login-form-button px-6 bg-red-600 text-white'>
                    Đăng nhập
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
        <ModalForgotPassword isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </>
    )
  }
}

export default LogIn
