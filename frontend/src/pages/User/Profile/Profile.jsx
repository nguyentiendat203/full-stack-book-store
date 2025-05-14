import { Button, Input, Radio } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import useAuthStore from '~/store/useAuthStore'
import { UploadImage } from '~/components/UploadImage'

function Profile() {
  const { currentUser, updateProfile } = useAuthStore()

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

  const handleSave = () => {
    updateProfile(dataProfile)
  }

  const isFormValid = () => {
    return Object.values(validInput).some((item) => item === false)
  }

  useEffect(() => {
    setDataProfile(currentUser)
    setImageUrl(currentUser?.avatar)
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
            <p className='mt-10'>
              <Button disabled={isFormValid()} danger type='primary' className='p-4 !bg-red-600' onClick={handleSave}>
                LƯU
              </Button>
            </p>
          </div>
          <div className='flex-1'>
            <div className='text-center'>
              <UploadImage />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
