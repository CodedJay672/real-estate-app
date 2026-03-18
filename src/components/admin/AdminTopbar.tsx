import { Suspense } from 'react';

import { getAdminNotifications } from '@/lib/data/notifications.data'
import NotificationBtn from '../shared/NotificationBtn'
import PageHeader from './PageHeader'

function AdminTopbar() {
  const notification = getAdminNotifications();

  return (
    <header className='w-full px-3 py-5 flex-between sticky top-0 left-0 border-b border-border  bg-light-50 z-10'>
      <PageHeader />
      <div className='flex items-center gap-2 ml-auto text-primary'>
        <Suspense fallback={<div className='size-6 bg-light-100 animate-pulse' />}>
          <NotificationBtn getNotifs={notification} />
        </Suspense>
      </div>
    </header>
  )
}

export default AdminTopbar