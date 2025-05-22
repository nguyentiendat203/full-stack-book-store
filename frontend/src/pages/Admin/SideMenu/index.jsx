import { Badge, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBug, faCodeCompare, faHome, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faRectangleList } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from 'react'
import useAuthStore from '~/store/useAuthStore'
import { faTrello } from '@fortawesome/free-brands-svg-icons'
import usePermission from '~/hooks/usePermission'
import orderAPI from '~/api/orderAPI'

function SideMenu() {
  const navigate = useNavigate()
  const { currentUser } = useAuthStore()
  const { hasPermission } = usePermission()

  const [listOrderByStatus, setListOrderByStatus] = useState({})

  const listItems = [
    { status: '0', key: '/', icon: faHome, label: 'Home', permissions: '' },
    { status: '6', key: '/dash-board', icon: faTrello, label: 'Dashboard', permissions: '' },
    { status: '1', key: '/dash-board/book', icon: faBook, label: 'Book', permissions: 'view:books' },
    { status: '2', key: '/dash-board/user', icon: faUser, label: 'User', permissions: 'view:users' },
    { status: '3', key: '/dash-board/order', icon: faRectangleList, label: 'Order', permissions: 'view:orders' },
    { status: '4', key: '/dash-board/role', icon: faUserSecret, label: 'Role', permissions: 'view:roles' },
    { status: '5', key: '/dash-board/permission', icon: faCodeCompare, label: 'Permission', permissions: 'view:roles' }
  ]

  const items = listItems.map((item) => {
    const acceptedPermision = hasPermission(item.permissions)
    if (!acceptedPermision) {
      return null
    }

    const hasOrdersInStatus =
      (item.status == 3 && listOrderByStatus[1]?.length > 0) || (item.status == 3 && listOrderByStatus[2]?.length > 0) || (item.status == 3 && listOrderByStatus[3]?.length > 0)
    return {
      key: item.key,
      icon: <FontAwesomeIcon icon={item.icon} />,
      label: hasOrdersInStatus ? (
        <Badge dot>
          <span>{item.label}</span>
        </Badge>
      ) : (
        <span className='text-sm'>{item.label}</span>
      )
    }
  })

  const categorizeOrders = (orders) => {
    const statusMap = {}
    listItems.forEach((item) => {
      statusMap[item.status] = orders.filter((order) => order.status === parseInt(item.status))
    })
    return statusMap
  }

  useEffect(() => {
    orderAPI.getAllOrders().then((res) => {
      setListOrderByStatus(categorizeOrders(res))
    })
  }, [currentUser])

  return (
    <>
      <p className='text-lg text-center py-4'>
        <FontAwesomeIcon icon={faBug} className='mr-2' />
        ADMIN
      </p>
      <Menu
        items={items}
        defaultSelectedKeys='/dash-board'
        onClick={(item) => {
          navigate(item.key)
        }}
      ></Menu>
    </>
  )
}

export default SideMenu
