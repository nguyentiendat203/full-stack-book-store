import { Button, Checkbox, Form, Input, Select, Spin } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authAPI from '~/api/authAPI'
const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}
function Register() {
  const [isLoading, setisLoading] = useState(false)

  const navigate = useNavigate()

  const onFinish = async (values) => {
    setisLoading(true)
    try {
      await authAPI.signUp(values)
      toast.success('Đăng ký thành công, vui lòng đăng nhập tài khoản')
      navigate('/login')
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setisLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center py-22'>
      <Form
        {...formItemLayout}
        className='pr-24 '
        name='register'
        onFinish={onFinish}
        style={{
          maxWidth: 600
        }}
        scrollToFirstError
      >
        <p className='text-3xl text-center py-6 pl-28'>Đăng ký</p>

        <Form.Item
          name='firstName'
          label='Họ'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ tên!',
              whitespace: true
            },
            { pattern: new RegExp(/[a-zA-Z]/g), message: 'Chỉ nhập ký tự' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='lastName'
          label='Tên'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập họ tên!',
              whitespace: true
            },
            { pattern: new RegExp(/[a-zA-Z]/g), message: 'Chỉ nhập ký tự' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='email'
          label='Email'
          rules={[
            {
              type: 'email',
              message: 'Vui lòng nhập đúng định dạng Email!'
            },
            {
              required: true,
              message: 'Vui lòng nhập Email!'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='password'
          label='Mật khẩu'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu!'
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='phone'
          label='Số điện thoại'
          rules={[
            { pattern: new RegExp(/^[0-9]*$/g), message: 'Chỉ được nhập số' },
            { max: 10, message: 'Số điện thoại không vượt quá 10 ký tự' }
          ]}
        >
          <Input
            style={{
              width: '100%'
            }}
          />
        </Form.Item>
        <Form.Item name='sex' label='Giới tính'>
          <Select placeholder='Chọn giới tính của bạn'>
            <Option value='Nam'>Nam</Option>
            <Option value='Nữ'>Nữ</Option>
            <Option value='other'>Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='agreement'
          className='ml-0'
          valuePropName='checked'
          rules={[
            {
              validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Bạn nên chấp nhận điều khoản')))
            }
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>Tôi đã đồng ý với Fahasa.com về Điều khoản dịch vụ & Chính sách bảo mật</Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout} className='text-center'>
          {isLoading ? (
            <Button disabled htmlType='submit' className='login-form-button px-6 bg-red-600 text-white'>
              <Spin size='small' />
              Đăng ký
            </Button>
          ) : (
            <Button type='danger' htmlType='submit' className='login-form-button px-6 bg-red-600 text-white'>
              Đăng ký
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  )
}
export default Register
