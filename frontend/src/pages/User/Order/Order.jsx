import { useEffect, useState } from 'react'
import orderAPI from '~/api/orderAPI'
import { Badge, ConfigProvider, Tabs } from 'antd'
import ListOrder from './ListOrder/ListOrder'
import useOrderStore from '~/store/useOrderStore'

function Order() {
  const [tab, setTab] = useState(0)
  const [mapOrderByStatus, setMapOrderByStatus] = useState({})
  const { allOrdersOfUser, setAllOrdersOfUser } = useOrderStore()

  const listItems = [
    { key: 0, label: 'Tất cả' },
    { key: 1, label: 'Chờ xác nhận' },
    { key: 2, label: 'Chờ lấy hàng' },
    { key: 3, label: 'Chờ giao hàng' },
    { key: 4, label: 'Hoàn thành' },
    { key: 5, label: 'Đã hủy' }
  ]

  let items = listItems.map((item) => {
    const hasOrdersInStatus =
      (item.key == 1 && mapOrderByStatus[item.key]?.length > 0) ||
      (item.key == 2 && mapOrderByStatus[item.key]?.length > 0) ||
      (item.key == 3 && mapOrderByStatus[item.key]?.length > 0)
    return {
      key: item.key,
      label: hasOrdersInStatus ? (
        <Badge dot>
          <span>{item.label}</span>
        </Badge>
      ) : (
        <span className='text-sm'>{item.label}</span>
      ),
      children: <ListOrder listOrder={allOrdersOfUser} statusMessage={item.label} />
    }
  })

  const onChange = async (key) => {
    if (key == 0) {
      fetchOrders()
      return
    }
    setAllOrdersOfUser(mapOrderByStatus[key])
    setTab(key)
  }

  const mapOrdersToStatus = (orders) => {
    const statusMap = {}
    listItems.forEach((item) => {
      statusMap[item.key] = orders.filter((order) => order.status === item.key)
    })
    return statusMap
  }
  const fetchOrders = async () => {
    orderAPI.getMyOrder().then((res) => {
      setMapOrderByStatus(mapOrdersToStatus(res))
      const newOreders = res.filter((order) => order.status == 4 || order.status == 5)
      setAllOrdersOfUser(newOreders)
    })
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <ConfigProvider theme={{ components: { Tabs: { colorPrimary: '#d22826', algorithm: true } } }}>
      <Tabs defaultActiveKey={tab} items={items} onChange={onChange} />
    </ConfigProvider>
  )
}

export default Order
