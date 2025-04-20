import { Pagination } from 'antd'
import { CardBook } from '~/components/CardBook'

function ListBook({ listBooks, setCurrentPage, totalRecords, currentLimit, noPaginate, title, iconTitle }) {
  const handleChangePage = (e) => {
    setCurrentPage(e)
  }
  return (
    <>
      <p className='p-4 text-lg font-medium rounded-t-lg bg-pink-200'>
        <span className='mr-2'>{iconTitle}</span>
        {title}
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 bg-white p-4 rounded-l-lg'>
        {listBooks &&
          listBooks.map((book) => {
            return (
              <>
                <CardBook book={book} />
              </>
            )
          })}
      </div>
      <div className='bg-white rounded-b-lg p-2'>{!noPaginate ? <Pagination align='end' total={totalRecords} pageSize={currentLimit} onChange={handleChangePage} /> : ''}</div>
    </>
  )
}

export default ListBook
