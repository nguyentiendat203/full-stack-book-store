import { Button, Pagination } from 'antd'
import { CardBook } from '~/components/Cards/CardBook'

function ListBook({ listBooks, setCurrentPage, totalRecords, currentLimit, noPaginate, title, iconTitle, setCurrentLimit }) {
  const handleChangePage = (e) => {
    setCurrentPage(e)
  }
  return (
    <>
      <p className='p-4 text-lg font-medium rounded-t-lg bg-pink-200'>
        <span className='mr-2'>{iconTitle}</span>
        {title}
      </p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-white md:p-4 rounded-t-lg'>
        {listBooks &&
          listBooks.map((book) => {
            return (
              <>
                <CardBook book={book} />
              </>
            )
          })}
      </div>
      <div className='flex items-center justify-center gap-2 bg-white p-4 rounded-b-lg'>
        <Button
          type='primary'
          size='large'
          className='bg-red-600 hover:!bg-red-700 text-white'
          onClick={() => {
            setCurrentPage((prev) => prev + 1)
          }}
        >
          Xem thêm
        </Button>
      </div>
      <div className='bg-white rounded-b-lg p-2'>{!noPaginate ? <Pagination align='end' total={totalRecords} pageSize={currentLimit} onChange={handleChangePage} /> : ''}</div>
    </>
  )
}

export default ListBook
