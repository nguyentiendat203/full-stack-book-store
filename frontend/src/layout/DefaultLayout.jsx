import { Outlet } from 'react-router-dom'
import Footer from '~/components/Footer/Footer'
import Header from '~/components/Header/Header'

function DefaultLayout() {
  return (
    <>
      <Header />
      <div className='bg-gray-100 '>
        <div className='w-10/12 2xl:w-8/12 container mx-auto p-4'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DefaultLayout
