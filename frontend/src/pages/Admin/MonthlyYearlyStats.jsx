import { ResponsivePie } from '@nivo/pie'

const MonthlyYearlyStats = () => {
  const monthlyData = [
    { id: 'complete', value: 65.127, color: '#3b82f6' },
    { id: 'remaining', value: 34.873, color: '#e5e7eb' }
  ]

  const yearlyData = [
    { id: 'complete', value: 84.246, color: '#8b5cf6' },
    { id: 'remaining', value: 15.754, color: '#e5e7eb' }
  ]

  return (
    <div className='bg-white p-6 rounded-xl shadow-sm'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <StatCircle title='Monthly' value='65,127' percentage='16.5%' subValue='55.21 USD' data={monthlyData} />
        <StatCircle title='Yearly' value='984,246' percentage='24.9%' subValue='267.35 USD' data={yearlyData} />
      </div>
    </div>
  )
}

const StatCircle = ({ title, value, percentage, subValue, data }) => {
  return (
    <div className='flex items-center gap-6'>
      <div className='h-32 w-32 relative'>
        <ResponsivePie
          data={data}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          innerRadius={0.7}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={data.map((d) => d.color)}
          enableArcLabels={false}
          enableArcLinkLabels={false}
        />
      </div>
      <div>
        <h3 className='text-gray-500 mb-1'>{title}</h3>
        <p className='text-2xl font-bold text-gray-800 mb-1'>{value}</p>
        <div className='flex items-center gap-2'>
          <span className='text-green-500'>{percentage}</span>
          <span className='text-gray-500'>{subValue}</span>
        </div>
      </div>
    </div>
  )
}

export default MonthlyYearlyStats
