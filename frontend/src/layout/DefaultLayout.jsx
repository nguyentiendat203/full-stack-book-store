import { Outlet } from 'react-router-dom'
import Footer from '~/components/Footer/Footer'
import Header from '~/components/Header/Header'

function DefaultLayout() {
  return (
    <>
      <Header />
      <div className='bg-gray-100 pt-[119px] lg:pt-0'>
        <div className='w-full md:w-11/12 2xl:w-8/12 container mx-auto md:p-4'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DefaultLayout
