import { ResponsiveBar } from '@nivo/bar'

const SalesViewsChart = () => {
  const data = [
    { month: 'Jan', sales: 20, views: 18 },
    { month: 'Feb', sales: 5, views: 12 },
    { month: 'Mar', sales: 50, views: 45 },
    { month: 'Apr', sales: 12, views: 15 },
    { month: 'May', sales: 30, views: 25 },
    { month: 'Jun', sales: 20, views: 18 },
    { month: 'Jul', sales: 25, views: 45 },
    { month: 'Aug', sales: 15, views: 12 },
    { month: 'Sep', sales: 30, views: 25 }
  ]

  return (
    <div className='bg-white p-6 rounded-xl shadow-sm'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-800'>Sales & Views</h2>
        <button className='text-gray-400 hover:text-gray-600'>{/* <MoreVertical size={18} /> */}</button>
      </div>
      <div className='h-80'>
        <ResponsiveBar
          data={data}
          keys={['sales', 'views']}
          indexBy='month'
          margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
          padding={0.3}
          colors={['#3b82f6', '#8b5cf6']}
          enableLabel={false}
          axisBottom={{
            tickSize: 0,
            tickPadding: 10
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 10
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateY: 40,
              itemWidth: 100,
              itemHeight: 20,
              symbolSize: 10
            }
          ]}
        />
      </div>
    </div>
  )
}

export default SalesViewsChart
