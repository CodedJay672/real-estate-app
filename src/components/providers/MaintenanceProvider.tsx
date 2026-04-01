import config from '@/lib/config'
import { TimerIcon } from 'lucide-react'
import React from 'react'

export default function MaintenanceProvider({ children }: { children: React.ReactNode }) {

  if (!!config.env.appShouldSuspend) {
    return (
      <div className='w-full h-screen flex-center  bg-muted'>
        <div className='w-5/6 max-w-md h-86 bg-background border border-border rounded-xl p-2 md:p-6 flex-center flex-col gap-3'>
          <div className="p-2 rounded-full flex-center bg-muted">
            <TimerIcon />
          </div>
          <h2 className='text-lg md:text-xl font-bold'>This website is suspended!</h2>
          <p className='w-full p-2 md:p-3 bg-muted text-muted-foreground rounded-xl'>
            This application is temporarily unavailable due to a billing issues. We're working to resolve this as quickly as possible and appreciate your patience.
          </p>

          <small className='text-xs text-green-500 font-medium'>If you are the owner of this website, please contact the developers</small>
        </div>
      </div>
    )
  }

  return (
    <div>{children}</div>
  )
}
