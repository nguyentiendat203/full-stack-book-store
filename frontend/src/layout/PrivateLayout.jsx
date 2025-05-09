import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '~/context/AuthContext'

function PrivateLayout() {
  const { currentUser } = useContext(AuthContext)
  if (!currentUser) return <Navigate to='/login' />
  return <Outlet />
}

export default PrivateLayout
