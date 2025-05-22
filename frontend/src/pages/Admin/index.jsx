import { BellOutlined, CreditCardOutlined, MoreOutlined, PrinterOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import SalesViewsChart from '~/components/Charts/SalesViewsChart'
import WeeklySalesChart from '~/components/Charts/WeeklySalesChart'
import MonthlyYearlyStats from '~/pages/Admin/MonthlyYearlyStats'
import SalesGoalCard from '~/pages/Admin/SalesGoalCard'
import UserStatsCard from '~/pages/Admin/UserStatsCard'

export const HomeAdminDashboard = () => {
  return (
    <div className=''>
      <div className='w-full gap-6 mb-6'>
        <WeeklySalesChart />
      </div>
      <div className='grid grid-cols-4 gap-4 mb-6'>
        <StatCard icon={<ShoppingCartOutlined className='text-blue-600' />} value='85,246' label='Orders' iconBg='bg-blue-100' />
        <StatCard icon={<PrinterOutlined className='text-green-600' />} value='$96,147' label='Income' iconBg='bg-green-100' />
        <StatCard icon={<BellOutlined className='text-red-600' />} value='846' label='Notifications' iconBg='bg-red-100' />
        <StatCard icon={<CreditCardOutlined className='text-cyan-600' />} value='$84,472' label='Payment' iconBg='bg-cyan-100' />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        <div className='col-span-3'>
          <UserStatsCard />
        </div>
        <div className='col-span-9'>
          <SalesViewsChart />
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6'>
        <div className='lg:col-span-4'>
          <SalesGoalCard />
        </div>
        <div className='lg:col-span-8'>
          <MonthlyYearlyStats />
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon, value, label, iconBg }) => {
  return (
    <div className='bg-white p-4 rounded-xl shadow-sm'>
      <div className='flex items-center justify-between mb-4'>
        <div className={`p-2 rounded-lg ${iconBg}`}>{icon}</div>
        <button className='text-gray-400 hover:text-gray-600'>
          <MoreOutlined size={18} />
        </button>
      </div>
      <div>
        <h3 className='text-2xl font-semibold text-gray-800'>{value}</h3>
        <p className='text-gray-500'>{label}</p>
      </div>
    </div>
  )
}
