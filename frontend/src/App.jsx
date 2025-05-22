import { createBrowserRouter, Navigate, RouterProvider, useLocation } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import LogIn from './pages/Auth/LogIn'
import Home from './pages/Home/Home'
import Register from './pages/Auth/Register'
import AdminLayout from './layout/AdminLayout'
import Cart from './pages/Cart/Cart'
import BookDetail from './components/BookDetail/BookDetail'
import Checkout from './pages/Cart/Checkout/Checkout'
import ListUser from './pages/Admin/User/ListUser/ListUser'
import NotFound from './pages/NotFound'
import { NotFound as AdminNotFound } from './pages/Admin/NotFound'
import GroupRole from './pages/Admin/GroupRole/GroupRole'
import Book from './pages/Admin/Book'
import Role from './pages/Admin/GroupRole/Role'
import User from './pages/User'
import Profile from './pages/User/Profile/Profile'
import Order from './pages/User/Order/Order'
import AdminOrder from './pages/Admin/Order'
import FilterPage from '~/pages/Filter'
import { useEffect } from 'react'
import PrivateLayout from '~/layout/PrivateLayout'
import useAuthStore from '~/store/useAuthStore'
import { HomeAdminDashboard } from '~/pages/Admin'

export function ScrollToTop({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return children
}

function App() {
  const { checkAuthUser, currentUser } = useAuthStore()

  useEffect(() => {
    checkAuthUser()
  }, [checkAuthUser])

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ScrollToTop>
          <DefaultLayout />
        </ScrollToTop>
      ),
      errorElement: <NotFound />,
      children: [
        { path: '', element: <Home /> },
        { path: 'login', element: <LogIn /> },
        { path: 'register', element: <Register /> },
        { path: 'chi-tiet-sach/:slug/:id', element: <BookDetail /> },
        { path: 'filter', element: <FilterPage /> },
        { path: 'filter/:parentId', element: <FilterPage /> },
        { path: 'filter/:parentId/:id', element: <FilterPage /> },
        { path: 'my-cart', element: currentUser ? <Cart /> : <Navigate to='/login' /> },
        { path: 'checkout', element: currentUser ? <Checkout /> : <Navigate to='/login' /> }
      ]
    },
    {
      path: '/',
      element: <PrivateLayout />,
      children: [
        {
          path: 'user/order',
          element: (
            <User>
              <Order />
            </User>
          )
        },
        {
          path: 'user/profile',
          element: (
            <User>
              <Profile />
            </User>
          )
        }
      ]
    },
    {
      path: '/',
      children: [
        {
          path: 'dash-board',
          element: (
            <AdminLayout permission='view:books'>
              <HomeAdminDashboard />
            </AdminLayout>
          )
        },
        {
          path: 'dash-board/book',
          element: (
            <AdminLayout permission='view:books'>
              <Book />
            </AdminLayout>
          )
        },
        {
          path: 'dash-board/user',
          element: (
            <AdminLayout permission='view:users'>
              <ListUser />
            </AdminLayout>
          )
        },
        {
          path: 'dash-board/order',
          element: (
            <AdminLayout permission='view:orders'>
              <AdminOrder />
            </AdminLayout>
          )
        },
        {
          path: 'dash-board/role',
          element: (
            <AdminLayout permission='view:roles'>
              <Role />
            </AdminLayout>
          )
        },
        {
          path: 'dash-board/permission',
          element: (
            <AdminLayout permission='view:roles'>
              <GroupRole />
            </AdminLayout>
          )
        },
        {
          path: 'dash-board/not-found',
          element: (
            <AdminLayout permission=''>
              <AdminNotFound />
            </AdminLayout>
          )
        }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App
