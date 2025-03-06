import { Button, Input, Radio, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { AuthContext } from '~/context/AuthContext'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import userAPI from '~/api/userAPI'
import handleUploadImage from '~/utils/handleUploadImage'

function Profile() {
  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      toast.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      toast.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const { currentUser, updateUser } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()

  const dataProfileDefault = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    sex: '',
    avatar: ''
  }
  const [dataProfile, setDataProfile] = useState(dataProfileDefault)

  const defaultValidInput = {
    firstName: true,
    lastName: true,
    email: true,
    phone: true
  }
  const [validInput, setValidInput] = useState(defaultValidInput)

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none'
      }}
      type='button'
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}
      >
        Avatar
      </div>
    </button>
  )

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    getBase64(info.file.originFileObj, async (url) => {
      setLoading(false)
      setImageUrl(url)
      const secure_url = await handleUploadImage(url)
      setDataProfile({ ...dataProfile, avatar: secure_url })
    })
  }

  const handleOnchangeInput = (name, value) => {
    let _validInput = _.cloneDeep(validInput)
    if (!value) {
      _validInput[name] = false
      toast.error('Vui lòng nhập thông tin')
    } else {
      _validInput[name] = true
    }
    setValidInput(_validInput)

    let _dataProfile = _.cloneDeep(dataProfile)
    _dataProfile[name] = value
    setDataProfile(_dataProfile)
  }

  const handleSave = async () => {
    try {
      await userAPI.updateMe(dataProfile.id, dataProfile)
      updateUser(dataProfile)
      toast.success('Cập nhật thông tin thành công')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const isFormValid = () => {
    return Object.values(validInput).some((item) => item === false)
  }

  useEffect(() => {
    setDataProfile(currentUser)
    setImageUrl(currentUser.avatar)
  }, [currentUser])

  useEffect(() => {
    setDataProfile({ ...currentUser, avatar: imageUrl })
  }, [imageUrl])

  return (
    <>
      <div className='bg-white rounded-lg p-6 mb-4'>
        <div className='pb-4 border-b px-4'>
          <p className='text-xl'>Hồ Sơ Của Tôi</p>
          <span className='text-sm text-gray-600'>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
        </div>
        <div className='p-12 flex'>
          <div className='flex flex-col basis-1/2 mr-12'>
            <div className='flex mb-4'>
              <span className='basis-2/5 text-gray-600'>Họ:</span>
              <Input
                value={dataProfile.firstName}
                onChange={(e) => handleOnchangeInput('firstName', e.target.value)}
                status={!validInput['firstName'] && 'error'}
                suffix={!validInput['firstName'] && <FontAwesomeIcon icon={faExclamation} />}
              />
            </div>
            <div className='flex mb-4'>
              <span className='basis-2/5 text-gray-600'>Tên:</span>
              <Input
                value={dataProfile.lastName}
                onChange={(e) => handleOnchangeInput('lastName', e.target.value)}
                status={!validInput['lastName'] && 'error'}
                suffix={!validInput['lastName'] && <FontAwesomeIcon icon={faExclamation} />}
              />
            </div>
            <div className='flex mb-4'>
              <span className='basis-2/5 text-gray-600'>Email:</span>
              <Input value={dataProfile.email} onChange={(e) => handleOnchangeInput('email', e.target.value)} />
            </div>
            <div className='flex mb-4'>
              <span className='basis-2/5 text-gray-600'>Số điện thoại:</span>
              <Input value={dataProfile.phone} onChange={(e) => handleOnchangeInput('phone', e.target.value)} />
            </div>
            <div className='flex'>
              <span className='basis-2/5 text-gray-600'>Giới tính:</span>
              <div>
                <Radio.Group
                  value={dataProfile.sex}
                  onChange={(e) => {
                    setDataProfile({ ...dataProfile, sex: e.target.value })
                  }}
                >
                  <Radio value='Nam'>Nam</Radio>
                  <Radio value='Nữ'>Nữ</Radio>
                  <Radio value='Khác'>Khác</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
          <div className='flex-1'>
            <div className='text-center'>
              <Upload
                name='avatar'
                listType='picture-circle'
                className='avatar-uploader'
                showUploadList={false}
                action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt='avatar'
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '50px'
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
              <p className='text-sm text-gray-500 mt-4'>
                Dụng lượng ảnh tối đa 2 MB <br /> Định dạng:.JPEG, .PNG
              </p>
            </div>
          </div>
        </div>
        <p className='pl-24'>
          <Button disabled={isFormValid()} danger type='primary' className='p-4 !bg-red-600' onClick={handleSave}>
            LƯU
          </Button>
        </p>
      </div>
    </>
  )
}

export default Profile
