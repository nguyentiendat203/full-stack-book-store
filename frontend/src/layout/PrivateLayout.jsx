import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import useAuthStore from '~/store/useAuthStore'

function PrivateLayout() {
  const { currentUser } = useAuthStore()
  if (!currentUser) return <Navigate to='/login' />
  return <Outlet />
}

export default PrivateLayout
