import { ResponsiveLine } from '@nivo/line'

const WeeklySalesChart = () => {
  const data = [
    {
      id: 'weekly sales',
      data: [
        { x: 'Mon', y: 8500 },
        { x: 'Tue', y: 9200 },
        { x: 'Wed', y: 8900 },
        { x: 'Thu', y: 9800 },
        { x: 'Fri', y: 9100 },
        { x: 'Sat', y: 9600 },
        { x: 'Sun', y: 8800 }
      ]
    }
  ]

  return (
    <div className='bg-white p-6 rounded-xl shadow-sm'>
      <div className='flex justify-between items-start mb-6'>
        <div>
          <h2 className='text-3xl font-bold text-gray-800'>$9,568</h2>
          <div className='flex items-center gap-2'>
            <p className='text-gray-500'>Average Weekly Sales</p>
            <span className='text-red-500 text-sm'>↓ 8.6%</span>
          </div>
        </div>
      </div>
      <div className='h-48'>
        <ResponsiveLine
          data={data}
          margin={{ top: 10, right: 10, bottom: 30, left: 40 }}
          curve='natural'
          enablePoints={false}
          enableGridX={false}
          enableGridY={false}
          colors={['#22c55e']}
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: '#9ca3af'
                }
              }
            }
          }}
          areaBaselineValue={0}
          areaOpacity={0.15}
          enableArea={true}
        />
      </div>
    </div>
  )
}

export default WeeklySalesChart
