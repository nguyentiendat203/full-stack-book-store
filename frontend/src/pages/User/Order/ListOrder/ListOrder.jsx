import { Empty } from 'antd'
import ListOrderItem from './ListOrderItem/ListOrderItem'

function ListOrder({ listOrder, statusMessage, fetchDataListOrder, onHideBtnConfirmOrder }) {
  return (
    <>
      <div className='flex flex-col'>
        {listOrder?.length > 0 ? (
          listOrder.map((item) => {
            return (
              <>
                <ListOrderItem fetchDataListOrder={fetchDataListOrder} item={item} statusMessage={statusMessage} onHideBtnConfirmOrder={onHideBtnConfirmOrder} />
              </>
            )
          })
        ) : (
          <Empty />
        )}
      </div>
    </>
  )
}

export default ListOrder
