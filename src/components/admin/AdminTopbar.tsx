import { Bell, Mail, Search } from 'lucide-react'

function AdminTopbar() {
  return (
    <header className='w-full px-3 py-5 flex-between sticky top-0 left-0 border-b border-border  bg-light-50 z-10'>
      <h1 className='text-lg md:text-xl text-primary font-bold'>Dashboard</h1>
      <div className='flex items-center gap-2 ml-auto text-primary'>
        <Search size={18} />
        <Bell size={18} />
        <Mail size={18} />
      </div>
    </header>
  )
}

export default AdminTopbar