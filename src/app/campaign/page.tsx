import React from 'react'
import CampaignCard from './campaign-card'
import Back from '@/components/shared/Back'

export default function CampaignsPage() {
  return (
    <section className='container mx-auto p-4 py-10 space-y-16'>
      <div className='flex items-center gap-2'>
        <Back /> <span className='text-sm md:text-base font-light'>Go Back</span>
      </div>

      <div className='w-full space-y-4 max-w-2xl mx-auto text-center'>
        <h2 className='text-2xl md:text-4xl text-primary text-pretty font-bold'>
          Check out amazing offers that are currently trending.
        </h2>
        <p className='text-base text-muted-foreground font-medium'>Save up to 50% from amazing offers currently trending in the real estate markets. From Prelaunch prices to distress sales and also get timely price increase alerts.</p>      </div>

      <div className='w-full property-grid'>
        <CampaignCard img="/assets/downtown.jpeg" title="Pre-launch Prices Closes April 30th" subtitle="Downtown Lagos Commercial City, Ibeju-Lekki Phase 2" />
      </div>
    </section>
  )
}
