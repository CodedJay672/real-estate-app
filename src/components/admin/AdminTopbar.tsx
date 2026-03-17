import NotificationBtn from '../shared/NotificationBtn'
import PageHeader from './PageHeader'

function AdminTopbar() {
  return (
    <header className='w-full px-3 py-5 flex-between sticky top-0 left-0 border-b border-border  bg-light-50 z-10'>
      <PageHeader />
      <div className='flex items-center gap-2 ml-auto text-primary'>
        <NotificationBtn />
      </div>
    </header>
  )
}

export default AdminTopbar