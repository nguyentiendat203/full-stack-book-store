const SalesGoalCard = () => {
  return (
    <div className='bg-white p-6 rounded-xl shadow-sm'>
      <div className='mb-4'>
        <h3 className='text-2xl font-bold text-gray-800'>$65,129</h3>
        <div className='flex items-center gap-2'>
          <p className='text-gray-500'>Sales This Year</p>
          <span className='text-green-500 text-sm'>↑ 8.6%</span>
        </div>
      </div>
      <div className='mb-2'>
        <div className='flex justify-between text-sm mb-1'>
          <span className='text-gray-500'>285 left to Goal</span>
          <span className='text-gray-700'>78%</span>
        </div>
        <div className='h-2 bg-gray-200 rounded-full'>
          <div className='h-full w-[78%] bg-blue-500 rounded-full'></div>
        </div>
      </div>
    </div>
  )
}

export default SalesGoalCard
