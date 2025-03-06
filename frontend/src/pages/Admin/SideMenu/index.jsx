import { Badge, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faBug, faCodeCompare, faHome, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faRectangleList } from '@fortawesome/free-regular-svg-icons'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '~/context/AuthContext'
import userAPI from '~/api/userAPI'

function SideMenu() {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)

  const [listOrderByStatus, setListOrderByStatus] = useState({})

  const listItems = [
    { status: '0', key: '/', icon: faHome, label: 'Home' },
    { status: '1', key: 'dash-board/book', icon: faBook, label: 'Book' },
    { status: '2', key: 'dash-board/user', icon: faUser, label: 'User' },
    { status: '3', key: 'dash-board/order', icon: faRectangleList, label: 'Order' },
    { status: '4', key: 'dash-board/role', icon: faUserSecret, label: 'Role' },
    { status: '5', key: 'dash-board/permission', icon: faCodeCompare, label: 'Permission' }
  ]

  const items = listItems.map((item) => {
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

  const fetchDataListOrder = async () => {
    try {
      const res = await userAPI.getAllOrders()
      setListOrderByStatus(categorizeOrders(res))
    } catch (error) {
      toast(error.response?.data?.message)
    }
  }

  useEffect(() => {
    fetchDataListOrder()
  }, [currentUser])

  return (
    <>
      <p className='text-lg text-center py-4'>
        <FontAwesomeIcon icon={faBug} className='mr-2' />
        ADMIN
      </p>
      <Menu
        items={items}
        defaultSelectedKeys='dash-board/book'
        onClick={(item) => {
          navigate(item.key)
        }}
      ></Menu>
    </>
  )
}

export default SideMenu
