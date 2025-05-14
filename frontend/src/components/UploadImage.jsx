import { useState, useRef } from 'react'
import useAuthStore from '~/store/useAuthStore'

export const UploadImage = () => {
  const { currentUser, updateProfile } = useAuthStore()
  const [avatar, setAvatar] = useState(currentUser.avatar)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const validateFile = (file) => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPG, PNG, GIF)')
      return false
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      setError('Image size should not exceed 5MB')
      return false
    }

    setError(null)
    return true
  }

  const handleFileUpload = (file) => {
    if (!validateFile(file)) return

    setIsLoading(true)

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setTimeout(() => {
          setAvatar(e.target.result)
          setIsLoading(false)
        }, 1500)
      }
    }
    reader.onerror = () => {
      setError('Failed to read file')
      setIsLoading(false)
    }
    reader.readAsDataURL(file)
    // Gọi API trong authStore
    const formData = new FormData()
    formData.append('avatar', file)
    updateProfile(null, formData)
  }

  const handleFileChange = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleDeleteAvatar = async () => {
    setIsLoading(true)
    await updateProfile({ ...currentUser, avatar: '/no-user.png' })
    setAvatar('/no-user.png')
    setIsLoading(false)
  }

  return (
    <>
      <div className='w-full max-w-md bg-white'>
        <div className='flex flex-col items-center'>
          <div
            className='relative cursor-pointer'
            onClick={handleClick}
            aria-label='Upload avatar image'
            role='button'
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          >
            <div
              className={`
              w-40 h-40 rounded-full border-2 
              ${error ? 'border-red-400' : 'border-gray-200'} 
              transition-all duration-300 ease-in-out
              flex items-center justify-center bg-gray-100 relative
            `}
            >
              {avatar && <img src={avatar} alt='User avatar' className='w-full h-full rounded-full object-cover' />}

              {/* Loading overlay */}
              {isLoading && (
                <div className='absolute inset-0 bg-white bg-opacity-80 rounded-full flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
                </div>
              )}
            </div>

            <input ref={fileInputRef} type='file' accept='image/jpeg, image/png, image/gif' className='hidden' onChange={handleFileChange} aria-hidden='true' />
          </div>

          {error && (
            <div className='mt-3 text-red-500 text-sm flex items-center'>
              <i className='fas fa-exclamation-circle mr-1'></i>
              {error}
            </div>
          )}

          <div className='mt-4 text-center text-sm text-gray-500'>
            <p>Click to upload</p>
            <p className='mt-1'>JPG, PNG or GIF (max. 5MB)</p>
          </div>

          {!avatar.includes('no-user') && (
            <button
              className='mt-3 p-2 text-red-600 bg-white border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-300 !rounded-button whitespace-nowrap cursor-pointer'
              onClick={handleDeleteAvatar}
            >
              Remove Avatar
            </button>
          )}
        </div>
      </div>
    </>
  )
}
