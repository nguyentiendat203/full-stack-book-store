import { Navigate, Outlet } from 'react-router-dom'
import Footer from '~/pages/Admin/Footer'
import Header from '~/pages/Admin/Header'
import SideMenu from '~/pages/Admin/SideMenu'
import useAuthStore from '~/store/useAuthStore'

function AdminLayout() {
  const { currentUser } = useAuthStore()

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

export default AdminLayout
