import React from 'react'

export default function Campaigns() {
  return (
    <div className="w-full min-h-72 p-3 bg-light-50 rounded-lg border border-border">
      <div className="w-full">
        <h3 className='text-base md:text-lg text-dark-200 font-semibold'>Campaigns</h3>
        <p className='text-sm md:text-base text-dark-50'>Top performing campaigns</p>
      </div>

      <div className="size-full flex-center">
        <p className="text-sm text-light-100">No Data</p>
      </div>
    </div>
  )
}
