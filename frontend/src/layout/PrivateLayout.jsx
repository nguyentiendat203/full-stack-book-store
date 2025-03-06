import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import { AuthContext } from '~/context/AuthContext'
import Footer from '~/pages/Admin/Footer'
import Header from '~/pages/Admin/Header'
import SideMenu from '~/pages/Admin/SideMenu'

function PrivateLayout() {
  const { currentUser } = useContext(AuthContext)
  if (!currentUser) {
    return <Navigate to='/login' />
  } else {
    return (
      <>
        <div className='flex flex-col h-screen width-screen'>
          <div className='flex flex-1 justify-start items-start'>
            <div className='h-full basis-1/6 pt-2'>
              <SideMenu />
            </div>
            <div className='h-full flex-1 bg-gray-200 p-2'>
              <Header />
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default PrivateLayout
