import { ResponsiveLine } from '@nivo/line'

const UserStatsCard = () => {
  const data = [
    {
      id: 'users',
      data: [
        { x: 0, y: 20 },
        { x: 1, y: 30 },
        { x: 2, y: 25 },
        { x: 3, y: 45 },
        { x: 4, y: 35 },
        { x: 5, y: 50 },
        { x: 6, y: 40 },
        { x: 7, y: 30 },
        { x: 8, y: 25 }
      ]
    }
  ]

  return (
    <div className='bg-white p-6 rounded-xl shadow-sm'>
      <div className='flex justify-between items-center mb-4'>
        <div>
          <h3 className='text-2xl font-bold text-gray-800'>97.4K</h3>
          <p className='text-gray-500'>Total Users</p>
        </div>
        {/* <button className='text-gray-400 hover:text-gray-600'>
          <MoreVertical size={18} />
        </button> */}
      </div>
      <div className='h-32'>
        <ResponsiveLine
          data={data}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          curve='natural'
          enablePoints={false}
          enableGridX={false}
          enableGridY={false}
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          colors={['#ef4444']}
          areaBaselineValue={0}
          enableArea={true}
          areaOpacity={0.15}
        />
      </div>
      <p className='text-green-500 text-sm mt-2'>↑ 12.5% from last month</p>
    </div>
  )
}

export default UserStatsCard
