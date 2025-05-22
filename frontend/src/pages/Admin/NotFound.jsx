import { Image } from 'antd'

export const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center bg-white rounded-lg'>
      <Image preview={false} src='/forbidden.jpg' style={{ height: '100vh', width: '100vw', objectFit: 'contain' }}></Image>
    </div>
  )
}
