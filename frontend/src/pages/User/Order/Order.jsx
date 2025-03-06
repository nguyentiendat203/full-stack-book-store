import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import cartAPI from '~/api/cartAPI'
import { AuthContext } from '~/context/AuthContext'
import { Badge, ConfigProvider, Tabs } from 'antd'
import ListOrder from './ListOrder/ListOrder'

function Order() {
  const { currentUser } = useContext(AuthContext)
  const [listOrderByStatus, setListOrderByStatus] = useState({})

  const listItems = [
    { key: '0', label: 'Tất cả' },
    { key: '1', label: 'Chờ xác nhận' },
    { key: '2', label: 'Chờ lấy hàng' },
    { key: '3', label: 'Chờ giao hàng' },
    { key: '4', label: 'Hoàn thành' },
    { key: '5', label: 'Đã hủy' }
  ]

  const categorizeOrders = (orders) => {
    const statusMap = {}
    listItems.forEach((item) => {
      statusMap[item.key] = orders.filter((order) => order.status === parseInt(item.key))
    })
    return statusMap
  }

  const fetchDataListOrder = async () => {
    try {
      const res = await cartAPI.getMyOrder(currentUser.id)
      setListOrderByStatus(categorizeOrders(res))
    } catch (error) {
      toast(error.response?.data?.message)
    }
  }

  let items = listItems.map((item) => {
    const hasOrdersInStatus =
      (item.key == 1 && listOrderByStatus[item.key]?.length > 0) ||
      (item.key == 2 && listOrderByStatus[item.key]?.length > 0) ||
      (item.key == 3 && listOrderByStatus[item.key]?.length > 0)
    return {
      key: item.key,
      label: hasOrdersInStatus ? (
        <Badge dot>
          <span>{item.label}</span>
        </Badge>
      ) : (
        <span className='text-sm'>{item.label}</span>
      ),
      children: <ListOrder fetchDataListOrder={fetchDataListOrder} listOrder={item.key === '0' ? listOrderByStatus[4] : listOrderByStatus[item.key]} statusMessage={item.label} />
    }
  })

  const onChange = async (key) => {
    try {
      const res = await cartAPI.getMyOrderByStatus(key)
      setListOrderByStatus((prev) => ({ ...prev, [key]: res }))
    } catch (error) {
      toast(error.response?.data?.message)
    }
  }

  useEffect(() => {
    fetchDataListOrder()
  }, [currentUser])

  return (
    <ConfigProvider theme={{ components: { Tabs: { colorPrimary: '#d22826', algorithm: true } } }}>
      <Tabs defaultActiveKey='0' items={items} onChange={onChange} />
    </ConfigProvider>
  )
}

export default Order
