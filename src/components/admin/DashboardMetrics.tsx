import { Landmark, Megaphone, User, UserPlus } from 'lucide-react'

import { getDashboardMetrics } from '@/lib/data/dashboard.data'
import StatsCard from '../shared/StatsCard'
import { cn } from '@/lib/utils'

export default async function DashboardMetrics() {
  const dashboardOverview = await getDashboardMetrics()
  if (!dashboardOverview.success || !dashboardOverview.data) throw new Error('Something went wrong. Please refresh this page.');

  const { averageWeeklyUsers, percentageChange, previousWeekCount, thisWeekCount, totalListings } = dashboardOverview.data;

  return (
    <div className="w-full grid md:grid-cols-4 grid-flow-col auto-cols-max gap-4 md:gap-6 overflow-x-auto no-scrollbar">
      <StatsCard title="New users" value={thisWeekCount} icon={<div className="w-max p-1.5 bg-green-50 rounded-full" >
        <UserPlus className="size-4 text-green-500 fill-green-500" />
      </div>
      } description={<small className='text-xs text-dark-50'>Last week: <span className={cn('font-medium', previousWeekCount > thisWeekCount ? 'text-green-500' : 'text-red-500')}>{previousWeekCount}</span></small>} />

      <StatsCard title="Avg. Users" value={averageWeeklyUsers} icon={<div className="w-max p-1.5 bg-blue-50 rounded-full" >
        <User className="size-4 text-blue-500 fill-blue-500" />
      </div>
      } description={<small className='text-xs text-dark-50'>% change: <span className={cn('font-medium', previousWeekCount > thisWeekCount ? 'text-green-500' : 'text-red-500')}>{percentageChange}</span></small>} />
      <StatsCard title="Listings" value={totalListings} icon={<div className="size-max p-1.5 bg-orange-50 rounded-full">
        <Landmark className="size-4 text-orange-400" />
      </div>
      } />
      <StatsCard title="Campaigns" value={0} icon={<div className="size-max p-1.5 bg-red-50 rounded-full">
        <Megaphone className="size-4 text-red-500" />
      </div>
      } />
    </div>
  )
}
